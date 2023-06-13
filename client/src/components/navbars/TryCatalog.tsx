import React, { useState } from 'react'

export const TryCatalog = () => {
  const [showCatalog, SetshowCatalog] = useState('hidden')
  const [showSubCatalog, setshowSubCatalog] = useState('hidden')


  const openshowCatalog = () => {
    SetshowCatalog('visible')     
  }
  const openshowSubCatalog = (e) => {
   const div = e.target.nextElementSibling
      // setshowSubCatalog('visible')  
      div.style.display = "block"
    
  
  }
  const closeshowCatalog = () => {
    SetshowCatalog('hidden')     
  }
  const closeshowSubCatalog = (e) => {
  
      
      const div = e.target.previousElementSibling
      console.log(div);
      
      div.style.display = "none"    
      
   
  }
  return (
    <div onMouseEnter={openshowCatalog}  className="relative inline-block text-left">
    <div>
      <button   type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
        Catalog
        <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  
  
    <div style={{visibility: showCatalog}} className="menuUser absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
    <div id='23' className="relative">
      <button onMouseEnter={openshowSubCatalog} onMouseLeave={closeshowSubCatalog}  type="button" className=" inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
        Categoty 1
        <svg className="-mr-1 h-5 w-5 text-gray-400 -rotate-90" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </button>
      <div id='1' style={{display: 'none'}} onMouseEnter={openshowSubCatalog} onMouseLeave={closeshowSubCatalog} className="menuUser absolute left-56 top-0 z-10 mt-2 ml-1 w-56  divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
    <div   className="py-1 hover:bg-slate-100 " role="none">
      <a href="#" className="text-gray-700 block px-4 py-2 text-sm " role="menuitem"  id="menu-item-0">SubCategory 1</a>    
    </div>  
    <div className="py-1 hover:bg-slate-100 " role="none">
      <a href="#" className="text-gray-700 block px-4 py-2 text-sm " role="menuitem"  id="menu-item-0">SubCategory 2</a>    
    </div>  
    
   
  </div>
    </div>
    <div className="relative">
      <button onMouseEnter={openshowSubCatalog} onMouseLeave={closeshowSubCatalog}  type="button" className=" inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
        Categoty 2
        <svg className="-mr-1 h-5 w-5 text-gray-400 -rotate-90" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </button>
      <div id='2' style={{display: 'none'}}  className="menusub hidden absolute left-56 top-0 z-10 mt-2 ml-1 w-56  divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
    <div onMouseLeave={closeshowSubCatalog}  className="py-1 hover:bg-slate-100 " role="none">
      <a href="#" className="text-gray-700 block px-4 py-2 text-sm " role="menuitem"  id="menu-item-0">SubCategory 3</a>    
    </div>  
    <div onMouseLeave={closeshowSubCatalog}  className="py-1 hover:bg-slate-100 " role="none">
      <a href="#" className="text-gray-700 block px-4 py-2 text-sm " role="menuitem"  id="menu-item-0">SubCategory 4</a>    
    </div>  
    
   
  </div>
    </div>
    </div>
  </div>
  )
}
