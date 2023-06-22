import React from 'react'
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
      <main className="grid place-items-center bg-gray-100 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-xl font-semibold text-[#0d7490]">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-800 sm:text-5xl">Страница не найдена</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Страница, которую вы запрашиваете, не существует.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/">
            <div className="rounded-md bg-[#0d7490] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0d7490]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">На главную</div>
            </Link>
          </div>
        </div>
      </main>
  );
}
