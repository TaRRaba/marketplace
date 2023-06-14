
import { Link } from 'react-router-dom'

import { EntriesMenu} from './EntriesMenu'

import CatalogFinal from './CatalogFinal'
import { SearchBar } from './SearchBar'

export const UserNavBar = () => {
  return (    
   
    <nav className='grid px-5 sticky top-0 bg-gray-100 z-10'>
      <div className='flex justify-between'>
        <div>Location</div>
        <Link to=''>
        <div>Become a seller</div>
        </Link>
      </div>
      <div className='mt-5 flex items-center'>
      <div className=" flex  ">

      <img
      className="mx-auto h-12 w-auto"
      src="/logo/LM5.png"
      alt="Your Company"
      />
      <p className="text-2xl font-bold text-blue-800 ml-4"></p>
      </div>
    
        <div className='ml-4 w-1/12'>
          <CatalogFinal/>
        </div>
        <search className='ml-3 w-6/12 flex'>
         <SearchBar/>
        </search>
        <div className='w-2/12'>
        
         <EntriesMenu/>
        </div>
        <div className='w-2/12'>
        <button className='px-1 py-1 rounded-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-300'>Sing in</button>
        <button className='ml-2 px-1 py-1 rounded-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-300'>Sing up</button>

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
