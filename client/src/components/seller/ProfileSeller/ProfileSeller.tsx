import { useEffect } from 'react'
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
  const seller = useAppSelector((state: RootState) => state.sellers.seller)
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

    .catch((error) => console.log(error))
    dispatch(deleteSeller({}))
    dispatch(resetCheckSeller(false))
    navigate('/')
  }
  
  return (
    <div className="grid grid-cols-5 mt-12" >

    <div >
    <Sidebar aria-label="Default sidebar example">
      <div className="h-40 flex justify-center">
        <img className='rounded-full' src="/avatarSeller.gif" alt="avatar" />
      </div>
      <p className='pb-2 pt-3 text-center'>{seller.name}</p>

  <Sidebar.Items>
    <Sidebar.ItemGroup className=' pl-3'>
    <Sidebar.Item/>
    
      <Link to="/profileSeller/settings">
      <Sidebar.Item
      className="hover:bg-[#0d7490]/10"
      icon={HiUser}>
        <p>Учетные данные</p>
      </Sidebar.Item>
      </Link>

      <Link to="/profileSeller/goods">
      <Sidebar.Item
      className="hover:bg-[#0d7490]/10"
      icon={HiShoppingBag}
        label={goods.length > 0 ? goods.length : null}>
        <p>Товары</p>
      </Sidebar.Item>
      </Link>

      <Link to="/profileSeller/orders">
      <Sidebar.Item
        className="hover:bg-[#0d7490]/10"
        icon={HiTable}>
        <p>Заказы</p>
      </Sidebar.Item>
      </Link>
    
      <Link to="/profileSeller/reports">
      <Sidebar.Item
        className="hover:bg-[#0d7490]/10"
        icon={HiChartPie}>
        <p>Отчеты</p>
      </Sidebar.Item>
      </Link>

      <Sidebar.Item
      className="cursor-pointer hover:bg-[#0d7490]/10"
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

<div className='col-span-4'>
    <Outlet></Outlet>
</div>

</div>
  )
}
