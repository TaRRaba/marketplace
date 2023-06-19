import { Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks';
import { getGoodsSeller } from '../../../redux/thunks/goodsSellerThunks/getGoodsSeller.thunk';
import { RootState } from '../../../redux/store/store';
import { delGoodsSeller } from '../../../redux/thunks/goodsSellerThunks/delGoodsSeller.thunk';
import { Link } from 'react-router-dom';

export default function GoodsSeller() {

  const dispatch = useAppDispatch();
  const goods = useAppSelector((state: RootState) => state.goodsSeller.goodsSeller);

  useEffect(()=> {
    dispatch(getGoodsSeller())
  }, [])

  return (
    <div>
      <div className=' flex justify-end mr-16'>
        <Link to="/profileSeller/new_goods">
             <Button label="2"><p>Добавить товар</p> </Button>
        </Link>
      </div>

        {goods?.length > 0 ? (
        <div id="Cart" className="visibility: visible bg-gray-100 mb-44 min-h-96 pt-10">
          <h1 className="mb-10 text-center text-2xl font-bold">Товары</h1>

          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">

              {goods && goods.map((el) => (
                <div key={el?.id} id={`${el?.id}`} className=" justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                 <img src={`http://localhost:3001${el?.img_url}`} alt="goods" className="rounded-lg w-40" />
                    <div className="mt-5 ml-3 w-80 sm:mt-0 flex flex-col justify-between">
                        <h2 className=" line-clamp-2 text-left text-l font-bold text-gray-900 hover:text-gray-500">{el.name}</h2>
                        <h2 className=" mt-3 text-left text-l text-gray-900">Количество: {el.amount} шт</h2>
                        <h2 className=" text-left text-l text-red-800">Цена: {el.price}  ₽/шт</h2>
                    <div className="mt-6 ml-5 flex flex-col sm:flex-row">
                    <Link to={`/profileSeller/edit_goods/${el?.id}`}>
                    <button className="mr-2 mb-4 flex cursor-pointer items-center justify-center rounded-md bg-emerald-400 py-2 px-8 text-center text-white transition duration-150 ease-in-out hover:translate-y-1 hover:bg-emerald-500">
                      <p>Изменить</p> 
                     </button>
                     </Link>
                    <button onClick={() => (dispatch(delGoodsSeller({goodsId: el?.id})))}  className="mr-2 mb-4 flex cursor-pointer items-center justify-center rounded-md border py-2 px-8 text-center text-gray-500 transition duration-150 ease-in-out hover:translate-y-1 hover:bg-rose-500 hover:text-white">
                      <p>Удалить</p>
                      </button>
                    </div>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>
       ) : ( 
        <section className="py-10 flex bg-gray-100">
          <div className="text-2xl my-40 justify-center text-gray-700 m-auto">Пусто, еще не добавлен ни один товар!</div>
        </section>
      )} 

    </div>
  )
}
