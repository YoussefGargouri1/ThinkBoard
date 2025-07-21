
import {Route , Routes} from 'react-router'
import Home from './pages/Home.jsx'
import CreateNote from './pages/CreateNote.jsx'
import NoteDetail from './pages/NoteDetail.jsx'
import toast from 'react-hot-toast'

const App = () => {
  return (
    <div data-theme = "sunset">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<CreateNote />} />
        <Route path='/note/:id' element={<NoteDetail />} />
      </Routes>
      
    </div>
  )
}

export default App
