import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks'
import { RootState } from '../../../redux/store/store'
import { patchUserData } from '../../../redux/thunks/userThunks/patchUserData.thunk'
import { putUserPassword } from '../../../redux/thunks/userThunks/putUserPassword.thunk'
import { deleteUser, resetCheckUser } from '../../../redux/store/userSlice'
import { delUser } from '../../../redux/thunks/userThunks/delUser.thunk'
import { useNavigate } from 'react-router-dom'


export default function Settings() {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userData = useAppSelector((state: RootState) => state.users.users);
  const [userEditProfile, setUserEditProfile] = useState(false);
  const [userChangePassword, setUserChangePassword] = useState(false);
  const [inputValueUser, setInputValueUser] = useState({ name: '', email: '' });
  const [inputValuePassword, setInputValuePassword] = useState({ password: '' });

  useEffect(() => {
    if (userData) {
      setInputValueUser({ name: userData.name, email: userData.email });
    }
  }, [userData]);
  
  const editUserProfile = () => {
    setUserEditProfile(true)
  }

  const editUserPassword = () => {
    setUserChangePassword(true)
  }


  const saveUserPassword = () => {
    if(inputValuePassword.password === ''){
      setUserChangePassword(false)
    } else{     
      setUserChangePassword(false)
      const data = {id: userData.id,        
      password: inputValuePassword.password}
      dispatch(putUserPassword(data))
    }
  }

  const saveUserProfile = () => {
    setUserEditProfile(false)
    const data = {id: userData.id,
      name:inputValueUser.name,
    email: inputValueUser.email}
    dispatch(patchUserData(data))
  }

  const changeUserData = (e) => {
    setInputValueUser((prevState) => ({...prevState, [e.target.name]: e.target.value}))
  }
  const changeUserPassword = (e) => {
    setInputValuePassword((prevState) => ({...prevState, [e.target.name]: e.target.value}))
  }

  const delUserHandler = () => {
   const data = { id: userData.id}
    dispatch(delUser(data))
    dispatch(resetCheckUser(false))
    dispatch(deleteUser({}))
    navigate("/")
  }
  
  
  
  return (
    <div className='grid gap-8'>
      {userEditProfile ? 
      <>
            <div className='flex items-center'>
       <h1>Имя: </h1>
       <input onChange={changeUserData} type='text' name="name" className='ml-2  border-2 border-gray-500 rounded-lg w-1/4 text-center' defaultValue={userData.name}/>

      </div>
      <div className='flex items-center'>
       <h1>Email: </h1>
       <input onChange={changeUserData} type='text' name="email" className='ml-2 border-2 border-gray-500 rounded-lg w-1/4 text-center' defaultValue={userData.email}/>

      </div>
      <div className='flex justify-center'>
        <button
            onClick={saveUserProfile}
            type="button"
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
           Сохранить изменения
        </button>
        </div>
        
      </> : 
      <>
     <h1>Имя: {userData.name}</h1>
      
      <h2>Email: {userData.email}</h2>

      <div className='flex justify-center'>
        <button onClick={editUserProfile}
            type="button"
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Изменить
        </button>
        </div>
      </>
      }
      {userChangePassword ? <>
        <div className='flex items-center'>
        <h2>Пароль: </h2>
        <input onChange={changeUserPassword} type='password' name="password" className='ml-2  border-2 border-gray-500 rounded-lg w-1/4 text-center' required/>
        </div>
        <div className='flex justify-center'>
        <button
            onClick={saveUserPassword}
            type="button"
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Сохранить новый пароль
        </button>
        </div>
        
      </> :
      <>
      <h2>Пароль: •••••••••••</h2>
        <div className='flex justify-center'>
        <button
            onClick={editUserPassword}
            type="button"
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Изменить
        </button>
        </div>
      </>
      }
        <div className='flex justify-center'>
        <button
            onClick={delUserHandler}
            type="button"
            className="rounded-md bg-red-400 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500">
            Удалить профиль
        </button>
        </div>
    </div>
  )
}
