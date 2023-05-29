import {Routes ,Route} from 'react-router-dom'
import AdminSigninPage from '../pages/admin/AdminSigninPage'
import AdminHomePage from '../pages/admin/AdminHomePage'

function UserRouter() {
  return (
    <div>
      <Routes>
      <Route path='/admin' element={<AdminSigninPage />}></Route>
      <Route path='/adminhome' element={<AdminHomePage />}></Route>
      </Routes>
    </div>
  )
}

export default UserRouter

