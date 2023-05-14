import {Routes ,Route} from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import SignIn from '../pages/SignInPage'
import SignUp from '../pages/SingUpPage'
import StudentHomePage from '../pages/StudentHomePage'

function UserRouter() {
  return (
    <div>
      <Routes>
      <Route path='/' element={<LandingPage />}></Route>
      <Route path='/login' element={<SignIn />}></Route>
      <Route path='/signup' element={<SignUp />}></Route>
      <Route path='/student' element={<StudentHomePage />}></Route>
      </Routes>
    </div>
  )
}

export default UserRouter

