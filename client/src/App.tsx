
import {BrowserRouter} from 'react-router-dom'
import UserRouter from './Router/UserRouter'
import AdminRouter from "./Router/AdminRouter"

function App() {


  return (
    <>
    <BrowserRouter>
      <UserRouter/>
      <AdminRouter/>
    </BrowserRouter>
      
    </>
  )
}

export default App
