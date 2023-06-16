import React from 'react'
import { useAppSelector } from '../../../redux/store/hooks'
import { RootState } from '../../../redux/store/store'

export default function SettingsSeller() {

  const sellerData = useAppSelector((state: RootState) => state.sellers.seller)
  return (
    <div className='grid gap-8'>
        <h1>Имя: {sellerData.name}</h1>
        <h2>Email: {sellerData.email}</h2>
        <h2>ИНН: {sellerData.inn}</h2>
        <div className='flex justify-center'>
        <button
            type="button"
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Изменить
        </button>
        </div>
        <h2>Пароль: •••••••••••</h2>
        <div className='flex justify-center'>
        <button
            type="button"
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Изменить
        </button>
        </div>
        <div className='flex justify-center'>
        <button
            type="button"
            className="rounded-md bg-red-400 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500">
            Удалить профиль
        </button>
        </div>
    </div>
  )
}
