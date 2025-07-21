import { PlusIcon } from 'lucide-react'
import { Link } from 'react-router'


const Navbar = () => {
  return (
    <header className='bg-base-200 border-b border-base-content/20'>    
        <div className='mx-auto max-w-6xl p-4'>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-bold text-info font-mono tracking-tighter'>
                    ThinkBoard
                </h1>
                <div className='flex items-center gap-4'>
                    <Link to={'/create'} className='btn btn-info'>
                    <PlusIcon className='size-5  cursor-pointer' />
                    <span>New Note</span>
                    </Link>
                        
                </div>
            </div>
        </div>
      
    </header>
  )
}

export default Navbar
