import {useState} from 'react';
import {Link , useNavigate} from 'react-router';
import {ArrowLeftIcon} from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import api from '../lib/axios';
const CreateNote = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); // Assuming you have useNavigate from react-router

    const handlesbmit = async (e) => {
        e.preventDefault();
        console.log(title);
        console.log(content);

        // if (!title.trim() || !content.trim()) {
        //     toast.error('Title and content are required');
        //     return;
        // }

        setLoading(true);
        try{
            await api.post('/notes', {
                title,content
            }); 
            toast.success('Note created successfully');
            // Optionally, you can redirect to the home page or clear the form
            navigate('/'); // Assuming you have a navigate function from react-router
        }
        catch (error) {
            if (error.response && error.response.status === 429) {
                toast.error('You are being rate limited. Please try again later.' , {
                    duration: 5000,
                    icon:'🚫',
                });
            } else {
                toast.error('Failed to create Note');
            }
        }
        finally {
            setLoading(false);
            setTitle('');
            setContent('');
            
        }
    }
  return (
    <div className='min-h-screen bg-base-300 py-10 px-4 '>
        <div className='container max-w-5xl mx-auto'>
            <Link to = {"/"} className='btn btn-ghost mb-6'>
                <ArrowLeftIcon className='size-5' />
                Back to Home
            </Link>
            <div className='card bg-base-100 shadow-xl'>

                <div className='card-body'>
                    <h2 className='card-title text-2xl mb-4'>Create a New Note</h2>
                    <form onSubmit={handlesbmit} className='space-y-4'>
                        <div className='form-control mb-4'>
                            <label className='label'>
                                <span className='label-text'>Title</span>
                            </label>
                            <input 
                                type='text' 
                                placeholder='Enter note title' 
                                className='input input-bordered w-full' 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                            />
                            <label className='label'>
                                <span className='label-text-alt'>Content</span>
                            </label>
                            <textarea
                                rows='5' 
                                placeholder='Enter note content' 
                                className='textarea textarea-bordered w-full'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                        <div className='card-actions justify-end'>
                            <button 
                                type='submit' 
                                className='btn btn-info'
                                disabled={loading}
                            >
                                {loading ? 'Creating...' : 'Create Note'}
                            </button>

                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
  )
}

export default CreateNote
