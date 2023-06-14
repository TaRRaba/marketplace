
import './App.css'
import { Cart } from './components/cart/Cart'
import LoginSeller from './components/seller/LoginSeller/LoginSeller'
import RegistrationSeller from './components/seller/RegistrationSeller/RegistrationSeller'
import LoginUser from './components/user/LoginUser/LoginUser'
import ProfileUser from './components/user/ProfileUser/ProfileUser'
import RegistrationUser from './components/user/RegistrationUser/RegistrationUser'
import ProfileSeller from './components/seller/ProfileSeller/ProfileSeller'
import CartInList from './components/user/CartInList/CartInList'
import { UserNavBar } from './components/navbars/UserNavBar'
import { Route, Routes } from 'react-router-dom'
import  Try15234134  from './components/navbars/CatalogFinal'
import Menu from './components/navbars/FinalTryBeforeSleep'
import InfoSeller from './components/seller/Info/InfoSeller'


function App() {
  
  return (
    <>
      <UserNavBar/>
      {/* < Try15234134/> */}
      {/* <Menu/> */}
      {/* <UserNavBar/>

      <Routes>
      <Route path="/login" element={<LoginUser />}/>
      <Route path="/red" element={<RegistrationUser />}/>
      </Routes> */}
      {/* <RegistrationSeller></RegistrationSeller> */}
      {/* <LoginSeller></LoginSeller> */}
      {/* <RegistrationUser></RegistrationUser> */}
      {/* <LoginUser></LoginUser> */}
      {/* <Cart /> */}
      {/* <ProfileUser></ProfileUser> */}
      {/* <ProfileSeller></ProfileSeller> */}
      {/* <CartInList></CartInList> */}
      <InfoSeller></InfoSeller>
    </>
  )
}

export default App
