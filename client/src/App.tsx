
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
import GoodsCard from './components/goods/GoodsCard'
import SettingsSeller from './components/seller/SettingsSeller/SettingsSeller'
import GoodsSeller from './components/seller/GoodsSeller/GoodsSeller'

import 'react-dropdown/style.css';

import DefaultFooter from './components/footer/Footer'
import { FooterFinal } from './components/footer/FooterFinal'
import { Main } from './components/main/Main'
import { NewGoodsSeller } from './components/seller/GoodsSeller/NewGoodsSeller'





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
        
      <Route path="/profileSeller" element={<ProfileSeller/>}> 
          <Route path='settings' element={<SettingsSeller/>}></Route>
          <Route path='goods' element={<GoodsSeller></GoodsSeller>}></Route>
          <Route path='reports' element={<p>orders</p>}></Route>  
          <Route path='new_goods' element={<NewGoodsSeller></NewGoodsSeller>}></Route>
          <Route path='edit_goods/:id' element={<p>edit goods</p>}></Route>   
      </Route>
      </Routes> 

      {/* <RegistrationSeller></RegistrationSeller> */}
      {/* <LoginSeller></LoginSeller> */}
      {/* <RegistrationUser></RegistrationUser> */}
      {/* <LoginUser></LoginUser> */}
      {/* <ProfileUser></ProfileUser> */}
      {/* <ProfileSeller></ProfileSeller> */}
      {/* <CartInList></CartInList> */}
      {/* <Cart /> */}
      {/* <Favourites /> */}
      {/* <ProfileUser></ProfileUser> */}
      {/* <CardInList></CardInList> */}
      {/* <GoodsCard></GoodsCard> */}
      {/* <InfoSeller></InfoSeller> */}
      {/* <InfoSeller></InfoSeller> */}
      {/* <DefaultFooter/> */}
      
      <FooterFinal/>

    {/* рабочая версия роута кабинета продавца */}
      {/* <Route path="/profileSeller" element={<ProfileSeller/>}> 
          <Route path='settings' element={<SettingsSeller/>}></Route>
          <Route path='goods' element={<GoodsSeller></GoodsSeller>}></Route>
          <Route path='reports' element={<p>orders</p>}></Route>  
          <Route path='new_goods' element={<NewGoodsSeller></NewGoodsSeller>}></Route>
          <Route path='edit_goods/:id' element={<p>edit goods</p>}></Route>   
      </Route>
       */}
    </>
  )
}

export default App
