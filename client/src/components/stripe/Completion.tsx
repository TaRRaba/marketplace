import React from 'react'

export default function Completion() {
  return (
    <div className=' flex flex-col justify-center justify-items-center justify-self-center content-center self-center items-center min-h-screen' >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-emerald-600 w-32 h-32">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
      <h1 className='text-6xl'>Спасибо! 🎉</h1>
      <h1 className='text-4xl'>Платеж успешно обработан</h1>
      <p>Мы свяжемся с вами в ближайшее время</p>
      <p>Номер вашего заказа #</p>
      <button>Вернуться в магазин</button>
    </div>
  )
}