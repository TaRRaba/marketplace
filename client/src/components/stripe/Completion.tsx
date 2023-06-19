import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Completion() {
  const [numberOrder, setNumberOrder] = useState(0)

  useEffect(() => {    
    (async function () {
      const response = await fetch('http://localhost:3001/api/cart/numberoforder', {
        credentials: 'include'
      })
      const result = await response.json()
      setNumberOrder(result.id)
    })()
  }, [])

  return (
    <div className='flex flex-col gap-y-3 justify-center justify-items-center justify-self-center content-center self-center items-center min-h-screen' >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-emerald-600 w-36 h-36">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
      <h1 className='text-6xl'>Спасибо! 🎉</h1>
      <h1 className='text-4xl'>Платеж успешно обработан</h1>
      <p>Мы свяжемся с вами в ближайшее время</p>
      <p>Номер вашего заказа # {numberOrder}</p>
      <Link to="/">
        <div className='flex cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>Вернуться к покупкам</div>
      </Link>
    </div>
  )
}