import React from 'react'

export function MakeOrder() {
  return (
    <>
      <nav className="flex bg-gray-100 text-gray-700 py-3 px-5" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a href="/" className="text-gray-500 hover:text-black text-sm inline-flex font-medium items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
              <span className="text-gray-500 hover:text-black text-sm font-medium">Главная</span>
            </a>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
              <span className="text-gray-400 ml-1 md:ml-2 text-sm font-medium">Оплата</span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="bg-gray-100 p-8">
        <div className="flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
          <div className="w-full flex 2xl:w-full justify-evenly bg-white rounded-lg shadow-xl items-center">
            <div className="flex-col p-8">
              <h4 className="text-3xl text-gray-900 font-medium">Как сделать заказ</h4>
              <p className="text-lg ml-3 mt-6 mb-3 text-gray-700 font-small">1. Выберите товары и добавьте их в корзину.</p>
              <p className="text-lg ml-3 mt-3 mb-3 text-gray-700 font-small">2. Перейдите в раздел Корзина.</p>
              <p className="text-lg ml-3 mt-3 mb-3 text-gray-700 font-small">3. Выберите способ доставки и укажите адрес.</p>
              <p className="text-lg ml-3 mt-3 mb-3 text-gray-700 font-small">4. Нажмите Перейти к оплате</p>
              <p className="text-lg ml-3 mt-3 mb-3 text-gray-700 font-small">5. Выберите способ оплаты и нажмите Оплатить заказ</p>
              <p className="text-lg ml-3 mt-3 mb-3 text-gray-700 font-small">6. Оплатите заказ.</p>
            </div>
            <div className='h-5/6 m-10'>
            <img className='rounded-lg' src="/public/online_shopping.jpeg" alt="online shopping" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
