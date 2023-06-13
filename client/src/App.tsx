
import './App.css'
import LoginSeller from './components/seller/LoginSeller/LoginSeller'
import RegistrationSeller from './components/seller/RegistrationSeller/RegistrationSeller'
import LoginUser from './components/user/LoginUser/LoginUser'
import Profile from './components/user/Profile/Profile'
import RegistrationUser from './components/user/RegistrationUser/RegistrationUser'
import { UserNavBar } from './components/navbars/UserNavBar'
import { Route, Routes } from 'react-router-dom'


function App() {
  
  return (
    <>
      <UserNavBar/>

      <Routes>
      <Route path="/login" element={<LoginUser />}/>
      <Route path="/red" element={<RegistrationUser />}/>
      </Routes>
      {/* <RegistrationSeller></RegistrationSeller> */}
      {/* <LoginSeller></LoginSeller> */}
      {/* <RegistrationUser></RegistrationUser> */}
      {/* <LoginUser></LoginUser> */}
      <Profile></Profile>
    </>
  )
}

export default App
