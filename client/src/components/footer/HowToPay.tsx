import React from 'react'

export const HowToPay = () => {
  return (
          <div className="bg-neutral-50 p-5">
        
      <div className="flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
      <div className="w-full flex 2xl:w-full pt-10 pb-20 pr-10 justify-evenly bg-white rounded-xl shadow-xl items-center">
    <div>
      <h4 className="text-3xl text-center text-gray-900 mb-10 font-medium">Способы оплаты</h4>
      <div className='ml-10 mb-2 grid lg:grid-cols-2  md:grid-cols-2 sm:grid-cols-1'>
      <div className='w-full flex content-center'>

      <img src='/Pay/Payment.png' alt='способ оплаты' className='max-h-80 m-auto'></img>
      </div>
      <div className='w-full'>
      <div className='w-full mb-2'>Некоторые способы оплаты могут быть недоступны для выбранного региона или способа доставки.</div>
      <div className='mb-5'>Покупая на LocalMarket, вы можете выбрать любой из доступных способов оплаты.</div>
      <h2 className=' mb-2 text-lg font-semibold'>Банковская карта</h2>

      <div className='mb-1'>Чтобы оплатить заказ банковской картой:</div>
      <ul className='list-decimal mb-2'>
        <li>При оформлении заказа в разделе Корзина нажмите Перейти к оплате;</li>
        <li>В открывшейся форме заполните необходимые поля;</li>
        <li>Нажмите Оплатить заказ.</li>
      </ul>
      <h3 className='mb-1'>К оплате принимаются банковские карты, у которых 16, 18, 19 цифр в номере:</h3>
    
      <ul className='list-disc'>
        <li className='mb-1'>VISA, MasterCard, China UnionPay, JCB и American Express;</li>
        <li className='mb-1'>VISA Electron/Plus, Cirrus/Maestro, если у них есть код CVC2 и CVV2;</li>
      </ul>
      <h3 className=' mt-5 text-lg font-semibold'>После оплаты заказа вы получите электронный чек.</h3>
      </div>
      </div>
    </div>
    </div>
      </div>
      </div>
  )
}
