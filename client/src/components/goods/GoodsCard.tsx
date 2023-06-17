import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../redux/store/hooks';
import { RootState } from '../../redux/store/store';
import { addToFav } from '../../redux/thunks/favThunks/addToFav.thunk';
import { removeFromFav } from '../../redux/thunks/favThunks/removeFromFav.thunk';
import { useDispatch } from 'react-redux';
import { getFav } from '../../redux/thunks/favThunks/getFav.thunk';
import { getCart } from '../../redux/thunks/cartThunks/getCart.thunk';
import { addAmountCart } from '../../redux/thunks/cartThunks/addAmountCart.thunk';

interface ICard {
  id: number;
  name: string;
  price: number;
  amount: number;
  country: string;
  specs: ISpecs;
}

interface ISpecs {
  brand: string;
  code: string;
  size: string;
  weight: string;
  type: string;
}

export default function GoodsCard() {

 const { id } = useParams()
 const cart = useAppSelector((state: RootState) => state.cart.cart);
 const favourites = useAppSelector((state: RootState) => state.favourites.favourites);
 const user = useAppSelector((state: RootState) => state.users.check);
  const [card, setCard] = useState<ICard>({});
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1)
  const dispatch = useDispatch();
  

  useEffect(()=> {
    (async function () {
     const response = await fetch(`http://localhost:3001/api/card/subcategory/goods/${26}`, {
        credentials: 'include'
      })
      const result = await response.json()
      setCard(result)
      setLoading(true);
    })()
    dispatch(getFav());
    dispatch(getCart());
  }, [])

  console.log('CARD', card);

  function checkCart(id: number) {   
    return cart.some((el) => el.good_id === id);
}

function checkFav(id: number) {
    return favourites.some((el) => el.good_id === id);
}

  const decrCount = (maxCount: number) => {
    setCount((pre) => pre >= maxCount ? maxCount : pre + 1)
  }
  const incrCount = () => {
    setCount((pre) => pre <= 1 ? 1 : pre - 1)
  }
  
  return (
    <>
    {loading ?
    <section className="py-6 sm:py-6"> 
  <div className="container mx-auto px-4">

    <div className="lg:col-gap-12 xl:col-gap-16 mb-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
      <div className="lg:col-span-3 lg:row-end-1">
        <div className="lg:flex lg:items-start">
          <div className="lg:order-2 lg:ml-5">
            <div className="max-w-xl overflow-hidden rounded-lg">
              <img className="h-full w-full max-w-full object-cover" src={`http://localhost:3001${card.img_url}`} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">

      <div className="flex items-center justify-end mb-10">
      { user ?
                 <>
        {checkFav(card.id) ?
                 <svg onClick={() => dispatch(removeFromFav(card.id))} className="addFav h-8 w-8 self-end cursor-pointer duration-150 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                 <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
               </svg>
                :
                <svg onClick={() => dispatch(addToFav(card.id))} className="addFav h-8 w-8 self-end cursor-pointer duration-150 hover:text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                }
                  </>
                : null }
      </div>

        <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">{card.name}</h1>
        <h2 className="mt-8 text-base text-gray-900">{card.price} ₸ / 1 шт</h2>
          <div className="mt-3 flex select-none flex-wrap items-center justify-center gap-1">
              <svg onClick={incrCount} className="amountDecr cursor-pointer text-gray-500 focus:outline-none focus:text-gray-600 h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path className="amountDecr" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="quantity text-gray-700 text-lg mx-2">{count}</span>
              <svg onClick={() => decrCount(card.amount)} className="amountIncr text-gray-500 cursor-pointer focus:outline-none focus:text-gray-600 h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path className="amountIncr" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>


        <div className="mt-8 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
          <div className="flex items-end">
            <h1 className="text-3xl font-bold">{card.price * count} ₸</h1>
          </div>
                 { user ?
                 <>
                  {checkCart(card.id) ?
                  <div className="text-sm items-center cursor-pointer space-x-1.5 rounded bg-teal-600 px-8 py-2 text-white duration-100">
                    В корзине
                  </div>
                  :
                  <div onClick={() => dispatch(addAmountCart({goodID: card.id, amount: 1}))} className="flex text-sm items-center cursor-pointer space-x-1.5 rounded bg-[#4520aa] px-8 py-2 text-white duration-100 hover:bg-[#4520aa]/80">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mr-2 h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                  В корзину
                </div> }
                </>
                : null }
        </div>

        <div className="flex flex-col items-end justify-end mb-3 text-slate-500">
        <p className="mt-8 text-base">Kоличество на складе:</p>
        <p className="mt-0 text-base">{card.amount} шт</p>
        </div>

      </div>

      <div className="lg:col-span-3">
        <div className="border-b border-gray-300">
          <nav className="flex gap-4">
            <a className="border-b-2 font-bold border-gray-900 py-4 text-m text-gray-900 hover:border-gray-400 hover:text-gray-800"> Характеристики </a>
          </nav>
        </div>

        <div className=" mt-8 sm:mt-12">
          <div className=' grid grid-cols-2'>
            <div className='col-start-1 flex flex-col items-start'>
                <p>Страна производитель:</p>
                <p>Торговая марка:</p>
                <p>Артикул:</p>
                <p>Габариты:</p>
                <p>Вес:</p>
                <p>Особенности:</p>
            </div>
            <div className='col-start-2 font-bold flex flex-col items-start'>
                <p>{card.country}</p>
                <p>{card.specs.brand}</p>
                <p>{card.specs.code}</p>
                <p>{card.specs.size}</p>
                <p>{card.specs.weight}</p>
                <p>{card.specs.type}</p>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  </div>
</section>
 : null }
</>
  )
}
