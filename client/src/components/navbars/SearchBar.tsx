import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks'
import { RootState } from '../../redux/store/store'
import { IGoodData } from '../../types/goodTypes/goodTypes'
import { findByName } from '../../redux/store/goodSlice'
import { useNavigate } from 'react-router-dom'





export const SearchBar = () => {
  const [searchWord, setSearchWord] = useState("")

  const navigate = useNavigate()
  

  const dispatch = useAppDispatch();

  const allGoods = useAppSelector((state: RootState) => state.good.good)

  const changeSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value)
  }

  function searchItems(data: IGoodData [], query: string) {
    const lowercaseQuery = query.toLowerCase();
    const keywords = lowercaseQuery.split(' ');
  
    return data.filter(item => {
      const lowercaseName = item.name.toLowerCase();

      const result = keywords.some(keyword =>
        lowercaseName.includes(keyword)
        );
      return result
      
    });
  }

  const SearchHandler = () => {
    
    dispatch(findByName(searchItems(allGoods, searchWord)))
    setSearchWord('')
    navigate("/search")
  }
  
  // const findGood = useAppSelector((state: RootState) => state.good.findGood);

  // console.log(findGood);
  
  // console.log(searchWord);
  


  return (
    <>
     <input onChange={changeSearchHandler} value={searchWord} name='search' className='w-11/12 py-1.5 border-2 border-gray-500 rounded-lg text-center'></input>
          <button onClick={SearchHandler} type='button' className=''><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          </button>
    </>
  )
}
