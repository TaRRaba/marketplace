import React, { useEffect } from 'react'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiTable, HiChartPie, HiAdjustments } from 'react-icons/hi';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/store/hooks';
import { deleteSeller, resetCheckSeller } from '../../../redux/store/sellerSlice';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import { getGoodsSeller } from '../../../redux/thunks/goodsSellerThunks/getGoodsSeller.thunk';

export default function ProfileSeller() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const goods = useAppSelector((state: RootState) => state.goodsSeller.goodsSeller);

  useEffect(()=> {
    dispatch(getGoodsSeller())
  }, [])

  
  const signOut = () => {
    fetch('http://localhost:3001/api/auth/logout', {
      credentials: 'include',
    })
    .then((res) => res.json())
    // .then((data) => console.log(data))
    .catch((error) => console.log(error))
    dispatch(deleteSeller({}))
    dispatch(resetCheckSeller(false))
    navigate('/')
  }
  
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
        onClick={signOut}
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
