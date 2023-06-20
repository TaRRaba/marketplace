import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { getMaps } from '../../redux/thunks/mapsThunks/getMapsThunks';
import { RootState } from '../../redux/store/store';

export function Maps() {
//--Добавление локации города пользователя --------------------------------------
  const [loc, setLoc] = useState('')
  const location = ymaps.geolocation.get({
    provider: 'browser'
});

  location.then(
    function(result) {
       // Получение местоположения пользователя.
       const userAddress = (result.geoObjects?.get(0).properties?.get('text'));
      setLoc(userAddress)
    },
    function(err) {
      console.log('Ошибка: ' + err)
    }
  );

//-----------------------------------------------------------------------------
  const dispatch = useAppDispatch();
  const address = useAppSelector((state: RootState) => state.maps.maps);

  useEffect(() => {
    dispatch(getMaps())
  },[])

  useEffect(() => {
    ymaps.ready(init) 
  },[address])
  
function init() {
  if (address.length !== 0) {

  const myMap = new ymaps.Map('map', {
    center: [55.752507, 37.623150],
    zoom: 11,
  }, {
    searchControlProvider: 'yandex#search',
  });

const myGeoObjects: object[] = [];

address.forEach((el, i) => {
  myGeoObjects[i] = new ymaps.GeoObject({
        geometry: {
          type: "Point",
          coordinates: el.coords
        },
        properties: {
                // Контент метки.
                iconContent: 'Local Market',
                hintContent: el.address,
              },
      },
      {
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset: 'islands#blackStretchyIcon',
            // Метку можно перемещать.
            draggable: false,
          });
})

const myClusterer = new ymaps.Clusterer();
myClusterer.add(myGeoObjects);
myMap.geoObjects.add(myClusterer);
  }
}

  return (
      <>
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
  <span className='flex items-center text-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" height="25" width="25"><path fill="#ff6d37" d="M42 21C42 33.9185 28.6491 43.1283 24.9437 45.4357C24.3571 45.8009 23.6429 45.8009 23.0563 45.4357C19.3509 43.1283 6 33.9185 6 21C6 11.0589 14.0589 3 24 3C33.9411 3 42 11.0589 42 21Z"></path><path fill="#ffffff" d="M32.942 23.8215C33.9225 22.2351 34.2415 20.2696 33.815 18.4421C32.9038 14.2794 27.8581 12.5783 24.7152 15.368C24.4663 15.5874 24.2449 15.8405 24 16.0927C23.7551 15.8405 23.5337 15.5874 23.2848 15.368C20.1419 12.5783 15.0962 14.2794 14.185 18.4421C13.7585 20.2696 14.0775 22.2351 15.058 23.8215C16.6502 26.4016 19.1471 28.4518 21.6551 30.3016C23.0456 31.3272 24.9544 31.3272 26.3449 30.3016C28.8529 28.4518 31.3498 26.4016 32.942 23.8215Z"></path><path stroke="#3e3e3e" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M42 21C42 33.9185 28.6491 43.1283 24.9437 45.4357C24.3571 45.8009 23.6429 45.8009 23.0563 45.4357C19.3509 43.1283 6 33.9185 6 21C6 11.0589 14.0589 3 24 3C33.9411 3 42 11.0589 42 21Z"></path><path stroke="#3e3e3e" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M32.942 23.8215C33.9225 22.2351 34.2415 20.2696 33.815 18.4421C32.9038 14.2794 27.8581 12.5783 24.7152 15.368C24.4663 15.5874 24.2449 15.8405 24 16.0927C23.7551 15.8405 23.5337 15.5874 23.2848 15.368C20.1419 12.5783 15.0962 14.2794 14.185 18.4421C13.7585 20.2696 14.0775 22.2351 15.058 23.8215C16.6502 26.4016 19.1471 28.4518 21.6551 30.3016C23.0456 31.3272 24.9544 31.3272 26.3449 30.3016C28.8529 28.4518 31.3498 26.4016 32.942 23.8215Z"></path></svg> <span className=' ml-1'>{loc.split(',')[0]}</span></span>
              <p className="mb-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Пункты выдачи</p>
                {address?.map((el) => (
                  <p key={el.id} className=' my-2'>{el.address}</p>
                 ))} 
          </div>
          <div style={{height: 450}} id="map" className="  max-w-2xl rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0" />          
        </div>
      </div>
    </div>
      </>
  )
}
