import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { RootState } from '../../redux/store/store';
import { getCart } from '../../redux/thunks/cartThunks/getCart.thunk';
import { removeFromFav } from '../../redux/thunks/favThunks/removeFromFav.thunk';
import { addAmountCart } from '../../redux/thunks/cartThunks/addAmountCart.thunk';
import { getFav } from '../../redux/thunks/favThunks/getFav.thunk';
import { Link } from 'react-router-dom';
 
export const Favourites = () => {
    const cart = useAppSelector((state: RootState) => state.cart.cart);
    const user = useAppSelector((state: RootState) => state.users.check);
    const favouritesAll = useAppSelector((state: RootState) => state.favourites.favourites);
    const dispatch = useAppDispatch();

    const favourites = favouritesAll?.filter((el) => el.Good.archive === false)    

    function checkCart(id: number) {   
      return cart.some((el) => el.good_id === id);
  }
    useEffect(() => {
      if (user) {
        dispatch(getCart())
        dispatch(getFav())
    }
    }, [user])

    return (
        <>
      {favourites.length > 0 ? (
        <div id="Cart" className="visibility: visible bg-neutral-50 mb-44 min-h-96">
          <h1 className="mb-10 text-center text-2xl font-bold">Избранное</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div id="amount" className="rounded-lg md:w-2/3">
              {favourites && favourites.map(({ id, Good }) => (
                <div key={id} id={String(id)} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                  <img src={`http://localhost:3001${Good.img_url}`} alt="" className="rounded-lg w-40" />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 w-80 sm:mt-0">
                    <Link to={`/goods/${Good.name}`}>
                <h2 className="line-clamp-3 text-left text-lg font-bold text-gray-900 hover:text-gray-500">{Good.name}</h2>
                </Link>
                {Good.amount === 0 ? 
                <p className="text-left mt-3 text-md text-red-600">Нет в наличии</p>
                : Good.amount > 10 ?
                <p className="text-left mt-3 text-md text-green-700">В наличии</p>
                :
                <p className="text-left mt-3 text-md text-yellow-500">Осталось мало</p>
                }
                <div className="flex mt-5 w-80 sm:mt-0">
                <p className="text-left mt-5 text-xs text-gray-500">Страна: {Good.country}</p>
                <p className="ml-5 text-left mt-5 text-xs text-gray-500">Бренд: {Good.specs.brand}</p>
              </div>
              </div>
                    <div className="flex flex-col w-28 mt-0">
                      <svg onClick={() => dispatch(removeFromFav(Good.id))} className="delPos h-5 w-5 self-end cursor-pointer duration-150 hover:text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path className="delPos" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <div className="flex mt-16 mb-3 mr-1 self-end items-center space-x-4">
                        <p className="totalPrice text-lg font-bold text-teal-800">
                          {Good.price}
                          {' '}
                          ₽
                        </p>
                      </div>
                      {checkCart(Good.id) ?
              <div className="addedCart flex text-sm items-center cursor-pointer justify-center space-x-1.5 rounded-lg bg-green-700 px-4 py-1.5 text-white duration-100">
              В корзине
            </div>
              :
             <div onClick={() => dispatch(addAmountCart({goodID: Good.id, amount: 1}))} className="addToCart flex text-sm items-center cursor-pointer space-x-1.5 rounded-lg bg-[#0d7490] px-2 py-1.5 text-white duration-100 hover:bg-[#0d7490]/80">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="addToCart mr-2 h-4 w-4">
               <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
             </svg>
              В корзину
           </div>
              }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <section className="py-10 flex bg-neutral-50">
          <div className="text-2xl my-40 justify-center text-gray-700 m-auto">У вас нет избранных товаров!</div>
        </section>
      )}
        </>
      );
}