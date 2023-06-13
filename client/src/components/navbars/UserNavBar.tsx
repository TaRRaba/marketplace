import React from 'react'
import Entries from './Entries'
import { Link } from 'react-router-dom'
import EntriesNew from './EntriesNew'
import Catalog from './Catalog'
import { Try } from './EntriesMenu'
import { TryCatalog } from './TryCatalog'

export const UserNavBar = () => {
  return (    
   
    <nav className='grid px-5'>
      <div className='flex justify-between'>
        <div>Location</div>
        <Link to=''>
        <div>Become a seller</div>
        </Link>
      </div>
      <div className='mt-5 flex items-center'>
      <div className=" flex ">

      <img
      className="mx-auto h-16 w-auto"
      src="../../../public/logo/Logo.jpg"
      alt="Your Company"
      />
      <p className="text-2xl font-bold text-blue-800 ml-4"></p>
      </div>
    
        <div className='ml-4 w-1/12'>
          <TryCatalog/>
        </div>
        <search className='ml-3 w-6/12 flex'>
          <input className='w-11/12 py-1.5 border-2 border-gray-500 rounded-lg text-center'></input>
          <button className=''><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          </button>
        </search>
        <div className='w-2/12'>
        
         <Try/>
        

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
