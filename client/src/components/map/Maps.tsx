import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { getMaps } from '../../redux/thunks/mapsThunks/getMapsThunks';
import { RootState } from '../../redux/store/store';

export function Maps() {

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
      // <div id="map" className="ml-3 mt-10 h-96 w-10/12" />
      <>
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
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