import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import {Link} from 'react-router';
import api from '../lib/axios';
import toast from 'react-hot-toast';


const NoteCard = ({note , setNotes}) => {

    const handleDelete = async (e , id) => {
        e.preventDefault();
        if (!window.confirm('Are you sure you want to delete this note?')) {
            return;
        }
        try{
            await api.delete(`/notes/${id}`);
            setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
            toast.success("Note deleted successfully !");

        }catch (error) {
            console.error('Error deleting note:', error);
            toast.error('Failed to delete note');
        }
    }


  return (
    <Link to = {`/note/${note._id}`} 
        className = "card bg-teal-950 hover:shadow-lg transition-all duration-all border-t-4 border-solid border-[#bfc0bf]"
    >
        <div className='card-body'>
            <h3 className='card-title'>{note.title}</h3>
            <p className='text-sm text-base-content/70 line-clamp-3'>{note.content}</p>
            <div className='card-actions justify-between items-centered mt-4'>
                <span>
                    <p className='text-xs text-base-content/50'>Created at: {new Date(note.createdAt).toLocaleDateString()}</p>
                    <p className='text-xs text-base-content/50'>Last updated: {new Date(note.updatedAt).toLocaleDateString()}</p>
                </span>
                <div className='flex items-center gap-2'>
                    <PenSquareIcon className='size-5 text-base-content/70 hover:text-success transition-colors duration-200 cursor-pointer' />
                    <button className='btn btn-sm btn-base-content text-error' onClick={ (e) => handleDelete(e, note._id) }>
                        <Trash2Icon className='size-4 text-base-content/70 hover:text-success transition-colors duration-200' />
                    </button>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default NoteCard
