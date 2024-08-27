'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <header
      className={` ${
        showMenu ? 'fixed top-0 z-30 bg-background' : ''
      } w-full flex flex-col items-center justify-between`}
    >
      <div className="hidden py-1 px-5 md:px-0 sm:flex w-full mx-auto justify-between  items-center">
        <Link
          className="text-xl font-bold leading-[4rem] flex items-center"
          href="/"
        >
          Paddle Table 2024{' '}
          <Image
            className="ml-2"
            src="/favicon.ico"
            alt="icono"
            width={24}
            height={24}
          />
        </Link>
        <nav>
          <ul className="flex gap-4 opacity-70">
            <li>
              <Link href="/players">Jugadores</Link>
            </li>
            <li>
              <Link href="/stats">Estadísticas</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="px-5 sm:hidden flex flex-row gap-4 py-4 z-30 justify-between w-full items-center">
        <Link
          onClick={() => (showMenu ? setShowMenu(!showMenu) : null)}
          className="text-xl font-bold leading-[4rem] flex items-center"
          href="/"
        >
          Paddle Table 2024{' '}
          <Image
            className="ml-2"
            src="/favicon.ico"
            alt="icono"
            width={24}
            height={24}
          />
        </Link>
        <div className="justify-between items-center">
          <div className="flex justify-center items-center gap-5">
            <button
              className="sm:hidden p-2 focus:outline-none flex flex-col gap-1"
              onClick={() => setShowMenu(!showMenu)}
            >
              <div
                className={`w-6 h-1 rounded-full bg-black origin-left transition-all duration-500 dark:bg-white ${
                  showMenu ? 'rotate-45 ' : ''
                }`}
              ></div>
              <div
                className={`w-6 h-1 rounded-full bg-black origin-left transition-all duration-500 dark:bg-white ${
                  showMenu ? 'opacity-0' : ''
                }`}
              ></div>
              <div
                className={`w-6 h-1 rounded-full bg-black origin-left transition-all duration-500 dark:bg-white ${
                  showMenu ? '-rotate-45 ' : ''
                }`}
              ></div>
            </button>
          </div>
        </div>
      </div>

      <nav
        className={`h-screen ${showMenu ? 'w-full bg-background' : 'hidden'}`}
      >
        <ul className="flex flex-col justify-center items-center gap-6 font-bold z-30 opacity-70">
          <li>
            <Link onClick={() => setShowMenu(!showMenu)} href="/">
              Inicio
            </Link>
          </li>
          <li>
            <Link onClick={() => setShowMenu(!showMenu)} href="/players">
              Jugadores
            </Link>
          </li>
          <li>
            <Link onClick={() => setShowMenu(!showMenu)} href="/stats">
              Estadísticas
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
