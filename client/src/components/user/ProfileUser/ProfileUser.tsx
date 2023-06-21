import React from 'react'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiUser, HiShoppingBag, HiInbox } from 'react-icons/hi';
import Settings from '../SettingsUser/SettingsUser';
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { deleteUser, resetCheckUser } from '../../../redux/store/userSlice';
import { RootState } from '../../../redux/store/store';

export default function ProfileUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const favouritesAll = useAppSelector((state: RootState) => state.favourites.favourites);

  const favourites = favouritesAll?.filter((el) => el.Good.archive === false)    
  
  const signOut = () => {
    fetch('http://localhost:3001/api/auth/logout', {
      credentials: 'include',
    })
    .then((res) => res.json())
    // .then((data) => console.log(data))
    .catch((error) => console.log(error))
    dispatch(deleteUser({}))
    dispatch(resetCheckUser(false))
    navigate('/')
  }

  return (
    <div className="grid grid-cols-3" >
        <div >
        <Sidebar aria-label="Default sidebar example">
        <div className="flex justify-center">
            <UserCircleIcon className="flex justify-center h-28 w-28 text-gray-300" aria-hidden="true" />
        </div>
            <p>
            Name
            </p>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
          >

          </Sidebar.Item>
          <Link to="/profile/settings">
          <Sidebar.Item
          icon={HiUser}
          >
            <p>
            Учетные данные
            </p>
          </Sidebar.Item>
          </Link>
          <Link to="/profile/favourites">
          <Sidebar.Item
            icon={HiInbox}
            label={favourites.length > 0 ? favourites.length : null}
          >
            <p>
              Избранное
            </p>
          </Sidebar.Item>
          </Link>
          <Link to="/profile/orders">
          <Sidebar.Item
            icon={HiShoppingBag}
          >
            <p>
                Заказы
            </p>
          </Sidebar.Item>
          </Link>
          <Sidebar.Item
            onClick={signOut}
            icon={HiArrowSmRight}>
            <p>
              Выйти
            </p>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    <Link to="/profile/orders/:id" />
        </div>
    <div className='col-span-2'>
        <Outlet />
    </div>
    </div>
  )
}
