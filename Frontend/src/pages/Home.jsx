import Navbar from '../components/Navbar.jsx'
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import NoteCard from '../components/NoteCard.jsx';
import api from '../lib/axios.js';
import NotesNotFound from '../components/NotesNotFound.jsx';


const Home = () => {
    const [isRateLimited , setIsRateLimited] = useState (false);
    const [notes , setNotes] = useState ([]);
    const [loading , setLoading ] = useState(true);

    useEffect(() => {
    const fetchNotes = async () => {
        
        try {
            const res = await api.get('/notes');
            console.log(res.data);
            setNotes(res.data);
            setIsRateLimited(false);
        }

        catch (error) {
        console.error('Error fetching notes:', error);
        if (error.response.status === 429) {
            setIsRateLimited(true);
        } else {
            console.error('Error fetching notes:', error);
        }
        }
        // we can use finally to set loading to false wheter the request is successful or fails
        finally {
            setLoading(false);
        } 
        }

        fetchNotes();
        }, []);


    return (
    <div className='min-h-screen'>
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading...</div>}
        {notes.length === 0 && !loading && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {notes.map((note) => (
                <NoteCard key={note._id} note={note} setNotes = {setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
