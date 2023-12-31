import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { IGoodData } from '../../types/cart/cartTypes';

interface IOrderData {
    id: number;
    order_id: number;
    quantity: number;
    createdAt: Date;
    Good: IGoodData;
    Order: IOrder;
}

interface IOrder {
  status: boolean;
  delivery: boolean;
}

export const SellerOrders = () => {
    const [orders, setOrders] = useState<IOrderData[][]>([]);
    
    useEffect(() => {
        (async function () {
            try {
                const response = await fetch('http://localhost:3001/api/order/seller', {
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

console.log("orders", orders);

    return (
        <>
      {orders.length > 0 ? (
        <div id="Cart" className="visibility: visible bg-neutral-50 mb-44 min-h-96">
          <h1 className="mb-10 text-center text-2xl font-bold">Заказы</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {orders && orders.map((order) => {
                let total = 0;
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
                        <hr className="mb-5" />
                        {order.map((good) => {
                          total += good.Good?.price * good.quantity;
                          return (
                            <div className='flex items-center mb-5'>
                            <img src={`http://localhost:3001${good?.Good?.img_url}`} alt="" className="w-32 rounded-lg" />
                            <div className='flex-col ml-10 item-center'>
                              <p className="line-clamp-3 mt-1 text-md text-gray-700">
                                {good.Good?.name}
                                {' '}
                              </p>
                              <p className="mb-3 mt-3 text-xs text-gray-500">
                                Цена:
                                {' '}
                                {good.Good?.price}
                                {' '}
                                ₽ ,
                                {' '}
                                Количество:
                                {' '}
                                {good.quantity}

                              </p>
                              </div>
                            </div>
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