import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { RootState } from '../../redux/store/store';
import { getCart } from '../../redux/thunks/cartThunks/getCart.thunk';
import { incrAmount } from '../../redux/thunks/cartThunks/incrAmount.thunk';
import { decrAmount } from '../../redux/thunks/cartThunks/decrAmount.thunk';
import { delPos } from '../../redux/thunks/cartThunks/delPos.thunk';

export const Favourites = () => {
    const cart = useAppSelector((state: RootState) => state.cart.cart);
    const dispatch = useAppDispatch();

    function getTotal () {
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
          total += cart[i].quantity * cart[i].Good.price;
        }
        return total;
    }

    useEffect(() => {
        dispatch(getCart())
    }, [])

    return (
        <>
      {cart.length > 0 ? (
        <div id="Cart" className="visibility: visible bg-gray-100 mb-44 min-h-96 pt-10">
          <h1 className="mb-10 text-center text-2xl font-bold">Избранное</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div id="amount" className="rounded-lg md:w-2/3">
              {cart && cart.map(({ id, quantity, Good }) => (
                <div key={Good.id} id={String(id)} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                  {/* <img src={`/pics/${Good.id}.jpeg`} alt="" className="rounded-lg w-40" /> */}
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 w-80 sm:mt-0">
                      <a href={`/goods/${Good.name}`}><h2 className="text-lg font-bold text-gray-900 hover:text-gray-500">{Good.name}</h2></a>
                      <p className="mt-1 text-sm text-gray-700">
                        {Good.price}
                        {' '}
                        ₽
                      </p>
                    </div>
                    <div className="flex flex-col mt-0">
                      <svg onClick={() => (dispatch(delPos({entryId: id})))} className="delPos h-5 w-5 self-end cursor-pointer duration-150 hover:text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path className="delPos" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <div className="flex mt-16 mb-5 self-end items-center border-gray-100">
                        <svg onClick={() => (dispatch(decrAmount({entryId: id, quantity})))} className="amountDecr cursor-pointer text-gray-500 focus:outline-none focus:text-gray-600 h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path className="amountDecr" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="quantity text-gray-700 text-lg mx-2">{quantity}</span>
                        <svg onClick={() => (dispatch(incrAmount({entryId: id, goodID: Good.id, quantity})))} className="amountIncr text-gray-500 cursor-pointer focus:outline-none focus:text-gray-600 h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path className="amountIncr" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <div className="flex mr-1 self-end items-center space-x-4">
                        <p className="totalPrice text-lg font-bold text-teal-800">
                          {Good.price * quantity}
                          {' '}
                          ₽
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <section className="py-10 flex bg-gray-100">
          <div className="text-2xl my-40 justify-center text-gray-700 m-auto">Ваша корзина пуста!</div>
        </section>
      )}
      <section id="emptyCart" className="visibility: hidden py-10 flex bg-gray-100">
        <div className="text-2xl my-40 justify-center text-gray-700 m-auto">Ваша корзина пуста!</div>
      </section>
      <section id="newOrder" className="visibility: hidden py-10 flex flex-col bg-gray-100">
        <div className="text-2xl mt-40 justify-center text-gray-700 m-auto">Ваш заказ сформирован!</div>
        <p className="text-md mt-10 mb-40 justify-center text-gray-700 m-auto">Наш менеджер скоро свяжется с Вами.</p>
      </section>
        </>
      );
}