
import { Link } from 'react-router-dom'

import { EntriesMenu} from './EntriesMenu'

import CatalogFinal from './CatalogFinal'
import { SearchBar } from './SearchBar'
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks'
import { changeModallog, changeModalreg } from '../../redux/store/userSlice'
import { RootState } from '../../redux/store/store'
import { changeModallogSeller } from '../../redux/store/sellerSlice'
import LoginSeller from '../seller/LoginSeller/LoginSeller'
import LoginUser from '../user/LoginUser/LoginUser'
import RegistrationUser from '../user/RegistrationUser/RegistrationUser'

import NewCatalog from './NewCatalog'

import { useEffect, useState } from 'react'
import { getCart } from '../../redux/thunks/cartThunks/getCart.thunk'
import { getFav } from '../../redux/thunks/favThunks/getFav.thunk'


export const UserNavBar = () => {

  const userIsActive = useAppSelector((state: RootState) => state.users.check)
  const sellerIsActive = useAppSelector((state: RootState) => state.sellers.check)
  const user = useAppSelector((state: RootState) => state.users.check);
  const cart = useAppSelector((state: RootState) => state.cart.cart);
  const favourites = useAppSelector((state: RootState) => state.favourites.favourites);
  const [cartIcon, setCartIcon] = useState(false);
  const [favIcon, setFavIcon] = useState(false);

  const dispatch = useAppDispatch();

  const setModalActiveLogSeller = () => {
    dispatch(changeModallogSeller(true))
  }



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
    
  return (    
   
    <nav className='grid px-5 sticky top-0 bg-gray-100 z-10'>
          <LoginUser />
    <RegistrationUser />
      <LoginSeller/>
      <div className='flex justify-between'>
        <div>Локация</div>
        <div className='flex items-center'>
          {sellerIsActive ? 
          <>
               

                <Link to='/infoSeller'>
                <div>Стать продавцом</div>
                </Link>
          </>
          :
          <>
          {userIsActive ? <>
          
          <Link to='/infoSeller'>
            <div>Стать продавцом</div>
            </Link></> : <><button onClick={setModalActiveLogSeller} className='mr-4 px-1 py-1 rounded-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-300'>Войти как продавец</button>
            <Link to='/infoSeller'>
            <div>Стать продавцом</div>
            </Link>
            </>}
          </>
          // <>
          //  <button onClick={setModalActiveLogSeller} className='mr-4 px-1 py-1 rounded-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-300'>Selleer Sing in</button>

          //   <Link to='/infoSeller'>
          //   <div>Become a seller</div>
          //   </Link>
          // </>
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
        {userIsActive ? <> <div className='w-2/12'>
        
        <EntriesMenu/>
       </div>
       {/* <Link to='/profile/favourites' className='w-1/12 ml-4'>
        <div>Избранное</div>
        </Link>
        <Link to='/cart' className='w-1/12'>
        <div >Корзина</div>
        </Link> */}
        <Link to='/profile/favourites' className='w-1/12'>
 {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                        <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg> */}
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
                       : null }
                       </div>
                      <span className="text-sm font-medium">Корзина</span>
                    </div>
                    </Link>
       </> :
       sellerIsActive ?
       <>
       <div className='w-2/12'>
        
        <EntriesMenu/>
       </div>
       </> :
       <>
         <div className='w-2/12'>
        <button onClick={setModalActiveLog} className='px-1 py-1 rounded-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-300'>Войти</button>
        <button onClick={setModalActiveReg} className='ml-2 px-1 py-1 rounded-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-300'>Регистрация</button>

        </div>
       </>
       }
        {/* <div className='w-2/12'>
        
         <EntriesMenu/>
        </div> */}
        {/* <div className='w-2/12'>
        <button onClick={setModalActiveLog} className='px-1 py-1 rounded-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-300'>Sing in</button>
        <button onClick={setModalActiveReg} className='ml-2 px-1 py-1 rounded-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-300'>Sing up</button>

        </div> */}
        {/* <Link to='/profile/favorites' className='w-1/12 ml-4'>
        <div>Favorites</div>
        </Link>
        <Link to='/cart' className='w-1/12'>
        <div >Cart</div>
        </Link> */}
      </div>
    </nav>

 


  
 
  )
}
