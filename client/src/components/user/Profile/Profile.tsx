import React from 'react'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiInbox, HiShoppingBag } from 'react-icons/hi';
import Settings from '../Settings/Settings';

export default function Profile() {
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
            href="#"
            icon={HiArrowSmRight}
          >
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
