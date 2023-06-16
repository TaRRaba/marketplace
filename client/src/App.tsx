
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
import { GoodsList } from './components/goods/GoodsList'
import GoodsCard from './components/goods/GoodsCard'
import SettingsSeller from './components/seller/SettingsSeller/SettingsSeller'
import GoodsSeller from './components/seller/GoodsSeller/GoodsSeller'

import 'react-dropdown/style.css';

import DefaultFooter from './components/footer/Footer'
import { FooterFinal } from './components/footer/FooterFinal'
import { Main } from './components/main/Main'

import { NewGoodsSeller } from './components/seller/GoodsSeller/NewGoodsSeller'

import { SearchCard } from './components/Search/SearchCard'
import { useAppDispatch } from './redux/store/hooks'
import { useEffect } from 'react'
import { checkUser, setUser } from './redux/store/userSlice'
import { checkSeller, setSeller } from './redux/store/sellerSlice'
import Reports from './components/seller/Reports/Reports'
import { EditGoods } from './components/seller/GoodsSeller/EditGoods'

function App() {

  const dispatch = useAppDispatch()

  useEffect( () => {
    (async function () { try {
        const response = await fetch ('http://localhost:3001/api/auth/checkUser', {
        credentials: "include",
        })
        const result = await response.json()
        console.log(result);
        if (result){

          dispatch(checkUser(true))
          dispatch(setUser({id: result.id, name: result.name, email: result.email}))     
        }
    
      } catch (error) {
        console.log(error);
      }      
          
      })()
    }, [])

    useEffect( () => {
      (async function () { try {
          const response = await fetch ('http://localhost:3001/api/auth/checkSeller', {
          credentials: "include",
          })
          const result = await response.json()
          if(result){

            dispatch(checkSeller(true))     
            dispatch(setSeller({id: result.id, name: result.name, email: result.email, inn: result.INN}))    
          }
        } catch (error) {
          console.log(error);
        }      
            
        })()
      }, [])

  return (
    <> 
      <UserNavBar/>

      <Routes>
      <Route path="/cart" element={<Cart />}/>
      <Route path="/profile" element={<ProfileUser />}/>      
      <Route path="/infoSeller" element={<InfoSeller />}/>      
      <Route path="/" element={<Main/>}/>
      <Route path="/search" element={<SearchCard/>}/>
      <Route path="/profileSeller" element={<ProfileSeller/>}> 
          <Route path='settings' element={<SettingsSeller/>}></Route>
          <Route path='goods' element={<GoodsSeller></GoodsSeller>}></Route>
          <Route path='new_goods' element={<NewGoodsSeller></NewGoodsSeller>}></Route>
          <Route path='edit_goods/:id' element={<EditGoods></EditGoods>}></Route>   
          <Route path='reports' element={<Reports></Reports>}></Route>     
      </Route>
      </Routes> 

      {/* <RegistrationSeller></RegistrationSeller> */}
      {/* <LoginSeller></LoginSeller> */}
      {/* <RegistrationUser></RegistrationUser> */}
      {/* <LoginUser></LoginUser> */}
      {/* <ProfileUser></ProfileUser> */}
      {/* <ProfileSeller></ProfileSeller> */}
      {/* <Cart /> */}
      {/* <Favourites /> */}
      {/* <ProfileUser></ProfileUser> */}
      {/* <GoodsList /> */}
      {/* <CardInList></CardInList> */}
      {/* <GoodsCard></GoodsCard> */}
      {/* <InfoSeller></InfoSeller> */}
      {/* <InfoSeller></InfoSeller> */}
      {/* <DefaultFooter/> */}
      
      <FooterFinal/>

    </>
  )
}

export default App
