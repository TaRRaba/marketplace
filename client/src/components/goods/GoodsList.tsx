import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { RootState } from '../../redux/store/store';
import { getCart } from '../../redux/thunks/cartThunks/getCart.thunk';
import { addAmountCart } from '../../redux/thunks/cartThunks/addAmountCart.thunk';
import { addToFav } from '../../redux/thunks/favThunks/addToFav.thunk';
import { getFav } from '../../redux/thunks/favThunks/getFav.thunk';
import { removeFromFav } from '../../redux/thunks/favThunks/removeFromFav.thunk';

import { Fragment } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { IGoodData } from '../../types/cart/cartTypes';

interface ISubCat {
    name: string;
    id: number;
}

interface IOptions {
    value: string;
    label: string;
    checked: boolean;
}

interface IFilters {
    id: string;
    name: string;
    options: IOptions[];
}


export const GoodsList = () => {
    const dispatch = useAppDispatch();
    const prices: NodeListOf<HTMLElement> = document.getElementsByName("price");
    const cart = useAppSelector((state: RootState) => state.cart.cart);
    const favourites = useAppSelector((state: RootState) => state.favourites.favourites);
    let [goods, setGoods] = useState<IGoodData[]>([]);
    const [initGoods, setInitGoods] = useState<IGoodData[]>([])
    const [subCat, setSubCat] = useState<ISubCat[]>([]);
    const [catName, setCatName] = useState('');
    const [maxPrice, setMaxPrice] = useState(0);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [sortOptions, setSortOptions] = useState([
        { name: 'Популярные', type: 'popular', current: false },
        { name: 'Новинки', type: 'newest', current: false },
        { name: 'Сначала дешевые', type: 'cheapest', current: false },
        { name: 'Сначала дорогие', type: 'expensive', current: false },
    ]);
    const [filters, setFilters] = useState<IFilters[]>([
          {
            id: 'country',
            name: 'Страна производства',
            options: [],
          },
          {
            id: 'brand',
            name: 'Производитель',
            options: [],
          }
    ]);
    const [filtersBackup, setFiltersBackup] = useState<IFilters[]>([...filters]);

    function initFilters() {
        if (goods.length > 0) {
          const uniqueCountryValues = [...new Set(goods.map(good => good.country))];
          const uniqueBrandValues = [...new Set(goods.map(good => good.specs.brand))];
          const countryFilters = uniqueCountryValues.map(country => {
            return {
              value: country,
              label: country,
              checked: false
            };
          });
          const brandsFilters = uniqueBrandValues.map(brand => {
            return {
              value: brand,
              label: brand,
              checked: false
            };
          });
        filters[0].options = countryFilters;
        filters[1].options = brandsFilters;
        setFiltersBackup(filters);
        } else {
        setFilters(filtersBackup);
        }
    }

    function getMaxPrice(data:IGoodData[]) {

        const maxPriceProduct = data.reduce((maxPriceProduct, currentProduct) => {
            if (currentProduct.price > maxPriceProduct.price) {
              return currentProduct;
            } else {
              return maxPriceProduct;
            }
        });
        setMaxPrice(maxPriceProduct.price);   
    }

    const filterHandler = (event: React.FormEvent<HTMLFormElement>) => {
        
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const regData = {
          country: data.getAll('country'),
          brand: data.getAll('brand'),
          price: data.getAll('price')
        }
        const filterCountry = regData.country.length > 0 ? regData.country : null;
        const filterBrand = regData.brand.length > 0 ? regData.brand : null;
        const filterPrice = regData.price.length > 0 ? regData.price : null;

        function filterProducts(products:IGoodData[], countries:FormDataEntryValue[] | null, brands:FormDataEntryValue[] | null, priceRange:number[] | null) {
            const filteredProducts = products.filter((product) => {
              const isCountryMatch = countries ? countries.includes(product.country) : true;
              const isBrandMatch = brands ? brands.includes(product.specs.brand) : true;
              const isPriceMatch = priceRange
                ? product.price >= priceRange[0] && product.price <= priceRange[1]
                : true;
                
              return isCountryMatch && isBrandMatch && isPriceMatch;
            });    
            return filteredProducts;
          }

          if (goods.length > 0) {
              setGoods(filterProducts(goods, filterCountry, filterBrand, filterPrice));
            } else {
              setGoods(filterProducts(initGoods, filterCountry, filterBrand, filterPrice));
          }
        
        if (prices.length > 0) {
            prices[1].value = maxPrice;
        }
      }

      function SubCatFilter(id: number) {
        goods = initGoods;
        const filteredProducts = goods.filter((good) => good.subcategory_id === id);
        setGoods(filteredProducts);
      }

    function restoreGoods() {
        setGoods([...initGoods]);
        const countries: NodeListOf<HTMLElement> = document.getElementsByName("country");
        const brands: NodeListOf<HTMLElement> = document.getElementsByName("brand");
        
        if (countries.length > 0) {
            for(let i = 0; i < countries.length; i++) {
                countries[i].checked = false;
            }
        }
        if (brands.length > 0) {
        for(let i = 0; i < brands.length; i++) {
            brands[i].checked = false;
        }
    }
        if (prices.length > 0) {
            prices[0].value = 0;
            prices[1].value = maxPrice;
        }
    }

    function SortGoods(type: string) {
        sortOptions.forEach((el) => el.current = false);
        if (type === "popular") {
            setGoods([...goods.sort((a, b) => b.rating - a.rating)]);
        }
        if (type === "cheapest") {
            setGoods([...goods.sort((a, b) => a.price - b.price)]);
        }
        if (type === 'expensive') {
            setGoods([...goods.sort((a, b) => b.price - a.price)]);
        }
        if (type === 'newest') {
            setGoods([...goods.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))]);            
        }
        setSortOptions([...sortOptions.map((option) => {
            if (option.type === type) {
                option.current = true;
            }
            return option;
        })])
    }


    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
      }

    function checkCart(id: number) {   
        return cart.some((el) => el.good_id === id);
    }

    function checkFav(id: number) {
        return favourites.some((el) => el.good_id === id);
    }


    useEffect(() => {
        (async function () {
                try {
                    const response = await fetch('http://localhost:3001/api/fav/category/2', {
                        credentials: 'include',
                    })
                    const result = await response.json();
                    if (result.status === 200) {
                        setGoods(result.data);
                        setInitGoods(result.data);
                        setSubCat(result.subCat);
                        setCatName(result.catName);
                        getMaxPrice(result.data)
                    }
                  } catch (error) {
                      console.log(error);
                  }
        })();
        dispatch(getFav());
        dispatch(getCart());
    }, [])

    useEffect(() => {
        if (goods.length > 0) {
        getMaxPrice(goods);
        }
        initFilters();
    }, [goods])

    useEffect(() => {
        if (prices.length > 0) {
            prices[1].value = maxPrice;
        }
    }, [maxPrice])



    return (
        <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>
  
              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
  
                    {/* Filters */}
                    <form className="mt-4 border-t border-gray-200">
                      <h3 className="sr-only">Categories</h3>
                      <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                        {subCat.map((category) => (
                          <li key={category.name}>
                            <a href='#' className="block px-2 py-3">
                              {category.name}
                            </a>
                          </li>
                        ))}
                      </ul>
  
                      {filters.map((section) => (
                        <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">{section.name}</span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                    ) : (
                                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  {section.options.map((option, optionIdx) => (
                                    <div key={option.value} className="flex items-center">
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={section.id}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 focus:ring-teal-600"
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
  
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">{catName}</h1>
  
              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Сортировка
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
  
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <div
                                onClick={() => SortGoods(option.type)}
                                className={classNames(
                                  option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm cursor-pointer'
                                )}
                              >
                                {option.name}
                              </div>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
  
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
  
            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>
  
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="flex justify-center lg:block" onSubmit={filterHandler}>
                  <h3 className="sr-only">Categories</h3>
                  <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                    {subCat.map((category) => (
                      <li key={category.name}>
                        <div onClick={() => SubCatFilter(category.id)} className='text-lg hover:bg-teal-500/30 cursor-pointer rounded-md py-2 px-4 font-medium'>{category.name}</div>
                      </li>
                    ))}
                  </ul>
  
                  {filters.map((section) => (
                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">{section.name}</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex items-center">
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={section.id}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-600"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                    <Disclosure as="div" key='priceInp' className="border-b border-gray-200 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">Цена</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                               <input
                                    id={`filter-price-min`}
                                    name='price'
                                    defaultValue='0'
                                    type="number"
                                    className="mr-3 h-8 w-28 rounded border-gray-300 focus:ring-teal-600"
                                  />
                                  -
                                  <input
                                    id={`filter-price-max`}
                                    name='price'
                                    defaultValue={maxPrice}
                                    type="number"
                                    className="ml-3 h-8 w-28 rounded border-gray-300 focus:ring-teal-600"
                                  />
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    <div className="flex mt-5 justify-center">
                    <button type="submit" className="flex mr-3 text-sm justify-center w-28 cursor-pointer space-x-1.5 rounded-lg hover:bg-teal-500 bg-teal-600 px-4 py-1.5 text-white duration-100">
                  Применить
                  </button>
                  <div onClick={restoreGoods} className="flex text-sm justify-center w-28 cursor-pointer space-x-1.5 rounded-lg hover:bg-teal-500 bg-teal-600 px-4 py-1.5 text-white duration-100">
                  Сбросить
                  </div>
                  </div>
                </form>
  
                {/* Product grid */}
                <div style={{maxHeight: '1100px'}} className="overflow-y-scroll lg:col-span-3">
                <>
{goods.length > 0 ? (
  <div id="Cart" className="visibility: visible bg-gray-100 py-10 min-h-96">
    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div id="amount" className="rounded-lg">
        {goods && goods.map(({ id, name, img_url, specs, amount, country, price }) => (
          <div key={id} id={String(id)} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <img src={`http://localhost:3001${img_url}`} alt="" className="rounded-lg w-40" />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
              <div className="mt-5 w-80 sm:mt-0">
                <a href={`/goods/${name}`}><h2 className="line-clamp-3 text-left text-lg font-bold text-gray-900 hover:text-gray-500">{name}</h2></a>
                {amount === 0 ? 
                <p className="text-left mt-3 text-md text-red-600">Нет в наличии</p>
                : amount > 10 ?
                <p className="text-left mt-3 text-md text-green-700">В наличии</p>
                :
                <p className="text-left mt-3 text-md text-yellow-500">Осталось мало</p>
                }
                <div className="flex mt-5 w-80 sm:mt-0">
                <p className="text-left mt-5 text-xs text-gray-500">Страна: {country}</p>
                <p className="ml-5 text-left mt-5 text-xs text-gray-500">Производитель: {specs.brand}</p>
              </div>
              </div>
              <div className="flex flex-col mt-0">
                {checkFav(id) ?
                 <svg onClick={() => dispatch(removeFromFav(id))} className="addFav h-5 w-5 self-end cursor-pointer duration-150 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                 <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
               </svg>
                :
                <svg onClick={() => dispatch(addToFav(id))} className="addFav h-5 w-5 self-end cursor-pointer duration-150 hover:text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                }
                <div className="flex mt-16 mb-4 mr-1 self-end items-center space-x-4">
                  <p className="totalPrice text-lg font-bold text-teal-800">
                    {price}
                    {' '}
                    ₽
                  </p>
                </div>
                {amount > 0 ?
                <>
                {checkCart(id) ?
              <div className="addedCart flex text-sm items-center cursor-pointer space-x-1.5 rounded-lg bg-teal-600 px-4 py-1.5 text-white duration-100">
              В корзине
            </div>
              :
             <div onClick={() => dispatch(addAmountCart({goodID: id, amount: 1}))} className="addToCart flex text-sm items-center cursor-pointer space-x-1.5 rounded-lg bg-[#4520aa] px-4 py-1.5 text-white duration-100 hover:bg-[#4520aa]/80">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="addToCart mr-2 h-4 w-4">
               <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
             </svg>
              В корзину
           </div>
              }
              </>
              : null }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
) : (
  <section className="py-10 flex bg-gray-100">
    <div className="text-2xl my-40 justify-center text-gray-700 m-auto">Нет товаров для отображения!</div>
  </section>
)}
  </>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
      );
}

