import { FileInput, Label } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function NewGoodsSeller() {
     
     const navigate = useNavigate()
     const [allCategor, setAllCategor] = useState([])
     const [categoryValue, setCategoryValue] = useState('')

     useEffect(()=> {
        (async function() {
            try {
                const response = await fetch('http://localhost:3001/api/seller/categories', {
                    credentials: 'include',
                })
                const result = await response.json();
                
                setAllCategor(result)
                setCategoryValue('1')
              } catch (error) {
                  console.log(error);
              }
        })()
      }, [])

      const subCategory = () => {
        return allCategor.filter((el) => el.id === Number(categoryValue))
      }

      const handSummit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
 
        try {
            const response = await fetch('http://localhost:3001/api/seller/newgoods', {
                method: "POST",
                body: data,
                credentials: 'include',
            })
            const result = await response.json();
            // console.log("result====>", result);
            navigate('/profileSeller/goods')
            
          } catch (error) {
              console.log(error);
          }
      }

  return (
    <section className="pb-10 flex bg-gray-100">

    <div className="lg:m-10">

  <form onSubmit={handSummit} className="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl lg:p-10">
  <h1 className="mb-6 text-xl font-semibold lg:text-2xl">Новый товар</h1>

  <div className="grid gap-3 md:grid-cols-2">
  <div >
      <label className=""> Категория товара </label>
      <div className="relative w-64 mt-2 bg-gray-100 rounded-lg">
        <select value={categoryValue}  onChange={(e)=> setCategoryValue(e.target.value)} name="categories" className="relative w-64 bg-gray-100 rounded-lg">
            {allCategor && allCategor.map((el)=> (
                <option key={el?.id} value={el?.id}>{el?.fullName}</option>
            ))}
        </select>
      </div>
  </div>

  <div >
  <label className=""> Подкатегория товара </label>
      <div className="relative w-64 mt-2 bg-gray-100 rounded-lg">
        <select name="subcategories" className="relative w-64 bg-gray-100 rounded-lg">
            {subCategory()[0]?.SubCategories.map((el) => (
                 <option key={el?.id} value={el?.id}>{el?.fullName}</option>
            ))}
        </select>
      </div>
  </div>

  </div>
  <div>
    <label className=""> Наименование товара </label>
    <input required name='name' type="text" className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3" />
  </div>
  <div>
    <label className=""> Страна производитель</label>
    <input required name='country' type="text" className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3" />
  </div>
  <div>
    <label className=""> Торговая марка</label>
    <input required name='brand' type="text" className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3" />
  </div>
  <div>
    <label className=""> Артикул товара</label>
    <input required name='code' type='number' className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3" />
  </div>
  <div>
    <label className=""> Габариты</label>
    <input required name='size' type="text" className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3" />
  </div>
  <div>
    <label className=""> Вес</label>
    <input required name='weight' type="text" className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3" />
  </div>
  <div>
    <label className=""> Дополнительная информация (тип, материал и тд.)</label>
    <input required name='type' type="text" className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3" />
  </div>
  <div>
    <label className=""> Количество товара на складе (в шт)</label>
    <input required name='amount' type='number' className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3" />
  </div>
  <div>
    <label className=""> Цена за единицу товара (шт)</label>
    <input required name='price' type='number' className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3" />
  </div>

    <div
      className="max-w-md"
      id="fileUpload">
      <div className="mb-2 block">
        <Label
          htmlFor="file"
          value="Добавить фото товара"
        />
      </div>
      <FileInput
        required
        name='img'
        helperText="Рекомендуемый размер изображения 700 × 700 px"
        id="file"
      />
    </div>
 
  <div className=' flex justify-around mt-10'>
    <button type='submit' className="mt-5 w-48 rounded-md bg-green-500 p-2 text-center font-semibold text-white">Сохранить</button>
    <button onClick={()=> navigate('/profileSeller/goods')} type="button" className="mt-5 w-48 rounded-md bg-blue-500 p-2 text-center font-semibold text-white">Отменить</button>
  </div>
</form>

</div>
    </section>
  )
}
