
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

import InfoSeller from './components/seller/Info/InfoSeller'

import 'react-dropdown/style.css';

import DefaultFooter from './components/footer/Footer'
import { FooterFinal } from './components/footer/FooterFinal'
import { Main } from './components/main/Main'





function App() {

  return (
    <>
      <UserNavBar/>

   

      <Routes>
      <Route path="/login" element={<LoginUser />}/>
      <Route path="/reg" element={<RegistrationUser />}/>
      <Route path="/cart" element={<Cart />}/>
      <Route path="/profile" element={<ProfileUser />}/>
      <Route path="/" element={<Main/>}/>
      </Routes> 
      {/* <RegistrationSeller></RegistrationSeller> */}
      {/* <LoginSeller></LoginSeller> */}
      {/* <RegistrationUser></RegistrationUser> */}
      {/* <LoginUser></LoginUser> */}
      {/* <Cart /> */}
      {/* <ProfileUser></ProfileUser> */}
      {/* <ProfileSeller></ProfileSeller> */}
      {/* <CartInList></CartInList> */}
      {/* <InfoSeller></InfoSeller> */}

      {/* <DefaultFooter/> */}
      
      <FooterFinal/>
    </>
  )
}

export default App
