
import './App.css'
import { Cart } from './components/cart/Cart'
import LoginSeller from './components/seller/LoginSeller/LoginSeller'
import RegistrationSeller from './components/seller/RegistrationSeller/RegistrationSeller'
import LoginUser from './components/user/LoginUser/LoginUser'
import ProfileUser from './components/user/ProfileUser/ProfileUser'
import RegistrationUser from './components/user/RegistrationUser/RegistrationUser'
import ProfileSeller from './components/seller/ProfileSeller/ProfileSeller'
import CardInList from './components/user/CardInList/CardInList'
import { UserNavBar } from './components/navbars/UserNavBar'
import { Route, Routes } from 'react-router-dom'
import { Favourites } from './components/favourites/Favourites'
import InfoSeller from './components/seller/Info/InfoSeller'


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
      {/* <Cart /> */}
      <Favourites />
      {/* <ProfileUser></ProfileUser> */}
      {/* <ProfileSeller></ProfileSeller> */}
      <CardInList></CardInList>
      {/* <InfoSeller></InfoSeller> */}
    </>
  )
}

export default App
