import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { RootState } from '../../redux/store/store';
import { getCart } from '../../redux/thunks/cartThunks/getCart.thunk';
import { getFav } from '../../redux/thunks/favThunks/getFav.thunk';

export default function Completion() {
  const [numberOrder, setNumberOrder] = useState(0);
  const user = useAppSelector((state: RootState) => state.users.check);
  const dispatch = useAppDispatch();

  useEffect(() => {    
    (async function () {
      const response = await fetch('http://localhost:3001/api/cart/numberoforder', {
        credentials: 'include'
      })
      const result = await response.json()
      const { order, sellers } = result;
      setNumberOrder(order.id);
    })()
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(getCart())
      dispatch(getFav())
  }
  }, [user])
  

  return (
    <div className='flex flex-col gap-y-3 justify-center justify-items-center justify-self-center content-center self-center items-center' >
      <div className="bg-gray-100 p-8">
        <div className="flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
          <div className="w-full flex 2xl:w-full justify-evenly bg-white rounded-lg shadow-xl items-center">
            <div className="flex flex-col justify-center justify-items-center justify-self-center content-center self-center items-center p-8">
              <h4 className="text-3xl text-gray-800 font-medium">Платеж успешно обработан</h4>
              <img className='w-5/6 rounded-lg' src="/payment.gif" alt="online shopping" />
              <p className="text-3xl ml-3 mb-1 text-gray-700 font-small">Спасибо!</p>
              <p className="flex text-lg ml-3  mb-1 text-gray-700 font-small">Мы свяжемся с вами в ближайшее время</p>
              <p className="text-lg ml-3 mb-1 text-gray-700 font-small">Номер вашего заказа # {numberOrder}</p>
              <Link to="/">
              <p className="flex gap-1 text-lg ml-3 mb-1 text-gray-700 font-small cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
              </svg>
                 Вернуться к покупкам
              </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}