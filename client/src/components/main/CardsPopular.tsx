import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { RootState } from '../../redux/store/store';
import { getCart } from '../../redux/thunks/cartThunks/getCart.thunk';
import { getPopularGood } from '../../redux/thunks/goodThunks/getPopularGood.thunk';

export const CardsPopular = () => {
  const card = useAppSelector((state: RootState) => state.good.good)
  const dispatch = useAppDispatch();

  
  useEffect(() => {
      dispatch(getPopularGood())
  }, [])

  return (
  
    <div className=''>

     <div className="font-bold text-2xl  text-center bg-gray-100">Лидеры продаж</div>
    <section className="py-10 bg-gray-100">
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {card && card.map(({ id, name, price, img_url }) => (
        <article key={id} id={id} className="grid grid-cols-1 article content-between rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
          <div className="mb-4">
            <div className="relative overflow-hidden rounded-xl">
              <a href={`/goods/${name}`}>
                <img className="p-2 mb-1" src={`http://localhost:3001${img_url}`} alt="preview" />
              </a>
            </div>
            <h2 className="text-slate-700 line-clamp-3">{name}</h2>
          </div>
          <p className="mt-1 text-sm text-green-700">В наличии</p>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-lg font-bold text-teal-800">
              {price}
              {' '}
              ₽
            </p>
            {/* {user ? (
              <>
              <div className="addToCart visibility: visible flex text-sm items-center cursor-pointer space-x-1.5 rounded-lg bg-[#4520aa] px-4 py-1.5 text-white duration-100 hover:bg-[#4520aa]/80">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="addToCart mr-2 h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              В корзину
              </div>
              <div className="addedCart visibility: hidden flex text-sm items-center cursor-pointer space-x-1.5 rounded-lg bg-teal-600 px-4 py-1.5 text-white duration-100">
              В корзине
              </div>
              </>
            ) : (null)} */}
          </div>
        </article>
      ))}
    </div>
  </section>
      </div>
    
  )
}

