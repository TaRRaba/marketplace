import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks'
import { RootState } from '../../redux/store/store'

import { Link } from 'react-router-dom'
import { deleteUser, resetCheckUser } from '../../redux/store/userSlice'
import { deleteSeller, resetCheckSeller } from '../../redux/store/sellerSlice'
import classNames from 'classnames'

export const NewEntriesMenu = () => {

  const dispatch = useAppDispatch();

  const userIsActive = useAppSelector((state: RootState) => state.users.check)
  const sellerIsActive = useAppSelector((state: RootState) => state.sellers.check)
  const seller = useAppSelector((state: RootState) => state.sellers.seller)
  const user = useAppSelector((state: RootState) => state.users.users)

  const signOut = () => {
    fetch('http://localhost:3001/api/auth/logout', {
      credentials: 'include',
    })
    .then((res) => res.json())

    .catch((error) => console.log(error))
    dispatch(deleteUser({}))
    dispatch(deleteSeller({}))
    dispatch(resetCheckUser(false))
    dispatch(resetCheckSeller(false))
  }


  return (
    <Menu as="div" className="relative inline-block text-left">
    <div>
    {userIsActive ? 
      <Menu.Button className="inline-flex w-full  truncate  justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        Привет,  {user.name}!
        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
      </Menu.Button>
        : sellerIsActive ?
        <Menu.Button className="inline-flex w-full truncate  first:justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        Привет,  {seller.name}!
        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
      </Menu.Button>
        :
        <>
        </>
        }
    </div>

    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
        {userIsActive ? 
        <>
          <Link  to='/profile/settings'>
           <Menu.Item>
           {({ active }) => (
             <p
               
               className={classNames(
                 active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                 'block px-4 py-2 text-sm'
               )}
             >
               Профиль
             </p>
           )}
         </Menu.Item>  
         </Link>
         
           <Menu.Item >
           {({ active }) => (
             <p
             onClick={signOut}
               className={classNames(
                 active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                 'block px-4 py-2 text-sm'
               )}
             >
               Выйти
             </p>
           )}
         </Menu.Item>  
         </>
        : sellerIsActive ?
        <>
           <Link  to='/profileseller/settings'>
           <Menu.Item>
           {({ active }) => (
             <p
               
               className={classNames(
                 active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                 'block px-4 py-2 text-sm'
               )}
             >
               Профиль продавца
             </p>
           )}
         </Menu.Item>  
         </Link>
         
           <Menu.Item >
           {({ active }) => (
             <p
             onClick={signOut}
               className={classNames(
                 active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                 'block px-4 py-2 text-sm'
               )}
             >
               Выйти
             </p>
           )}
         </Menu.Item> 
        </>
    :
    <>
    </>
    }

        </div>
      </Menu.Items>
    </Transition>
  </Menu>
  )
}
