import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiUser, HiShoppingBag, HiInbox } from 'react-icons/hi';
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { deleteUser, resetCheckUser } from '../../../redux/store/userSlice';
import { RootState } from '../../../redux/store/store';

export default function ProfileUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const user = useAppSelector((state: RootState) => state.users.users)
  const favouritesAll = useAppSelector((state: RootState) => state.favourites.favourites);

  const favourites = favouritesAll?.filter((el) => el.Good.archive === false)    
  
  const signOut = () => {
    fetch('http://localhost:3001/api/auth/logout', {
      credentials: 'include',
    })
    .then((res) => res.json())
    
    .catch((error) => console.log(error))
    dispatch(deleteUser({}))
    dispatch(resetCheckUser(false))
    navigate('/')
  }

  return (
    <div className="grid grid-cols-3" >
        <div >
        <Sidebar aria-label="Default sidebar example">
          <div className="h-1/3 flex justify-center">
            <img className='rounded-full' src="/avatarUser.gif" alt="avatar" />
          </div>
          <p className='pb-2 pt-3 text-center'>{user.name}</p>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item/>

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
            className="cursor-pointer"
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
