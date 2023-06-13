import React from 'react'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiTable, HiChartPie } from 'react-icons/hi';
import SettingsSeller from '../SettingsSeller/SettingsSeller';

export default function ProfileSeller() {
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
        icon={HiTable}
        label="3"
      >
        <p>
          Товары
        </p>
      </Sidebar.Item>
    
      <Sidebar.Item
        href="#"
        icon={HiChartPie}
      >
        <p>
            Отчет
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
    <SettingsSeller></SettingsSeller>
</div>
</div>
  )
}
