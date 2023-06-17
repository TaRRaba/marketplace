import React, { useEffect, useState } from 'react'

export function Maps() {

  const[address, setAddress] = useState({})


  useEffect(() => {
    (async function() {
      try {
        const response = await fetch('http://localhost:3001/api/maps', {
            credentials: 'include',
        })
        const result = await response.json();
        setAddress(result)

      } catch (error) {
          console.log(error);
      }
    })()

    ymaps.ready(init)
  },[])

  console.log("address====>", address);
  

function init() {
  const myMap = new ymaps.Map('map', {
    center: [55.752507, 37.623150],
    zoom: 11,
  }, {
    searchControlProvider: 'yandex#search',
  });

//   // Создаем геообъект с типом геометрии "Точка".
//   const myGeoObject = new ymaps.GeoObject({
//     // Описание геометрии.
//     geometry: {
//       type: 'Point',
//       coordinates: [55.742245, 37.585035], 
//     },
//     // Свойства.
//     properties: {
//       // Контент метки.
//       iconContent: 'Local Market',
//       hintContent: 'Смоленский бульвар, 22/14, Москва',
//     },
//   }, {
//     // Опции.
//     // Иконка метки будет растягиваться под размер ее содержимого.
//     preset: 'islands#blackStretchyIcon',
//     // Метку можно перемещать.
//     draggable: false,
//   });
  

//   myMap.geoObjects
//     .add(myGeoObject);
// }
//=====================================================================
const coords = [
  [55.742245, 37.585035], //Смоленский бульвар, 22/14, Москва
  [55.758894, 37.609398], //Газетный переулок, 13, Москва
  [55.721924, 37.624157], //Большая Серпуховская улица, 46с34, Москва
  [55.727425, 37.737695], //Рязанский проспект, 2/1к5Т, Москва
  [55.701318, 37.567159], //Ленинский проспект, 44, Москва
  [55.759086, 37.550612], //улица Сергея Макеева, 4, Москва
  [55.798207, 37.620106], //5-й проезд Марьиной Рощи, 15А, Москва
  [55.782319, 37.714348], //Семёновский переулок, 18, Москва
  [55.712455, 37.645719], //3-й Павелецкий проезд, 4, подъезд 1, Москва
  [55.779266, 37.577766], //Ленинградский проспект, 5с7, Москва
];
const adress = [
  "Смоленский бульвар, 22/14, Москва",
  "Газетный переулок, 13, Москва",
  "Большая Серпуховская улица, 46с34, Москва",
  "Рязанский проспект, 2/1к5Т, Москва",
  "Ленинский проспект, 44, Москва",
  "улица Сергея Макеева, 4, Москва",
  "5-й проезд Марьиной Рощи, 15А, Москва",
  "Семёновский переулок, 18, Москва",
  "3-й Павелецкий проезд, 4, подъезд 1, Москва",
  "Ленинградский проспект, 5с7, Москва"
];

// const myCollection = new ymaps.GeoObjectCollection();

// coords.forEach((el) => myCollection.add(new ymaps.Placemark(el)))

// myMap.geoObjects.add(myCollection);


const myGeoObjects = [];



for (let i = 0; i<coords.length; i++) {
  myGeoObjects[i] = new ymaps.GeoObject({
    geometry: {
      type: "Point",
      coordinates: coords[i]
    },
    properties: {
            // Контент метки.
            iconContent: 'Local Market',
            hintContent: adress[i],
          },
  },
  {
        // Опции.
        // Иконка метки будет растягиваться под размер ее содержимого.
        preset: 'islands#blackStretchyIcon',
        // Метку можно перемещать.
        draggable: false,
      });
}

const myClusterer = new ymaps.Clusterer();
myClusterer.add(myGeoObjects);
myMap.geoObjects.add(myClusterer);

}


  return (
      // <div id="map" className="ml-3 mt-10 h-96 w-10/12" />

      <>
          <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Пункты выдачи</p>
              {/* <p className="mt-6 text-lg leading-8 text-gray-600">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque,
                iste dolor cupiditate blanditiis ratione.
              </p> */}
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {/* {features.map((feature) => ( */}
                  <div  className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      {/* <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" /> */}
                      {"feature.name"}
                    </dt>{' '}
                    <dd className="inline">{}</dd>
                  </div>
                {/* ))} */}
              </dl>
            </div>
          </div>
          {/* style={ {width: 800, height: 400} } */}
          <div style={{height: 450}} id="map" className="  max-w-2xl rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0" />          
        </div>
      </div>
    </div>
      </>
  )
}
