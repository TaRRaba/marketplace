import React, { useEffect, useState } from 'react'

export default function GoodsSeller() {
    const [goods, setGoods] = useState([])

  useEffect(()=> {
    (async function () {
     const response = await fetch('http://localhost:3001/api/seller/goods', {
        credentials: 'include'
      })
      const result = await response.json()
      setGoods(result)
    })()
  }, [])

console.log('====================================');
console.log(goods);

  return (
    <div>
        {/* {goods?.length > 0 ? ( */}
        <div id="Cart" className="visibility: visible bg-gray-100 mb-44 min-h-96 pt-10">
          <h1 className="mb-10 text-center text-2xl font-bold">Товары</h1>

          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">

              {goods && goods.map((el) => (
                <div key={el?.id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                 
                  <img src={`http://localhost:3001${el?.img_url}`} alt="goods" className="rounded-lg w-40" />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 w-80 sm:mt-0">
                        <h2 className="text-left text-lg font-bold text-gray-900 hover:text-gray-500">{el.name}</h2>
                    </div>
                  </div>

                </div>
              ))}
            </div>


          </div>
        </div>
       {/* ) : ( 
        <section className="py-10 flex bg-gray-100">
          <div className="text-2xl my-40 justify-center text-gray-700 m-auto">Пусто, еще не добавлен ни один товар!</div>
        </section>
      )} */}


    </div>
  )
}
