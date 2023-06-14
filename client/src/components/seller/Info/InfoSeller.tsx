import React from 'react'

export default function InfoSeller() {
  return (
    <div className='grid grid-cols-3 grid-rows-6'>
        <div className='row-start-1 col-span-2'>
            <div>
            <h1>Вы никогда не продавали на маркетплейсе? А может, вообще никогда не продавали? Зарегистрируйтесь бесплатно! На этой странице собрано всё, чтобы легко и быстро стартовать на LocalMarket</h1>
            </div>
        </div>
        <div>
            <img className='rounded-lg' src="https://anylex.ru/wp-content/uploads/2021/06/KOB-_G-rsel_1.jpg" alt="seller logo" />
        </div>
        <div className='row-start-2 col-span-2'>
        <h1>Как стать продавцом LocalMarket?</h1>
        <h2>Шаг 1</h2>
        <h1>Пройдите регистрацию</h1>
        <p>Вам понадобится заполнить ИНН</p>
        {/* <h2>Комиссия за продажу 3%</h2> */}
        </div>
        <div>
            <img className='rounded-lg' src="https://allsoft.ru/upload/programs_pictograms/c56/c56da1293333aee85209507ecfd35c9c.png" alt="seller logo" />
        </div>
        <div className='row-start-3 col-span-2'>
        <h2>Шаг 2</h2>
        <h1>Заключите договор</h1>
        <p>Форму договора пришлем вам на электронную почту</p>
        </div>
        <div>
            <img className='rounded-lg' src="https://cdn-edge.kwork.ru/pics/t3/57/8820378-1596203657.jpg" alt="seller logo" />
        </div>
        <div className='row-start-4 col-span-2'>
        <h2>Шаг 3</h2>
        <h1>Добавьте товары</h1>
        <p>Загрузите каталог прямо в личном кабинете</p>
        </div>
        <div>
            <img className='rounded-lg' src="https://e-sevenweb.ru/wp-content/uploads/2022/01/market.png" alt="seller logo" />
        </div>
        <div className='row-start-5 col-span-2'>
        <h2>Шаг 4</h2>
        <h1>Начинайте продавать</h1>
        <p>Самостоятельно или под присмотром технических специалистов, которые прошли обучение у нас и могут помочь с развитием бизнеса на площадке. Если возникнут вопросы — мы всегда на связи в личном кабинете и соцсетях</p>
        </div>
        <div>
            <img className='rounded-lg' src="https://periscopeup.com/wp-content/uploads/2021/01/Depositphotos_23450934_xl-2015-scaled-1.jpg" alt="seller logo" />
        </div>
    </div>
  )
}
