import React from 'react'

export function MakeOrder() {
  return (
    <>
      <div className="bg-neutral-50 p-5">
        <div className="flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
          <div className="w-full flex 2xl:w-full justify-evenly bg-white rounded-xl shadow-xl items-center">
            <div className="flex-col p-8">
              <h4 className="text-3xl text-gray-900 font-medium">Как сделать заказ</h4>
              <p className="text-lg ml-3 mt-6 mb-3 text-gray-700 font-small">1. Выберите товары и добавьте их в корзину.</p>
              <p className="flex text-lg ml-3 mt-3 mb-3 text-gray-700 font-small">2. Перейдите в раздел Корзина.</p>
              <p className="text-lg ml-3 mt-3 mb-3 text-gray-700 font-small">3. Выберите способ доставки и укажите адрес.</p>
              <p className="text-lg ml-3 mt-3 mb-3 text-gray-700 font-small">4. Нажмите Перейти к оплате</p>
              <p className="text-lg ml-3 mt-3 mb-3 text-gray-700 font-small">5. Выберите способ оплаты и нажмите Оплатить заказ</p>
              <p className="text-lg ml-3 mt-3 mb-3 text-gray-700 font-small">6. Оплатите заказ.</p>
            </div>
            <div className='m-10' >
            <img className='w-5/6 rounded-lg' src="/online_shopping.gif" alt="online shopping" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
