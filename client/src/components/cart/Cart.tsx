import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { RootState } from '../../redux/store/store';
import { getCart } from '../../redux/thunks/cartThunks/getCart.thunk';
import { incrAmount } from '../../redux/thunks/cartThunks/incrAmount.thunk';
import { decrAmount } from '../../redux/thunks/cartThunks/decrAmount.thunk';
import { delPos } from '../../redux/thunks/cartThunks/delPos.thunk';
import { ToggleSwitch } from 'flowbite-react';

import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from '../stripe/CheckoutForm';
import { setDeliveryAddress, setPickpointAddress } from '../../redux/store/cartSlice';
import { getMaps } from '../../redux/thunks/mapsThunks/getMapsThunks';

export const Cart = () => {
    const userData = useAppSelector((state: RootState) => state.users.users)
    const cartAll = useAppSelector((state: RootState) => state.cart.cart);
    const address = useAppSelector((state: RootState) => state.maps.maps);
    const pickpointAddress = useAppSelector((state: RootState) => state.cart.pickpointAddress);
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState();
    const [billData, setBillData] = useState(false);
    const [deliveryState, setDeliveryState] = useState(false);
    const dispatch = useAppDispatch();
    
    const cart = cartAll?.filter((el) => el.Good.archive === false) 

    useEffect(() => {
      dispatch(getMaps())
    },[])

    function getTotal () {
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
          total += cart[i].quantity * cart[i].Good.price;
        }
        if (deliveryState) {
          return total + 500
        }
        return total;
    }

     useEffect(() => {
        fetch("http://localhost:3001/config").then(async (r)=> {
            const { publishableKey } = await r.json();

            setStripePromise(loadStripe(publishableKey))
        })
        dispatch(getCart())
    }, [])

    const handleBill = () => {
      setBillData(!billData)
      if (userData.id){
            fetch("http://localhost:3001/create-payment-internet", {
              method: "POST",
              headers: {'Content-Type' : 'application/json'},
              credentials: 'include',
              body: JSON.stringify({userData, deliveryState})
          }).then(async (r)=> {
              const { clientSecret } = await r.json();
              
              setClientSecret(clientSecret)
          })
          }
    }

    const changeDeliveryState = () => {
      setDeliveryState(!deliveryState)
      dispatch(setDeliveryAddress(''))
    }

    const changeInputAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setDeliveryAddress(e.target.value))
    }

    return (
        <>
      <nav className="flex bg-gray-100 text-gray-700 py-3 px-5" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a href="/" className="text-gray-500 hover:text-black text-sm inline-flex font-medium items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
              <span className="text-gray-500 hover:text-black text-sm font-medium">Главная</span>
            </a>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
              <span className="text-gray-400 ml-1 md:ml-2 text-sm font-medium">Корзина</span>
            </div>
          </li>
        </ol>
      </nav>
      {cart.length > 0 ? (
        <div id="Cart" className="visibility: visible bg-gray-100 mb-44 min-h-96 pt-10">
          <h1 className="mb-10 text-center text-2xl font-bold">Корзина</h1>
          <div className="mx-auto max-w-7xl justify-center px-6 md:flex md:space-x-6 xl:px-0">

            {
              billData ? <></> : 
              <div id="amount" className="rounded-lg md:w-2/3">
              {cart && cart.map(({ id, quantity, Good }) => (
                <div key={Good.id} id={String(id)} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                  <img src={`http://localhost:3001${Good.img_url}`} alt="" className="rounded-lg w-40" />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 w-80 sm:mt-0">
                <a href={`/goods/${Good.name}`}><h2 className="line-clamp-3 text-left text-lg font-bold text-gray-900 hover:text-gray-500">{Good.name}</h2></a>
                {Good.amount === 0 ? 
                <p className="text-left mt-3 text-md text-red-600">Нет в наличии</p>
                : Good.amount > 10 ?
                <p className="text-left mt-3 text-md text-green-700">В наличии</p>
                :
                <p className="text-left mt-3 text-md text-yellow-500">Осталось мало</p>
                }
                <div className="flex mt-5 w-80 sm:mt-0">
                <p className="text-left mt-5 text-xs text-gray-500">Страна: {Good.country}</p>
                <p className="ml-5 text-left mt-5 text-xs text-gray-500">Производитель: {Good.specs.brand}</p>
              </div>
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
            }

            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3"> 
            {billData ? <></> :
              <div className="flex max-w-md flex-col gap-4" id="toggle">
                <ToggleSwitch
                  checked = {deliveryState}
                  label="Доставка"
                  onChange={changeDeliveryState}/>
                {deliveryState ? 
                <>
                <p>Стоимость доставки 500 рублей</p>
                <input onChange={changeInputAddress} name='text' placeholder='Укажите адрес доставки' className='w-full py-1.5 px-1 border-2 border-gray-500 rounded-lg text-start'></input>
                </> 
                :       <div className="relative w-full mt-2 rounded-lg">
                  <p>Выберите пункт выдачи</p>
                <select name="pickpoint" className="relative w-full mt-4 bg-gray-100 rounded-lg"
                value={pickpointAddress}  onChange={(e) => dispatch(setPickpointAddress(e.target.value))} 
                >
                    {address && address.map((el)=> (
                        <option key={el?.id} value={el?.id}>{el?.address}</option>
                    ))}
                </select>
              </div>
                }
              </div>}
              <div className="flex justify-between mt-3">
                <p className="text-lg font-bold">Итого:</p>
                <div className="">
                  <p id="total" className="mb-1 text-lg font-bold">
                    {getTotal()}
                    {' '}
                    ₽
                  </p>
                  <p className="text-sm text-gray-700">в т.ч. НДС 20%</p>
                </div>
              </div>
              {billData ? <></> :
              <button id="orderBtn" data-userid='{user.id}' onClick={handleBill} type="button" className="mt-6 w-full rounded-md py-1.5 font-medium text-blue-50 bg-[#4520aa] hover:bg-[#4520aa]/80">Перейти к оплате</button>}
                {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm deliveryState={deliveryState}/>
                </Elements>
                )}
            </div>
          </div>
        </div>
      ) : (
        <section className="py-10 flex bg-gray-100">
          <div className="text-2xl my-40 justify-center text-gray-700 m-auto">Ваша корзина пуста!</div>
        </section>
      )}
        </>
      );
}