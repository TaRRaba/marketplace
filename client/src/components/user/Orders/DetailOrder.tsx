import { Fragment, useRef, useState, useEffect} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useParams } from 'react-router-dom'

interface IOrder {
  PickPoint: {},
  delivery: boolean,
  delivery_address: string | null,
  id: number,
  pickpoint_id: number,
  user_id: number,
  createdAt: Date,
  updatedAt: Date,
}

interface IOrderInfo {
  detailOrder: [],
  order: IOrder,
}

export function DetailOrder() {
  const { id } = useParams() 
  const [orderInfo, setOrderInfo] = useState<IOrderInfo>({detailOrder: [], order: {}})

  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)

  useEffect(()=> {
    (async function () {
     const response = await fetch(`http://localhost:3001/api/order/${id}`, {
        credentials: 'include'
      })
      const result = await response.json()
      setOrderInfo(result)
    })()
  }, [])
  
  // console.log("orderInfo-------", orderInfo);
  

  return (
    <div>
 
        <main className=" mt-8 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
       
        <div className=" bg-white flex flex-col mx-auto max-w-2xl justify-center px-4 md:flex md:space-x-6 xl:px-0 mt-6 rounded-lg pb-6 pt-3 shadow-md sm:flex sm:justify-start">
        <div className=' flex justify-between'>
          <h2 className=" ml-40 mb-2 text-center  text-2xl font-bold text-gray-900">Заказ № {orderInfo?.order?.id}</h2>
          <button onClick={() => setOpen(true)} className="mr-2 mb-4 flex cursor-pointer items-center justify-center rounded-md border py-2 px-8 text-center text-gray-500 transition duration-150 ease-in-out hover:translate-y-1 hover:bg-rose-500 hover:text-white">
            <p>Отменить заказ</p>
          </button>
        </div>    
        <div>
           <p className=" text-left text-lg ">Дата оформления: <span className='font-bold'>{new Date(orderInfo?.order?.createdAt).toLocaleDateString('RU-ru')}</span> </p> 
        </div>
        <div>
           <p className=" text-left text-lg ">Доставка до пункта выдачи: <span className='font-bold'>{orderInfo?.order?.delivery ? "нет": orderInfo?.order?.PickPoint?.address}</span> </p> 
        </div>
       
        { (orderInfo?.order?.delivery )? (
          <div>
            <p className=" text-left text-lg ">Адрес доставки: <span className='font-bold'>{orderInfo?.order?.delivery_address}</span></p> 
         </div>
        ) : (
          <></>
        )}
        <div>
           <p className=" text-left text-lg ">Общая сумма заказа: <span className='font-bold text-red-700'>{orderInfo?.detailOrder?.reduce((acc, el) => acc + ((el.quantity) * (el?.Good.price)), 0)} ₽</span> </p> 
        </div>
    </div>

    <div style={{maxHeight: '600px'}} className=" mt-4 mb-6 overflow-y-scroll lg:col-span-3 ">
  <>
  <div id="Cart" className="visibility: visible bg-gray-100 py-6 min-h-96">
    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div id="amount" className="rounded-lg">
        {orderInfo?.detailOrder && orderInfo?.detailOrder.map((el) => (
          <div key={el?.id} className="justify-between mb-4 rounded-lg bg-white p-3 shadow-md sm:flex sm:justify-start">
            <img src={`http://localhost:3001${el?.Good.img_url}`} alt="" className="rounded-lg w-32" />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
              <div className="mt-5 w-80 sm:mt-0">
                <h2 className="line-clamp-3 text-left text-sm font-bold text-gray-900 hover:text-gray-500">{el?.Good.name}</h2>
                <h2 className=" mt-4 text-left text-sm text-gray-600">Количество: {el?.quantity}</h2>
                <h2 className=" text-left text-sm text-gray-600">Стоимость: {(el?.quantity)* (el?.Good.price)} ₽ <span className="text-red-800">({(el?.Good.price)} ₽/шт)</span></h2>
              </div>

            </div>
          </div>
         ))}
      </div>
    </div>
  </div>
  </>
    </div>
    </main>

    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Предупреждение
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Вы уверены, что хотите отменить заказ?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    Отменить
                  </button>
                  <button
                    type="button"
                    className=" mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Назад
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>

     </div>
  )
}
