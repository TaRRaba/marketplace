import { Fragment, useRef, useState, useEffect} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks';
import { RootState } from '../../../redux/store/store';
import { getCart } from '../../../redux/thunks/cartThunks/getCart.thunk';
import { getFav } from '../../../redux/thunks/favThunks/getFav.thunk';

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
  const { id } = useParams();
  const user = useAppSelector((state: RootState) => state.users.users);
  const [orderInfo, setOrderInfo] = useState<IOrderInfo>({detailOrder: [], order: {}})
  const [orderStatus, setOrderStatus] = useState(true);
  const [orderDelivery, setOrderDelivery] = useState(false);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  function orderEmail(email, name, order) {
    Email.send({
      SecureToken: 'a3d45322-5353-477e-ae43-06b884d95821',
      To: email,
      From: 'localmarket.elbrus@gmail.com',
      Subject: `Заказ № ${order} - Отменен!`,
      Body: `Уважаемый(ая) ${name}! Вы отменили заказ на нашем сайте! Надеемся вскоре получить от Вас новый заказ.`,
    }).then();
  }

  function orderSellerEmail(email, name, order) {
    Email.send({
      SecureToken: 'a3d45322-5353-477e-ae43-06b884d95821',
      To: email,
      From: 'localmarket.elbrus@gmail.com',
      Subject: `Заказ № ${order} - Отменен!`,
      Body: `${name}, покупатель отменил заказ! Подробности и состав заказа вы можете посмотреть в личном кабинете.`,
    }).then();
  }

  function SellersEmailing(sellersArray, order) {
    sellersArray.forEach((seller) => {
      orderSellerEmail(seller.email, seller.name, order);
    })
  }

  async function OrderCancel() {
    const response = await fetch('http://localhost:3001/api/order/', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({orderID: id}),
      credentials: 'include',
      })
      const result = await response.json();
      if (result.status === 200) {
        setOrderStatus(false);
        SellersEmailing(result.sellers, id);
        orderEmail(user.email, user.name, id);
        setOpen(false);
      }
  }

  useEffect(()=> {
    (async function () {
     const response = await fetch(`http://localhost:3001/api/order/${id}`, {
        credentials: 'include'
      })
      const result = await response.json()
      setOrderInfo(result)      
      setOrderStatus(result.order.status)
      setOrderDelivery(result.order.delivery);
    })()
  }, [])

  useEffect(() => {
    if (user.id) {
      dispatch(getCart())
      dispatch(getFav())
  }
  }, [user])
  

  return (
    <>
                  <div className="rounded-lg md:w-2/3">
                  <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 w-8/12 sm:mt-0">
                        <div className='flex justify-between'>
                        <h2 className="mb-2 text-lg mb-0 font-bold text-gray-900">
                          Заказ №
                          {' '}
                          {orderInfo?.order?.id}
                        </h2>
                        {!orderStatus ?
                        <div className='text-red-600'>Отменен</div>
                        : null }
                        </div>
                        <p className="mb-2 text-xs text-gray-700">
                          Дата оформления:
                          {' '}
                          {new Date(orderInfo?.order?.createdAt).toLocaleDateString('RU-ru') + ' г.'}
                        </p>
                        <p className="mb-2 text-xs text-gray-700">
                          Доставка до пункта выдачи:
                          {' '}
                          <span className='font-bold'>{orderInfo?.order?.delivery ? "нет": orderInfo?.order?.PickPoint?.address}</span>
                        </p>
                        {orderInfo?.order?.delivery && <p className="mb-2 text-xs text-gray-700">
                          Адрес доставки:
                          {' '}
                          <span className='font-bold'>{orderInfo?.order?.delivery_address}</span>
                        </p>}
                    
                        <hr className="mb-2" />
                        {orderInfo?.detailOrder && orderInfo?.detailOrder.map((el) => {
                          return (
                            <div key={el?.id} className='flex items-center mb-5'>
                              <img src={`http://localhost:3001${el?.Good.img_url}`} alt="" className="w-32 rounded-lg" />
                              <div className='flex-col ml-10 item-center'>
                                  <Link to={`/goods/${el?.Good.name}`}>
                                <p className="cursor-pointer hover:text-gray-900 line-clamp-3 mt-1 text-md text-gray-700">
                                  {el?.Good.name}
                                  {' '}
                                </p>
                                </Link>
                                <p className="mb-3 mt-3 text-xs text-gray-500">
                                  Цена:
                                  {' '}
                                  {el?.Good.price}
                                  {' '}
                                  ₽ ,
                                  {' '}
                                  Количество:
                                  {' '}
                                  {el?.quantity}

                                </p>
                                </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex flex-col self-start mt-0">
                        <div className="flex mr-1 self-end items-center space-x-4 whitespace-nowrap">
                          <p className="totalPrice text-lg font-bold text-teal-800">
                            {orderDelivery ?
                            <>
                          {(500 + (orderInfo?.detailOrder?.reduce((acc, el) => acc + ((el.quantity) * (el?.Good.price)), 0)))}
                          </>
                          :
                          <>
                          {orderInfo?.detailOrder?.reduce((acc, el) => acc + ((el.quantity) * (el?.Good.price)), 0)}
                          </>
                            }
                            {' '}
                            ₽
                          </p>
                        </div>
                        {orderStatus ?
                        <div className="flex flex-col self-start mt-0 whitespace-nowrap">
                      <button onClick={() => setOpen(true)} className="mt-4 flex cursor-pointer items-center justify-center rounded-md border py-2 px-4 text-center text-gray-500 transition duration-150 ease-in-out hover:translate-y-1 hover:bg-rose-500 hover:text-white">
                        <p>Отменить заказ</p>
                      </button>
                      </div>
                      : null }
                      </div>
                    </div>
                  </div>
                  </div>

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
                    onClick={() => OrderCancel()}
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

     </>
  )
}
