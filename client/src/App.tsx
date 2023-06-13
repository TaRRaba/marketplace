
import './App.css'
import LoginSeller from './components/seller/LoginSeller/LoginSeller'
import RegistrationSeller from './components/seller/RegistrationSeller/RegistrationSeller'
import LoginUser from './components/user/LoginUser/LoginUser'
import RegistrationUser from './components/user/RegistrationUser/RegistrationUser'
import { UserNavBar } from './components/navbars/UserNavBar'


function App() {
  
  return (
    <>
      {/* <RegistrationSeller></RegistrationSeller> */}
      {/* <LoginSeller></LoginSeller> */}
      {/* <RegistrationUser></RegistrationUser> */}
      <LoginUser></LoginUser>
      <UserNavBar/>
    </>
  )
}

export default App
