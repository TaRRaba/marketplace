import { ChangeEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { RootState } from '../../redux/store/store';
import { getCart } from '../../redux/thunks/cartThunks/getCart.thunk';
import { addAmountCart } from '../../redux/thunks/cartThunks/addAmountCart.thunk';
import { addToFav } from '../../redux/thunks/favThunks/addToFav.thunk';
import { getFav } from '../../redux/thunks/favThunks/getFav.thunk';
import { removeFromFav } from '../../redux/thunks/favThunks/removeFromFav.thunk';


export const GoodsList = () => {
    const cart = useAppSelector((state: RootState) => state.cart.cart);
    const [goods, setGoods] = useState([]);
    const favourites = useAppSelector((state: RootState) => state.favourites.favourites);
    // const [value, setValue] = useState(0)
    const [addCart, setAddCart] = useState([]);
    const [addFav, setAddFav] = useState([]);
    const dispatch = useAppDispatch();

    
    function addToCart(id: number) {
        setAddCart([...addCart, id])
        dispatch(addAmountCart({goodID: id, amount: 1}))
    }

    function checkCart(id: number) {
        if (addCart.some((el) => el === id)) {
            return true;
        }
        return false;
    }

    function checkFav(id: number) {
        return favourites.some((el) => el.good_id === id);
    }

    // function removeFromFav(id: number) {
    //     setAddFav(addFav.filter((good) => good !== id))
    //     // dispatch(addAmountCart({goodID: id, amount: 1}))
    // }

    // const eventHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    //   setValue(Number(e.target.value));
    // }

    useEffect(() => {
        (async function () {
                try {
                    const response = await fetch('http://localhost:3001/api/fav/goods', {
                        credentials: 'include',
                    })
                    const result = await response.json();
                    if (result.status === 200) {
                        setGoods(result.data);
                    }
                  } catch (error) {
                      console.log(error);
                  }
        })();
        dispatch(getFav());
    }, [])

    return (
        <>
      {goods.length > 0 ? (
        <div id="Cart" className="visibility: visible bg-gray-100 mb-44 min-h-96 pt-10">
          <h1 className="mb-10 text-center text-2xl font-bold">Товары</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div id="amount" className="rounded-lg md:w-2/3">
              {goods && goods.map(({ id, name, img_url, price }) => (
                <div key={id} id={String(id)} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                  <img src={`http://localhost:3001${img_url}`} alt="" className="rounded-lg w-40" />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 w-80 sm:mt-0">
                      <a href={`/goods/${name}`}><h2 className="line-clamp-3 text-left text-lg font-bold text-gray-900 hover:text-gray-500">{name}</h2></a>
                      <p className="text-left mt-3 text-md text-green-700">В наличии</p>
                    </div>
                    <div className="flex flex-col mt-0">
                      {checkFav(id) ?
                       <svg onClick={() => dispatch(removeFromFav(id))} className="addFav h-5 w-5 self-end cursor-pointer duration-150 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                       <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                     </svg>
                      :
                      <svg onClick={() => dispatch(addToFav(id))} className="addFav h-5 w-5 self-end cursor-pointer duration-150 hover:text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                      }
                      <div className="flex mt-16 mb-4 mr-1 self-end items-center space-x-4">
                        <p className="totalPrice text-lg font-bold text-teal-800">
                          {price}
                          {' '}
                          ₽
                        </p>
                      </div>
                      {checkCart(id) ?
                    <div className="addedCart flex text-sm items-center cursor-pointer space-x-1.5 rounded-lg bg-teal-600 px-4 py-1.5 text-white duration-100">
                    В корзине
                  </div>
                    :
                   <div onClick={() => addToCart(id)} className="addToCart flex text-sm items-center cursor-pointer space-x-1.5 rounded-lg bg-[#4520aa] px-4 py-1.5 text-white duration-100 hover:bg-[#4520aa]/80">
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
        <section className="py-10 flex bg-gray-100">
          <div className="text-2xl my-40 justify-center text-gray-700 m-auto">Нет товаров для отображения!</div>
        </section>
      )}
      {/* <>
    <input type="range" onChange={eventHandler} name="months" className='range' min='0' max='100' defaultValue="0" step='10'></input>
    <label className='label' htmlFor="months">RangeValue: {value}</label>
  </> */}
        </>
      );
}