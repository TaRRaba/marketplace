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
import { useAppDispatch, useAppSelector } from './redux/store/hooks'
import { useEffect } from 'react'
import { checkUser, setUser } from './redux/store/userSlice'
import { checkSeller, setSeller } from './redux/store/sellerSlice'
import Reports from './components/seller/Reports/Reports'
import Stripe from './components/stripe/Stripe'
import Completion from './components/stripe/Completion'
import { EditGoods } from './components/seller/GoodsSeller/EditGoods'

import { BannerPromotion } from './components/goods/BannerPromotion'
import { getAllGood } from './redux/thunks/goodThunks/gatAllGoods.thunk'

import { Orders } from './components/orders/Orders'
import { DetailOrder } from './components/user/Orders/DetailOrder'

import { Maps } from './components/map/Maps'
import { SellerOrders } from './components/sellerOrders/SellerOrders'
import { RootState } from './redux/store/store'
import SettingsUser from './components/user/SettingsUser/SettingsUser'

function App() {
  const category = useAppSelector((state: RootState) => state.good.category)
  const good = useAppSelector((state: RootState) => state.good.allgood)
  const dispatch = useAppDispatch()

  useEffect( () => {
    (async function () { try {
        const response = await fetch ('http://localhost:3001/api/auth/checkUser', {
        credentials: "include",
        })
        const result = await response.json()
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
            dispatch(setSeller({id: result.id, name: result.name, email: result.email, INN: result.INN}))    
          }
        } catch (error) {
          console.log(error);
        }      
            
        })()
      }, [])

      useEffect(() => {
        dispatch(getAllGood())
    }, [])

  console.log('Проверка связи');

  return (
    <> 
    <div className='min-h-full flex flex-col'>
      <UserNavBar/>
      <div className='flex-grow '>
      <Routes>
      <Route path="/cart" element={<Cart />} />
      <Route path="/completion" element={<Completion />}></Route>
      {/* <Routes>
      <Route path="/cart" element={<Cart />}/>
      {/* <Route path="/Bannerpromotion" element={<BannerPromotion />}/> */}
      <Route path="/profile" element={<ProfileUser />}/>
      {category && category.map((el) => (
        <Route key={`cat_${el.id}`} path={`/${el.name}`} element={<GoodsList CatId={el.id} />}/>  
      ))}     
      {good && good.map((el) => (
        <Route key={`good_${el.id}`} path={`/goods/${el.name}`} element={<GoodsCard GoodID={el.id} />}/>  
      ))}    
      <Route path="/infoSeller" element={<InfoSeller />}/>      
      <Route path="/" element={<Main/>}/>
      <Route path="/search" element={<SearchCard/>}/>
      <Route path="/profileSeller" element={<ProfileSeller/>}> 
          <Route path='settings' element={<SettingsSeller/>}></Route>
          <Route path='goods' element={<GoodsSeller />}></Route>
          <Route path='new_goods' element={<NewGoodsSeller />}></Route>
          <Route path='edit_goods/:id' element={<EditGoods />}></Route>   
          <Route path='orders' element={<SellerOrders />}></Route>  
          <Route path='reports' element={<Reports />}></Route>     
      </Route>
      <Route path="/profile" element={<ProfileUser/>}> 
          <Route path='settings' element={<SettingsUser/>}></Route>
          <Route path='favourites' element={<Favourites />}></Route>
          <Route path='orders' element={<Orders />}></Route>    
          <Route path='orders/:id' element={<DetailOrder />}></Route>   
      </Route>
      <Route path="/delivery_points" element={<Maps/>}/>
      <Route path="/makeOrder" element={<Maps/>}/>
      <Route path="/payment" element={<Maps/>}/>
      </Routes>
      </div>
      {/* <Stripe></Stripe> */}
      {/* <RegistrationSeller></RegistrationSeller> */}
      {/* <LoginSeller></LoginSeller> */}
      {/* <RegistrationUser></RegistrationUser>
      <LoginUser></LoginUser> */}
      {/* <ProfileUser></ProfileUser> */}
      {/* <ProfileSeller></ProfileSeller> */}
      {/* <Cart /> */}
      {/* <Orders /> */}
      {/* <Favourites /> */}
      {/* <ProfileUser></ProfileUser> */}
      {/* <GoodsList /> */}
      {/* <SellerOrders></SellerOrders> */}
      {/* <CardInList></CardInList> */}
      {/* <GoodsCard></GoodsCard> */}
      {/* <InfoSeller></InfoSeller> */}
      {/* <InfoSeller></InfoSeller> */}
      {/* <DefaultFooter/> */}
      {/* <FooterFinal/> */}
      {/* <DetailOrder></DetailOrder> */}

      <FooterFinal/>
      </div>
    </>
  )
}

export default App
