import React from 'react'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiInbox, HiShoppingBag } from 'react-icons/hi';
import Settings from '../SettingsUser/SettingsUser';
import { useAppDispatch } from '../../../redux/store/hooks';
import { useNavigate } from 'react-router-dom';
import { deleteUser, resetCheckUser } from '../../../redux/store/userSlice';

export default function ProfileUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  
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
          <Sidebar.Item
            href="#"
          >
            <p>
            Изменить
            </p>
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiInbox}
            label="3"
          >
            <p>
              Избранное
            </p>
          </Sidebar.Item>
        
          <Sidebar.Item
            href="#"
            icon={HiShoppingBag}
          >
            <p>
                Заказы
            </p>
          </Sidebar.Item>
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
        </div>
    <div className='col-span-2'>
        <Settings></Settings>
    </div>
    </div>
  )
}
