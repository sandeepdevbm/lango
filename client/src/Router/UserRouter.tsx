import {Routes ,Route} from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import SignIn from '../pages/SignInPage'
import SignUp from '../pages/SingUpPage'
import StudentHomePage from '../pages/StudentHomePage'
import MentorHomePage from '../pages/MentorHomePage'
import StudentSearchPage from '../pages/StudentSearchPage'
import Language from '../pages/Language'
import MentorVerifyPage from '../pages/MentorVerifyPage'
import ViewMentor from '../pages/admin/ViewMentor'
import Chat from '../pages/chat/Chat'

function UserRouter() {
  return (
    <div>
      <Routes>
      <Route path='/' element={<LandingPage />}></Route>
      <Route path='/login' element={<SignIn />}></Route>
      <Route path='/signup' element={<SignUp />}></Route>
      <Route path='/student' element={<StudentHomePage />}></Route>
      <Route path='/mentor' element={<MentorHomePage />}></Route>
      <Route path='/search-results' element={<StudentSearchPage />}></Route>
      <Route path='/language/:language' element={<Language/>}></Route>
      <Route path='/mentorverify/:id' element={<MentorVerifyPage/>}></Route>
      <Route path='/mentor-details/:mentorId' element={<ViewMentor/>}></Route>
      <Route path='/chat' element={<Chat/>}></Route>
      
      </Routes>
    </div>
  )
}

export default UserRouter

