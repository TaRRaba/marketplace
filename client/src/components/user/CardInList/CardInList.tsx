import React from 'react'

export default function CardInList() {

  // const 

  return (
    <div className='grid grid-cols-12'>
        <div className='col-span-3'>
        Image
        {/* <img src={} alt={} /> */}
        </div>
        <div className='col-span-8 justify-self-start'>
            <h1>Название товара</h1>
            <p>Описание товара</p>
        </div>
        <div className='col-span-1'>
            <p>Цена:</p>
            <button type="button"
            className="rounded-md bg-blue-500 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset hover:bg-blue-600">
                В корзину</button>
        </div>
    </div>
  )
}
