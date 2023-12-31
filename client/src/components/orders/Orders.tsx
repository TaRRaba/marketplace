import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { IGoodData } from '../../types/cart/cartTypes';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { RootState } from '../../redux/store/store';
import { getCart } from '../../redux/thunks/cartThunks/getCart.thunk';
import { getFav } from '../../redux/thunks/favThunks/getFav.thunk';

interface IOrder {
    status: boolean;
    delivery: boolean;
}

interface IOrderData {
    id: number;
    order_id: number;
    quantity: number;
    createdAt: Date;
    Good: IGoodData
    Order: IOrder;
}

export const Orders = () => {
    const [orders, setOrders] = useState<IOrderData[][]>([]);
    const user = useAppSelector((state: RootState) => state.users.check);
    const dispatch = useAppDispatch();

    useEffect(() => {
        (async function () {
            try {
                const response = await fetch('http://localhost:3001/api/order/', {
                    credentials: 'include',
                })
                const result = await response.json();
                if (result.status === 200) {
                    setOrders(result.data);
                }
              } catch (error) {
                  console.log(error);
              }
    })();
    }, [])

    useEffect(() => {
        if (user) {
          dispatch(getCart())
          dispatch(getFav())
      }
      }, [user])

    return (
        <>
      {orders.length > 0 ? (
        <div id="Cart" className="visibility: visible bg-neutral-50 mb-44 min-h-96">
          <h1 className="mb-10 text-center text-2xl font-bold">Заказы</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {orders && orders.map((order) => {
                let total = 0;
                if (order[0].Order.delivery) total += 500;
                
                return (
                  <div key={order[0].id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 w-8/12 sm:mt-0">
                        <div className='flex justify-between'>
                        <h2 className="mb-2 text-lg mb-0 font-bold text-gray-900">
                          Заказ №
                          {' '}
                          {order[0].order_id}
                        </h2>
                        {!order[0].Order.status ?
                        <div className='text-red-600'>Отменен</div>
                        : null }
                        </div>
                        <p className="mb-2 text-xs text-gray-700">
                          Дата оформления:
                          {' '}
                          {new Date(order[0].createdAt).toLocaleDateString('RU-ru') + ' г.'}
                        </p>
                        <hr className="mb-2" />
                      <Link to={`/profile/orders/${order[0].order_id}`}>
                        <div className="text-sm text-[#0d7490]">Детали заказа</div>
                        </Link>
                        {order.map((good) => {
                          total += good.Good.price * good.quantity;
                          return (
                            <div key={good.id}/>
                            // <div className='flex items-center mb-5'>
                            // <img src={`http://localhost:3001${good.Good.img_url}`} alt="" className="w-32 rounded-lg" />
                            // <div className='flex-col ml-10 item-center'>
                            //     <Link to={`/goods/${good.Good.id}`}>
                            //   <p className="cursor-pointer hover:text-gray-900 line-clamp-3 mt-1 text-md text-gray-700">
                            //     {good.Good.name}
                            //     {' '}
                            //   </p>
                            //   </Link>
                            //   <p className="mb-3 mt-3 text-xs text-gray-500">
                            //     Цена:
                            //     {' '}
                            //     {good.Good.price}
                            //     {' '}
                            //     ₽ ,
                            //     {' '}
                            //     Количество:
                            //     {' '}
                            //     {good.quantity}

                            //   </p>
                            //   </div>
                            // </div>
                          );
                        })}
                      </div>
                      <div className="flex flex-col self-start mt-0">
                        <div className="flex mr-1 self-end items-center space-x-4">
                          <p className="totalPrice text-lg font-bold text-teal-800">
                            {total}
                            {' '}
                            ₽
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      ) : (
        <section className="py-10 flex bg-neutral-50">
          <div className="text-2xl my-40 justify-center text-gray-700 m-auto">У вас еще не было заказов!</div>
        </section>
      )}
        </>
      );
}