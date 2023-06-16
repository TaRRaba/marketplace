import React from 'react'
import { CardsPopular } from './CardsPopular'
import LoginUser from '../user/LoginUser/LoginUser'
import RegistrationUser from '../user/RegistrationUser/RegistrationUser'

export const Main = () => {



  return (
    <>

    <a href='/#'>
    <video autoPlay loop controlsList='nodownload' className="n8o9J" muted data-testid="main-banner-video" playsInline ><source src="https://cdn2.static1-sima-land.com/share/16809.mp4"/></video>
    </a>
    <nav className="flex bg-gray-100 text-gray-700  px-5" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a href="/" className="text-gray-500 hover:text-black text-sm inline-flex font-medium items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
              <span className="text-gray-500 hover:text-black text-sm font-medium">Главная</span>
            </a>
          </li>
        </ol>
      </nav>
    <CardsPopular/>
    </>
  )
}
