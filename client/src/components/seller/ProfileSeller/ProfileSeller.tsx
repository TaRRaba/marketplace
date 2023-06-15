import React from 'react'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiTable, HiChartPie, HiAdjustments } from 'react-icons/hi';
import { Link, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';

export default function ProfileSeller() {

  const goods = useAppSelector((state: RootState) => state.goodsSeller.goodsSeller);

  return (
    <div className="grid grid-cols-3 mt-12" >

    <div >
    <Sidebar aria-label="Default sidebar example">
      <div className="flex justify-center">
          <UserCircleIcon className="flex justify-center h-28 w-28 text-gray-300" aria-hidden="true" />
      </div>
      <p className=' pb-9'>Name</p>

  <Sidebar.Items>
    <Sidebar.ItemGroup>

      <Link to="/profileSeller/settings">
      <Sidebar.Item
      icon={HiAdjustments}>
        <p>Настройки</p>
      </Sidebar.Item>
      </Link>

      <Link to="/profileSeller/goods">
      <Sidebar.Item
        icon={HiTable}
        label={goods.length}>
        <p>Товары</p>
      </Sidebar.Item>
      </Link>
    
      <Link to="/profileSeller/reports">
      <Sidebar.Item
        icon={HiChartPie}>
        <p>Отчет</p>
      </Sidebar.Item>
      </Link>

      <Sidebar.Item
        icon={HiArrowSmRight}>
        <p>Выйти</p>
      </Sidebar.Item>

      <Link to="profileSeller/new_goods"> 
      </Link> 
      <Link to="profileSeller/edit_goods/:id"> 
      </Link> 

    </Sidebar.ItemGroup>
  </Sidebar.Items>
</Sidebar>
    </div>

<div className='col-span-2'>
    <Outlet></Outlet>
</div>

</div>
  )
}
