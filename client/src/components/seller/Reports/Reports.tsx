import React, { useEffect, useState } from 'react'
import { imgFunction, nameFunction, profitFunction, summerQuantityFunction } from './function'
import { resultType } from '../../../types/reports/types'

export default function Reports() {
    const [reports, setReports] = useState([])
    const [uniqueState, setUniqueState] = useState([])

  useEffect(()=> {
    (async function () {
     const response = await fetch('http://localhost:3001/api/seller/reports', {
        credentials: 'include'
      })
      const result = await response.json()
      setReports(result)

    const uniqueArr = [... new Set(result.map((el: resultType) => el.good_id))]
    setUniqueState(uniqueArr)
})()
}, [])

  return (
    <div>
    {reports?.length > 0 ? (
    <div id="Cart" className="visibility: visible bg-neutral-50 mb-44 min-h-96">
      <h1 className="mb-10 text-center text-2xl font-bold">Проданные товары</h1>
      <div className="mx-auto px-6">
        <div className="grid grid-cols-2 justify-items-center rounded-lg">

        {uniqueState && uniqueState.map((el) => (
            <div key={el} className="justify-between w-4/5 mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
             <img src={`http://localhost:3001${imgFunction(reports, el)[0]}`} alt="goods" className="rounded-lg w-40"></img>
             <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 w-60 sm:mt-0">
                    <h2 className="mb-5 line-clamp-2 text-left text-lg font-bold text-gray-900">{nameFunction(reports, el)[0]}</h2>
                    <p className="mb-3 text-gray-600">Продано: {summerQuantityFunction(reports, el)} шт.</p>
                    <p className="text-gray-600">На сумму: {profitFunction(reports, el, summerQuantityFunction(reports, el))[0]} ₽</p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
    ) : ( 
    <section className="py-10 flex bg-neutral-50">
      <div className="text-2xl my-40 justify-center text-gray-700 m-auto">Пусто, еще не продан ни один товар!</div>
    </section>
  )}
</div>
  )
}
