import React from 'react'
import { useAppSelector } from '../../redux/store/hooks'
import { RootState } from '../../redux/store/store'

export const BannerPromotion = () => {
  const allGoods = useAppSelector((state: RootState) => state.good.allgood)
  const category = useAppSelector((state: RootState) => state.good.category)
  const subCategoryNum = 8

  

  return (
    <>    
    <div className="font-bold text-2xl  text-center bg-gray-100">Летние товары</div>
    </>
  )
}
