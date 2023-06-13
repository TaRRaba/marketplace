
import './App.css'
import LoginSeller from './components/seller/LoginSeller/LoginSeller'
import RegistrationSeller from './components/seller/RegistrationSeller/RegistrationSeller'
import LoginUser from './components/user/LoginUser/LoginUser'
import ProfileUser from './components/user/ProfileUser/ProfileUser'
import RegistrationUser from './components/user/RegistrationUser/RegistrationUser'
import { UserNavBar } from './components/navbars/UserNavBar'
import { Route, Routes } from 'react-router-dom'
import ProfileSeller from './components/seller/ProfileSeller/ProfileSeller'


function App() {
  
  return (
    <>
      {/* <UserNavBar/>

      <Routes>
      <Route path="/login" element={<LoginUser />}/>
      <Route path="/red" element={<RegistrationUser />}/>
      </Routes> */}
      {/* <RegistrationSeller></RegistrationSeller> */}
      {/* <LoginSeller></LoginSeller> */}
      {/* <RegistrationUser></RegistrationUser> */}
      {/* <LoginUser></LoginUser> */}
      {/* <ProfileUser></ProfileUser> */}
      <ProfileSeller></ProfileSeller>
    </>
  )
}

export default App
