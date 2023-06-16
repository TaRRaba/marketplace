import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks'
import { RootState } from '../../../redux/store/store'
import { useNavigate } from 'react-router-dom'
import { patchSellerData } from '../../../redux/thunks/SellerThunks/patchSellerData.thunk'
import { putSellerPassword } from '../../../redux/thunks/SellerThunks/putSellerPassword.thunk'
import { delSeller } from '../../../redux/thunks/SellerThunks/delSeller.thunk'
import { deleteSeller, resetCheckSeller } from '../../../redux/store/sellerSlice'

export default function SettingsSeller() {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const sellerData = useAppSelector((state: RootState) => state.sellers.seller)
  const [selleEditProfile, setSelleEditProfile] = useState(false);
  const [sellerChangePassword, setSellerChangePassword] = useState(false);
  const [inputValueSeller, setInputValueSeller] = useState({ name: '', email: '', INN: '' });
  const [inputValuePassword, setInputValuePassword] = useState({ password: '' });

  useEffect(() => {
    if (sellerData) {
      setInputValueSeller({ name: sellerData.name, email: sellerData.email, INN: sellerData.INN });
    }
  }, [sellerData]);

  const editSellerProfile = () => {
    setSelleEditProfile(true)
  }

  const changeSellerData = (e) => {
    setInputValueSeller((prevState) => ({...prevState, [e.target.name]: e.target.value}))
  }

  const saveSellerProfile = () => {
    setSelleEditProfile(false)
    const data = {id: sellerData.id,
      name:inputValueSeller.name,
    email: inputValueSeller.email,
    INN: inputValueSeller.INN}
    dispatch(patchSellerData(data))
  }

  const editSellerPassword = () => {
    setSellerChangePassword(true)
  }
  const changeSellerPassword = (e) => {
    setInputValuePassword((prevState) => ({...prevState, [e.target.name]: e.target.value}))
  }

  const saveSellerPassword = () => {
    if(inputValuePassword.password === ''){
      setSellerChangePassword(false)
    } else{     
      setSellerChangePassword(false)
      const data = {id: sellerData.id,        
      password: inputValuePassword.password}
      console.log(data);
      
      dispatch(putSellerPassword(data))
    }
  }

  const delSellerHandler = () => {
    const data = { id: sellerData.id}
     dispatch(delSeller(data))
     dispatch(resetCheckSeller(false))
     dispatch(deleteSeller({}))
     navigate("/")
   }
   
  console.log(inputValuePassword);
  

  return (
    <div className='grid gap-8'>
      {selleEditProfile ? 
      <>
        <div className='flex items-center'>
        <h1>Имя: </h1>
        <input onChange={changeSellerData}  type='text' name="name" className='ml-2  border-2 border-gray-500 rounded-lg w-1/4 text-center' defaultValue={sellerData.name}/>
        </div>
        <div className='flex items-center'>
        <h2>Email: </h2>
        <input onChange={changeSellerData}  type='text' name="email" className='ml-2  border-2 border-gray-500 rounded-lg w-1/4 text-center' defaultValue={sellerData.email}/>
        </div>
        <div className='flex items-center'>
        <h2>ИНН: </h2>
        <input onChange={changeSellerData} type='text' name="INN" className='ml-2  border-2 border-gray-500 rounded-lg w-1/4 text-center' defaultValue={sellerData.INN}/>
        </div>
        <div className='flex justify-center'>
        <button
            onClick={saveSellerProfile}
            type="button"
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Сохранить изменения
        </button>
        </div>
      </> : 
      <>
         <h1>Имя: {sellerData.name}</h1>
        <h2>Email: {sellerData.email}</h2>
        <h2>ИНН: {sellerData.INN}</h2>
        <div className='flex justify-center'>
        <button
            onClick={editSellerProfile}
            type="button"
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Изменить
        </button>
        </div>
      </>}
        {sellerChangePassword ? 
        <>
        <div className='flex items-center'>
         <h2>Пароль: </h2>
         <input onChange={changeSellerPassword}  type='password' name="password" className='ml-2  border-2 border-gray-500 rounded-lg w-1/4 text-center' required/>
         </div>
        <div className='flex justify-center'>
        <button
            onClick={saveSellerPassword}
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
            onClick={editSellerPassword}
            type="button"
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Изменить
        </button>
        </div>
        </>}
 
        <div className='flex justify-center'>
        <button
            onClick={delSellerHandler}
            type="button"
            className="rounded-md bg-red-400 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500">
            Удалить профиль
        </button>
        </div>
    </div>
  )
}
