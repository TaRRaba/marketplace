import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks';
import {  changeModallogSeller, changeModalregSeller } from '../../../redux/store/sellerSlice';
import RegistrationSeller from '../RegistrationSeller/RegistrationSeller';
import { RootState } from '../../../redux/store/store';

export default function InfoSeller() {
    const dispatch = useAppDispatch();
    const sellerIsActive = useAppSelector((state: RootState) => state.sellers.check)


    const changeModalregSeller = () => {
  dispatch(changeModalreg(true))
}

  return (
    <>
    {sellerIsActive ?
    
    null
    :
    <>
    <RegistrationSeller/>
        {/* <button onClick={setModalActiveReg} className='ml-96 py-2 px-10 border-2 rounded-lg  border-gray-300 hover:border-gray-400 hover:bg-gray-300'>Зарегистрируйтесь</button> */}
    </>} 
    {/* <RegistrationSeller/>
        <button onClick={setModalActiveReg} className='ml-96 py-2 px-10 border-2 rounded-lg  border-gray-300 hover:border-gray-400 hover:bg-gray-300'>Seller Sing Up</button> */}

<div className="bg-gray-100 m-8">
        <div className="flex-col 2xl:flex-row space-y-4 4xl:space-y-0">

          <div className="w-full flex 2xl:w-full justify-between bg-white rounded-xl shadow-xl items-center">
            <div className="w-2/3 flex-col p-8">
              <h4 className="text-3xl text-gray-900 font-medium">Как стать продавцом на LocalMarket?</h4>
              <p className="text-lg ml-3 mt-6 mb-3 text-gray-700 font-small">Вы никогда не продавали на маркетплейсе? А может, вообще никогда не продавали? На этой странице собрано всё, чтобы легко и быстро стартовать на LocalMarket.</p>
            </div>
            <div className='w-1/3 m-10'>
            <img className='rounded-lg' src="/online_sell2.jpeg" alt="online shopping" />
            </div>
          </div>

          <div className="w-full flex 2xl:w-full justify-between rounded-xl shadow-xl items-center bg-white">
            <div className="w-2/3 flex-col p-8">
              <h4 className="text-3xl text-gray-900 font-medium">Шаг 1. Пройдите регистрацию</h4>
              <p className="text-lg ml-3 mt-6 mb-3 text-gray-700 font-small">Вам понадобится заполнить ИНН</p>
            </div>
            <div className='w-1/3 m-10'>
            <img className='rounded-lg' src="/dribble.gif" alt="online shopping" />
            </div>
          </div>

          <div className="w-full flex 2xl:w-full justify-between rounded-xl shadow-xl items-center bg-white">
            <div className="w-2/3 flex-col p-8">
              <h4 className="text-3xl text-gray-900 font-medium">Шаг 2. Заключите договор</h4>
              <p className="text-lg ml-3 mt-6 mb-3 text-gray-700 font-small">Форму договора пришлем вам на электронную почту</p>
            </div>
            <div className='w-1/3 m-10'>
            <img className='rounded-lg' src="/contract.gif" alt="online shopping" />
            </div>
          </div>

          <div className="w-full flex 2xl:w-full justify-between rounded-xl shadow-xl items-center bg-white">
            <div className="w-2/3 flex-col p-8">
              <h4 className="text-3xl text-gray-900 font-medium">Шаг 3. Добавьте товары</h4>
              <p className="text-lg ml-3 mt-6 mb-3 text-gray-700 font-small">Загрузите каталог прямо в личном кабинете</p>
            </div>
            <div className='w-1/3 m-10'>
            <img className='rounded-lg' src="GUmN.gif" alt="online shopping" />
            </div>
          </div>

          <div className="w-full flex 2xl:w-full justify-between rounded-xl shadow-xl items-center bg-white">
            <div className="w-2/3 flex-col p-8">
              <h4 className="text-3xl text-gray-900 font-medium">Шаг 4. Начинайте продавать</h4>
              <p className="text-lg ml-3 mt-6 mb-3 text-gray-700 font-small">Самостоятельно или под присмотром технических специалистов, которые прошли обучение у нас и могут помочь с развитием бизнеса на площадке. Если возникнут вопросы — мы всегда на связи в личном кабинете и соцсетях</p>
            </div>
            <div className='w-1/3 m-10'>
            <img className='rounded-lg' src="/animation.gif" alt="online shopping" />
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
