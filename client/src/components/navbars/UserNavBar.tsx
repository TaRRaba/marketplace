
import { Link, useLocation } from 'react-router-dom'

import { EntriesMenu} from './EntriesMenu'

import CatalogFinal from './CatalogFinal'
import { SearchBar } from './SearchBar'
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks'
import { changeModallog, changeModalreg } from '../../redux/store/userSlice'
import { RootState } from '../../redux/store/store'
import { changeModallogSeller, changeModalregSeller } from '../../redux/store/sellerSlice'
import LoginSeller from '../seller/LoginSeller/LoginSeller'
import LoginUser from '../user/LoginUser/LoginUser'
import RegistrationUser from '../user/RegistrationUser/RegistrationUser'

import NewCatalog from './NewCatalog'

import { useEffect, useState } from 'react'
import { getCart } from '../../redux/thunks/cartThunks/getCart.thunk'
import { getFav } from '../../redux/thunks/favThunks/getFav.thunk'
import { NewEntriesMenu } from './NewEntriesMenu'


export const UserNavBar = () => {

  const userIsActive = useAppSelector((state: RootState) => state.users.check)
  const sellerIsActive = useAppSelector((state: RootState) => state.sellers.check)
  const user = useAppSelector((state: RootState) => state.users.check);
  const cart = useAppSelector((state: RootState) => state.cart.cart);
  const favourites = useAppSelector((state: RootState) => state.favourites.favourites);
  const [cartIcon, setCartIcon] = useState(false);
  const [favIcon, setFavIcon] = useState(false);
  const location = useLocation()
 

  const dispatch = useAppDispatch();





      const setModalActiveLog = () => {
      dispatch(changeModallog(true))
    }

      const setModalActiveReg = () => {
    dispatch(changeModalreg(true))
  }

  useEffect(() => {
    if (user) {
      dispatch(getCart())
      dispatch(getFav())
  }
  }, [])

  useEffect(() => {
    if (favourites.length > 0) {
      setFavIcon(true);
  } else if (favourites.length === 0) {
    setFavIcon(false); 
  }
  }, [favourites])

  useEffect(() => {
    if (cart.length > 0) {
      setCartIcon(true);
  } else if (cart.length === 0) {
    setCartIcon(false); 
  }
  }, [cart])

  const setModalActiveRegseller = () => {
    dispatch(changeModalregSeller(true))
  }

  const setModalActiveLogSeller = () => {
    dispatch(changeModallogSeller(true))
  }

 //--Добавление локации города пользователя --------------------------------------
//  const [loc, setLoc] = useState('')
//  const locat = ymaps.geolocation.get({
//    provider: 'browser'
// });

//  locat.then(
//    function(result) {
//       // Получение местоположения пользователя.
//       const userAddress = (result.geoObjects?.get(0).properties?.get('text'));
//      setLoc(userAddress)
//    },
//    function(err) {
//      console.log('Ошибка: ' + err)
//    }
//  );

//-----------------------------------------------------------------------------

  
    
  return (    
   
    <nav className='grid px-5 sticky top-0 bg-gray-100 z-10'>
          <LoginUser />
    <RegistrationUser />
      <LoginSeller/>
      <div className='flex justify-between'>
        <div><span className='flex items-center text-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" height="25" width="25"><path fill="#ff6d37" d="M42 21C42 33.9185 28.6491 43.1283 24.9437 45.4357C24.3571 45.8009 23.6429 45.8009 23.0563 45.4357C19.3509 43.1283 6 33.9185 6 21C6 11.0589 14.0589 3 24 3C33.9411 3 42 11.0589 42 21Z"></path><path fill="#ffffff" d="M32.942 23.8215C33.9225 22.2351 34.2415 20.2696 33.815 18.4421C32.9038 14.2794 27.8581 12.5783 24.7152 15.368C24.4663 15.5874 24.2449 15.8405 24 16.0927C23.7551 15.8405 23.5337 15.5874 23.2848 15.368C20.1419 12.5783 15.0962 14.2794 14.185 18.4421C13.7585 20.2696 14.0775 22.2351 15.058 23.8215C16.6502 26.4016 19.1471 28.4518 21.6551 30.3016C23.0456 31.3272 24.9544 31.3272 26.3449 30.3016C28.8529 28.4518 31.3498 26.4016 32.942 23.8215Z"></path><path stroke="#3e3e3e" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M42 21C42 33.9185 28.6491 43.1283 24.9437 45.4357C24.3571 45.8009 23.6429 45.8009 23.0563 45.4357C19.3509 43.1283 6 33.9185 6 21C6 11.0589 14.0589 3 24 3C33.9411 3 42 11.0589 42 21Z"></path><path stroke="#3e3e3e" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M32.942 23.8215C33.9225 22.2351 34.2415 20.2696 33.815 18.4421C32.9038 14.2794 27.8581 12.5783 24.7152 15.368C24.4663 15.5874 24.2449 15.8405 24 16.0927C23.7551 15.8405 23.5337 15.5874 23.2848 15.368C20.1419 12.5783 15.0962 14.2794 14.185 18.4421C13.7585 20.2696 14.0775 22.2351 15.058 23.8215C16.6502 26.4016 19.1471 28.4518 21.6551 30.3016C23.0456 31.3272 24.9544 31.3272 26.3449 30.3016C28.8529 28.4518 31.3498 26.4016 32.942 23.8215Z"></path></svg> <span className=' ml-1'>
          {/* {loc.split(',')[0]} */}
          Локация
          </span></span></div>
        <div className='flex items-center'>
          {location.pathname === "/infoSeller" ?
          <>
{sellerIsActive ? 
          <>
          <Link to='/'>
                <div>Вернуться в магазин</div>
                </Link>
          </>
          :
          <>
        <Link to='/'>
                <div>Вернуться в магазин</div>
                </Link>
          </>
       
          }
          </>
          :
        <>
        {sellerIsActive ? 
          <>
          <Link to='/infoSeller'>
                <div>Информация для продавцов</div>
                </Link>
          </>
          :
          <>
          <Link to='/infoSeller'>
            <div>Стать продавцом</div>
            </Link>
          </>
       
          }
        </>  
        }
      
        </div>
        
      </div>
      <div className='mt-5 flex items-center'>
      <div className=" flex  ">
          <Link to='/'>

      <img
      className="mx-auto h-12 w-auto"
      src="/logo/LM5.png"
      alt="Your Company"
      />
      <p className="text-2xl font-bold text-blue-800 ml-4"></p>
          </Link>
      </div>
    
        <div className='ml-4 w-1/12'>
          <NewCatalog/>
        </div>
        <div className='ml-3 w-6/12 flex'>
         <SearchBar/>
        </div>
        {userIsActive ? 
        <>
        {location.pathname === "/infoSeller" ? 
        <> <div className='w-2/12'>       
        <NewEntriesMenu/>
      </div>      
      <button onClick={setModalActiveRegseller} className='ml-2 px-1 text-sm py-1 rounded-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-300'>Регистрация продавца</button>
      </> 
        :
        <> <div className='w-2/12'>       
        <NewEntriesMenu/>
      </div>      
       <Link to='/profile/favourites' className='w-1/12'>
                       <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-[#4520aa]/10">
                     <div className="relative">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                       <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                      </svg>
                      {favIcon ?
                       <span id="favIcon" className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">{favourites.length}</span>
                      : null }
                       </div>
                     <span className="text-sm font-medium">Избранное</span>
                   </div>
                   </Link>
                   <Link to='/cart' className='w-1/12'>
                   <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-[#4520aa]/10">
                     <div className="relative">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                         <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                       </svg>
                       {cartIcon ?
                       <span id="cartIcon" className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">{cart.length}</span>
                      :
                       null 
                       }
                      </div>
                     <span className="text-sm font-medium">Корзина</span>
                   </div>
                   </Link>
      </> 
      }
      </>
 
       :
       sellerIsActive ?
       <>
       <div className='w-2/12'>
       <NewEntriesMenu/>
       
       </div>
       <Link to='/profileSeller/orders' className='w-1/12'>
                    <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-[#4520aa]/10">
                      <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                        {cartIcon ?
                        <span id="cartIcon" className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">{cart.length}</span>
                       : null }
                       </div>
                      <span className="text-sm font-medium">Заказы</span>
                    </div>
                    </Link>
                    <Link to='/profileSeller/reports' className='w-1/12'>
                    <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-[#4520aa]/10">
                      <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                        {cartIcon ?
                        <span id="cartIcon" className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">{cart.length}</span>
                       : null }
                       </div>
                      <span className="text-sm font-medium">Отчеты</span>
                    </div>
                    </Link>
                    
       </> :location.pathname === "/infoSeller" ? 
       <>
     
         <div className='w-4/12 flex'>
        <button onClick={setModalActiveLogSeller} className='px-1 py-1 text-sm rounded-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-300'>Войти как продавец</button>
        <button onClick={setModalActiveRegseller} className='ml-2 px-1 text-sm py-1 rounded-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-300'>Регистрация продавца</button>

        </div>
      
       </>
       :
       <>
         
         <div className='w-2/12 flex'>
        <button onClick={setModalActiveLog} className='px-1 py-1 rounded-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-300'>Войти</button>
        <button onClick={setModalActiveReg} className='ml-2 px-1 py-1 rounded-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-300'>Регистрация</button>

        </div>
      
       </>
     
  
       }
     
    
      </div>
      
    </nav>

 


  
 
  )
}
