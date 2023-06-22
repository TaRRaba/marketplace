import { FileInput, Label } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../../redux/store/store';
import { useAppDispatch, useAppSelector } from '../../../redux/store/hooks';
import { getAllGood } from '../../../redux/thunks/goodThunks/gatAllGoods.thunk';

export function EditGoods() {
    const navigate = useNavigate()
    const { id } = useParams()

    const category = useAppSelector((state: RootState) => state.good.category)
    const goods = useAppSelector((state: RootState) => state.goodsSeller.goodsSeller);
    const dispatch = useAppDispatch()

    const [allCategor, setAllCategor] = useState([])
    const [categoryValue, setCategoryValue] = useState('')
    const [subCategoryValue, setSubCategoryValue] = useState('')
    const [nameCheck, setNameCheck] = useState('')

    const goodsOne = (goods?.filter((el) => el.id === Number(id)))[0]
      
    useEffect(()=> {
        setAllCategor(category)
        const categoryProduct = (category?.filter((el) => el.SubCategories.some((e) => e.id === goodsOne.subcategory_id))[0]?.id)
        setCategoryValue(categoryProduct)
        setSubCategoryValue(String(goodsOne?.subcategory_id))
     }, [goodsOne])

     const subCategory = () => {
       return allCategor.filter((el) => el.id === Number(categoryValue))
     }

    const checkNameProduct = nameCheck.split('').some((el) => el === "." || el === "%") 

    const handSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        data.append("idProduct", String(id))
   
        try {
            const response = await fetch('http://localhost:3001/api/seller/goods', {
                method: "PATCH",
                body: data,
                credentials: 'include',
            })
            const result = await response.json();

            if(result) {
              dispatch(getAllGood())
              navigate('/profileSeller/goods')
            }
          } catch (error) {
              console.log(error);
          }
    }    

  return (
    <section className="pb-10 flex bg-neutral-50 w-full">

    <div >

  <form onSubmit={handSubmit} className="relative border border-neutral-50 space-y-3 max-w-screen-lg mx-auto rounded-md bg-white p-6 shadow-xl">
  <h1 className="mb-6 text-xl font-semibold lg:text-2xl text-center">Изменить товар</h1>
  
  <p className=' text-red-700 text-xs'> Важно! Необходимо заполнить все поля!</p>
  <div className="flex m-0 gap-5">
  <div className='w-1/2'>
      <label className=""> Категория товара </label>
      <div className="relative w-full mt-2 bg-gray-100 rounded-lg">
        <select value={categoryValue}  onChange={(e)=> setCategoryValue(e.target.value)} name="categories" className="relative w-full bg-gray-100 rounded-lg">
            {allCategor && allCategor.map((el)=> (
                <option key={el?.id} value={el?.id}>{el?.fullName}</option>
            ))}
        </select>
      </div>
  </div>

  <div className='w-1/2'>
  <label className=""> Подкатегория товара </label>
      <div className="relative w-full mt-2 bg-gray-100 rounded-lg">
        <select value={subCategoryValue} onChange={(e)=> setSubCategoryValue(e.target.value)} name="subcategories" className="relative w-full bg-gray-100 rounded-lg">
            {subCategory()[0]?.SubCategories.map((el) => (
                 <option key={el?.id} value={el?.id}>{el?.fullName}</option>
            ))}
        </select>
      </div>
  </div>
  </div>
  <div>
    <label className=""> Наименование товара </label>
    <p className=' text-red-700 text-xs'> Важно! Наименование товара не должно содержать символы « . » и « % »</p>
    <input defaultValue={goodsOne?.name} onChange={(e)=> setNameCheck(e.target.value)} required name='name' type="text" className={`mt-2 h-10 w-full rounded-md bg-gray-100 px-3 ${checkNameProduct && " border-red-600" }`} />
  </div>
  <div className="grid gap-5 md:grid-cols-2">
  <div>
    <label className=""> Цена за единицу товара (шт)</label>
    <input defaultValue={goodsOne?.price} required name='price' type='number' className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3" />
  </div>
  <div>
    <label className=""> Количество товара на складе (в шт)</label>
    <input defaultValue={goodsOne?.amount} required name='amount' type='number' className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3" />
  </div>
  </div>
  <div className="grid gap-5 md:grid-cols-2">
  <div>
    <label className="">Страна производитель</label>
    <input defaultValue={goodsOne?.country} required name='country' type="text" className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3" />
  </div>
  <div>
    <label className=""> Бренд</label>
    <input defaultValue={goodsOne?.specs.brand} required name='brand' type="text" className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3" />
  </div>
  </div>
  <div className="grid gap-5 md:grid-cols-3">
  <div>
    <label className=""> Артикул товара</label>
    <input defaultValue={goodsOne?.specs.code} required name='code' type='number' className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3" />
  </div>
  <div>
    <label className=""> Габариты</label>
    <input defaultValue={goodsOne?.specs.size} required name='size' type="text" className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3" />
  </div>
  <div>
    <label className=""> Вес</label>
    <input defaultValue={goodsOne?.specs.weight} required name='weight' type="text" className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3" />
  </div>
  </div>
  <div>
    <label className=""> Дополнительная информация (тип, материал и тд.)</label>
    <input defaultValue={goodsOne?.specs.type} required name='type' type="text" className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3" />
  </div>
    <div
      className="max-w-md"
      id="fileUpload">
      <div className="mb-2 block">
        <Label
          htmlFor="file"
          value="Изменить фото товара"
        />
      </div>
      <FileInput
        name='img'
        helperText="Рекомендуемый размер изображения 700 × 700 px"
        id="file"
      />
    </div>
 
  <div className=' flex justify-around mt-10'>
    <button disabled={checkNameProduct} type='submit' className="mt-5 w-48 rounded-md bg-[#0d7490] hover:bg-[#0d7490]/90 p-2 text-center font-semibold text-white">Сохранить</button>
    <button onClick={()=> navigate('/profileSeller/goods')} type="button" className="mt-5 w-48 rounded-md bg-[#0d7490]/10 text-gray-700 hover:bg-[#0d7490]/20 p-2 text-center font-semibold ">Отменить</button>
  </div>
</form>

</div>
    </section>
  )
}
