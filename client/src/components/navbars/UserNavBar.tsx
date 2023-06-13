import React from 'react'
import Entries from './Entries'
import { Link } from 'react-router-dom'
import EntriesNew from './EntriesNew'
import Catalog from './Catalog'

export const UserNavBar = () => {
  return (    
   
    <nav className='grid'>
      <div className='flex justify-between'>
        <div>Location</div>
        <Link to=''>
        <div>Become a seller</div>
        </Link>
      </div>
      <div className='mt-5 flex'>
        <div className='w-1/12'>Logo</div>
        <div className='w-1/12'>
          <Catalog/>
        </div>
        <search className='w-6/12 flex'>
          <input className='w-10/12 border-2 border-gray-500 rounded-lg py-1 text-center'></input>
          <button className=''><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          </button>
        </search>
        <div className='w-2/12'>
        
         <EntriesNew/>
        

        </div>
        <Link to='/profile/favorites' className='w-1/12 ml-4'>
        <div>Favorites</div>
        </Link>
        <Link to='/cart' className='w-1/12'>
        <div >Cart</div>
        </Link>
      </div>
    </nav>

 


  
 
  )
}
