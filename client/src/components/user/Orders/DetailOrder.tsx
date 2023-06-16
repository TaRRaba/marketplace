import React from 'react'

export function DetailOrder() {
  return (
    <div>DetailOrder
        <div className=" flex flex-col mx-auto max-w-2xl justify-center px-6 md:flex md:space-x-6 xl:px-0 mt-6 rounded-lg p-6 shadow-md sm:flex sm:justify-start">
        <div>
        <h2 className=" text-center text-lg font-bold text-gray-900">{"Order №"}</h2>
        </div>    
        <div>
           <p className=" text-right text-lg ">Date</p> 
        </div>
        </div>
    <div style={{maxHeight: '1100px'}} className="overflow-y-scroll lg:col-span-3">
                <>
{/* {goods.length > 0 ? ( */}
  <div id="Cart" className="visibility: visible bg-gray-100 py-10 min-h-96">
    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div id="amount" className="rounded-lg">
        {/* {goods && goods.map(({ id, name, img_url, specs, amount, country, price }) => ( */}
          <div  className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <img src={`http://localhost:3001${"img_url"}`} alt="" className="rounded-lg w-40" />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
              <div className="mt-5 w-80 sm:mt-0">
                <h2 className="line-clamp-3 text-left text-lg font-bold text-gray-900 hover:text-gray-500">{"name"}</h2>
              </div>

            </div>
          </div>
         {/* ))} */}
      </div>
    </div>
  </div>
{/* ) : (
  <section className="py-10 flex bg-gray-100">
    <div className="text-2xl my-40 justify-center text-gray-700 m-auto">Нет товаров для отображения!</div>
  </section>
)} */}
  </>
    </div>
    </div>
  )
}
