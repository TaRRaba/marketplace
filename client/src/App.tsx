
import './App.css'
import LoginSeller from './components/seller/LoginSeller/LoginSeller'
import RegistrationSeller from './components/seller/RegistrationSeller/RegistrationSeller'
import LoginUser from './components/user/LoginUser/LoginUser'
import RegistrationUser from './components/user/RegistrationUser/RegistrationUser'
import { UserNavBar } from './components/navbars/UserNavBar'
import { Route, Routes } from 'react-router-dom'
import  Try15234134  from './components/navbars/CatalogFinal'
import Menu from './components/navbars/FinalTryBeforeSleep'


function App() {
  
  return (
    <>
      <UserNavBar/>
      {/* < Try15234134/> */}
      {/* <Menu/> */}
      <Routes>
      <Route path="/login" element={<LoginUser />}/>
      <Route path="/red" element={<RegistrationUser />}/>
      </Routes>
      {/* <RegistrationSeller></RegistrationSeller> */}
      {/* <LoginSeller></LoginSeller> */}
      {/* <RegistrationUser></RegistrationUser> */}
      {/* <LoginUser></LoginUser> */}
    </>
  )
}

export default App
