import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks'
import { RootState } from '../../redux/store/store'
import { Link, useNavigate } from 'react-router-dom';
import { deleteUser, resetCheckUser } from '../../redux/store/userSlice';
import { deleteSeller, resetCheckSeller } from '../../redux/store/sellerSlice';

export const EntriesMenu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const [showMenuUser, SershowMenuUser] = useState('hidden')

  const userIsActive = useAppSelector((state: RootState) => state.users.check)
  const sellerIsActive = useAppSelector((state: RootState) => state.sellers.check)

  const signOut = () => {
    fetch('http://localhost:3001/api/auth/logout', {
      credentials: 'include',
    })
    .then((res) => res.json())
    // .then((data) => console.log(data))
    .catch((error) => console.log(error))
    dispatch(deleteUser({}))
    dispatch(deleteSeller({}))
    dispatch(resetCheckUser(false))
    dispatch(resetCheckSeller(false))
    navigate('/')
  }

  const openMenuUser = () => {
    SershowMenuUser('visible')     
  }
  const closeMenuUser = () => {
    SershowMenuUser('hidden')     
  }

  return (
    
    <div onMouseEnter={openMenuUser}  className="relative inline-block text-left">
  <div>
    <button   type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
      Entries
      <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
    {userIsActive ?
    <>
       <div style={{visibility: showMenuUser}} onMouseLeave={closeMenuUser} className="menuUser absolute right-0 z-20 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
    <div className="py-1 hover:bg-slate-100" role="none">
    <Link to='/profile'>
      <a  className="text-gray-700 block px-4 py-2 text-sm " role="menuitem"  id="menu-item-0">Profile</a>    
      </Link>
    </div>  
   
    <div className="py-1" role="none">

      <a onClick={signOut} className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100" role="menuitem"  id="menu-item-6">Sing out</a>
    </div>
  </div>
    </>
    : sellerIsActive ?
    <>
           <div style={{visibility: showMenuUser}} onMouseLeave={closeMenuUser} className="menuUser absolute right-0 z-20 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >

    <div className="py-1 hover:bg-slate-100" role="none">
            <Link to='/profileSeller/settings'>
      <button  className="text-gray-700 block px-4 py-2 text-sm " role="menuitem"  id="menu-item-0">Profile seller</button>    
            </Link>
    </div>  
   
    <div className="py-1" role="none">
      <a onClick={signOut} className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100" role="menuitem"  id="menu-item-6">Seller Sing out</a>
    </div>
  </div>
    </>
    :
    <>
    
    </>
    }

 
</div>
  )
}
