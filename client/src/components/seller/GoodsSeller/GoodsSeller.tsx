import { Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks';
import { getGoodsSeller } from '../../../redux/thunks/goodsSellerThunks/getGoodsSeller.thunk';
import { RootState } from '../../../redux/store/store';
import { delGoodsSeller } from '../../../redux/thunks/goodsSellerThunks/delGoodsSeller.thunk';
import { Link } from 'react-router-dom';
import { getAllGood } from '../../../redux/thunks/goodThunks/gatAllGoods.thunk';

export default function GoodsSeller() {

  const dispatch = useAppDispatch();
  const goodsAll = useAppSelector((state: RootState) => state.goodsSeller.goodsSeller);

  const goods = goodsAll?.filter((el) => el.archive === false)

  useEffect(()=> {
    dispatch(getGoodsSeller())
  }, [])

  const deleteGoods = ({goodsId}: {goodsId:number}) => {
    dispatch(delGoodsSeller({goodsId}))
    dispatch(getAllGood())
  }
 
  return (
    <div className=' mr-28'>
      <h1 className="mb-6 text-center text-2xl font-bold">Товары</h1>
      <div className='flex justify-end mr-20 mb-5'>
        <Link to="/profileSeller/new_goods">
             <Button label="2"><p>Добавить товар</p> </Button>
        </Link>
      </div>

        {goods?.length > 0 ? (
        <div id="Cart" className="visibility: visible bg-neutral-50 mb-32 min-h-96 pt-6">

<div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {goods && goods.map(({ id, name, price, amount, img_url }) => (
        <article key={id} id={String(id)} className="grid grid-cols-1 article content-between rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
                <div className="mb-4 rounded-xl flex justify-center">
                      <img className="w-40 rounded-xl mb-1" src={`http://localhost:3001${img_url}`} alt="preview" />
                  </div>
                <div className='justify-between'>
                <h2 className="mb-5 text-slate-700 hover:text-slate-500 line-clamp-2">{name}</h2>
                <div className="flex-col w-80 sm:mt-0">
                <p className="text-left mb-3 text-sm text-gray-500">Количество: {amount} шт.</p>
                <p className="text-left text-sm text-gray-500">Цена: {price} ₽</p>
              </div>
              </div>
          <div className="mt-3 flex items-center justify-between">
          <Link to={`/profileSeller/edit_goods/${id}`}>
                      <button className="ml-2 mb-4 flex cursor-pointer items-center justify-center rounded-md bg-emerald-400 py-2 px-8 text-center text-white transition duration-150 ease-in-out hover:translate-y-1 hover:bg-emerald-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                     </button>
                     </Link>
                     <button onClick={() => (deleteGoods({goodsId: id}))} className="mr-2 mb-4 flex cursor-pointer items-center justify-center rounded-md border border-gray-600 py-2 px-8 text-center text-gray-600 transition duration-150 ease-in-out hover:translate-y-1 hover:bg-rose-500 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
          </div>
        </article>
      ))}
    </div>

        </div>
       ) : ( 
        <section className="py-10 flex bg-neutral-50">
          <div className="text-2xl my-40 justify-center text-gray-700 m-auto">Пусто, еще не добавлен ни один товар!</div>
        </section>
      )} 

    </div>
  )
}



{/* <div className=" flex justify-center flex-wrap gap-6 gap-x-20">
{goods && goods.map((el) => (
  <div key={el?.id} id={`${el?.id}`} className="justify-between rounded-lg shadow-lg bg-white p-6 flex ">
   <img src={`http://localhost:3001${el?.img_url}`} alt="goods" className="rounded-lg w-40" />
      <div className="mt-5 ml-5 w-54 sm:mt-0 flex flex-col justify-between">
          <div className="max-w-40 text-left font-bold text-gray-900">{el.name}</div>
          <h2 className="mt-3 text-left text-l text-gray-900">Количество: {el.amount} шт.</h2>
          <h2 className="text-left text-l text-red-800">Цена: {el.price} ₽</h2>
      
      <div className="mt-6 ml-5 flex flex-col gap-6 sm:flex-row">
      <Link to={`/profileSeller/edit_goods/${el?.id}`}>
        <button className="mr-2 mb-4 flex cursor-pointer items-center justify-center rounded-md bg-emerald-400 py-2 px-8 text-center text-white transition duration-150 ease-in-out hover:translate-y-1 hover:bg-emerald-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
          </svg>
       </button>
        </Link>
        <button onClick={() => (deleteGoods({goodsId: el?.id}))} className="mr-2 mb-4 flex cursor-pointer items-center justify-center rounded-md border border-gray-600 py-2 px-8 text-center text-gray-600 transition duration-150 ease-in-out hover:translate-y-1 hover:bg-rose-500 hover:text-white">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
        </div>
      </div>
  </div>
))}
</div> */}