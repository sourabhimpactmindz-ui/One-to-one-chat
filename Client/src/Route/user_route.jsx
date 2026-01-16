
import { createBrowserRouter } from 'react-router-dom'
import Create from '../pages/create'
import Login from '../pages/login'
import Chat from '../pages/chatpage'



const router = createBrowserRouter([
    {
        path : "/create",
        element : <Create></Create>
    },

    {
        path : "/",
        element : <Login></Login>
    },
    {
        path : '/chat',
        element:<Chat></Chat>
    }
])



export default router