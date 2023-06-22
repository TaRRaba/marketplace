import React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { RootState } from '../../redux/store/store';
import { removeFromFav } from '../../redux/thunks/favThunks/removeFromFav.thunk';
import { addToFav } from '../../redux/thunks/favThunks/addToFav.thunk';
import { addAmountCart } from '../../redux/thunks/cartThunks/addAmountCart.thunk';
import { Link } from 'react-router-dom';

export const SearchCard = () => {

  const dispatch = useAppDispatch()
  const favourites = useAppSelector((state: RootState) => state.favourites.favourites);
  const userIsActive = useAppSelector((state: RootState) => state.users.check)

  const findGoodAll = useAppSelector((state: RootState) => state.good.findGood);
  const cart = useAppSelector((state: RootState) => state.cart.cart);

  const findGood = findGoodAll?.filter((el) => el.archive === false)

  function checkFav(id: number) {
    return favourites.some((el) => el.good_id === id);
  }
  function checkCart(id: number) {   
    return cart.some((el) => el.good_id === id);
  }

  return (
    <div className=''>
      <div className="font-bold text-2xl  text-center bg-gray-100">Вы искали</div>
        <section className="py-10 bg-gray-100">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {findGood && findGood.map(({ id, name, price, amount, img_url }) => (
              <article key={id} id={id} className="grid grid-cols-1 article content-between rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
                {userIsActive ? 
                  <>
                    {checkFav(id) ?
                      <svg onClick={() => dispatch(removeFromFav(id))} className="addFav h-5 w-5 self-end cursor-pointer duration-150 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                      :
                      <svg onClick={() => dispatch(addToFav(id))} className="addFav h-5 w-5 self-end cursor-pointer duration-150 hover:text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    }
                  </>
                  :
                  null
                }
                      <Link to={`/goods/${name}`}>
                <div className="mb-4">
                  <div className="relative overflow-hidden rounded-xl">
                      <img className="rounded-xl object-scale-down object-center w-56 h-56 max-sm:w-96 max-sm:h-96 max-sm:my-2 max-sm:mb-6 cursor-pointer max-md:mt-2 mb-1" src={`http://localhost:3001${img_url}`} alt="preview" />
                  </div>
                    <h2 className="cursor-pointer text-slate-700 hover:text-slate-500 line-clamp-3">{name}</h2>
    
                </div>
                </Link>
                {amount === 0 ? 
                <p className="text-left mt-3 text-md text-red-600">Нет в наличии</p>
                : amount > 10 ?
                <p className="text-left mt-3 text-md text-green-700">В наличии</p>
                :
                <p className="text-left mt-3 text-md text-yellow-500">Осталось мало</p>
                }
                  <div className="mt-3 flex items-center justify-between">
                  <p className="text-lg font-bold text-teal-800">
                    {price}
                    {' '}
                    ₽
                  </p>
                  {userIsActive ?
            <>
            {amount > 0 ?
            <> 
            {checkCart(id) ?
  <div className="addedCart flex text-sm items-center cursor-pointer space-x-1.5 rounded-lg bg-teal-600 px-4 py-1.5 text-white duration-100">
  В корзине
</div>
  :
 <div onClick={() => dispatch(addAmountCart({goodID: id, amount: 1}))} className="addToCart flex text-sm items-center cursor-pointer space-x-1.5 rounded-lg bg-[#4520aa] px-4 py-1.5 text-white duration-100 hover:bg-[#4520aa]/80">
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="addToCart mr-2 h-4 w-4">
   <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
 </svg>
  В корзину
</div>
            }
            </>
            : null }
           </>
           :
            null }
                  </div>
              </article>
          ))}
        </div>
      </section>
    </div>
  )
}
