import React, { useEffect } from 'react'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiTable, HiShoppingBag, HiUser, HiChartPie } from 'react-icons/hi';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/store/hooks';
import { deleteSeller, resetCheckSeller } from '../../../redux/store/sellerSlice';
import { useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import { getGoodsSeller } from '../../../redux/thunks/goodsSellerThunks/getGoodsSeller.thunk';

export default function ProfileSeller() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const goodsAll = useAppSelector((state: RootState) => state.goodsSeller.goodsSeller);

  const goods = goodsAll?.filter((el) => el.archive === false)

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
    <div className="grid grid-cols-4 mt-12" >

    <div >
    <Sidebar aria-label="Default sidebar example">
      <div className="h-40 flex justify-center">
        <img className='rounded-full' src="/avatarSeller.gif" alt="avatar" />
      </div>
      <p className='pb-6 text-center'>Name</p>

  <Sidebar.Items>
    <Sidebar.ItemGroup className=' pl-3'>

      <Link to="/profileSeller/settings">
      <Sidebar.Item
      icon={HiUser}>
        <p>Учетные данные</p>
      </Sidebar.Item>
      </Link>

      <Link to="/profileSeller/goods">
      <Sidebar.Item
      icon={HiShoppingBag}
        label={goods.length > 0 ? goods.length : null}>
        <p>Товары</p>
      </Sidebar.Item>
      </Link>

      <Link to="/profileSeller/orders">
      <Sidebar.Item
        icon={HiTable}>
        <p>Заказы</p>
      </Sidebar.Item>
      </Link>
    
      <Link to="/profileSeller/reports">
      <Sidebar.Item
        icon={HiChartPie}>
        <p>Отчеты</p>
      </Sidebar.Item>
      </Link>

      <Sidebar.Item
      className="cursor-pointer"
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

<div className='col-span-3'>
    <Outlet></Outlet>
</div>

</div>
  )
}
