import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '@/components/Header.module.css'

const Header: React.FC = () => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname

  return (

    <div className="navbar bg-base-100 rounded-b-3xl shadow shadow-black">
      <div className="flex-1">
        <Link href="/" legacyBehavior>
          <a className={styles.bold} data-active={isActive('/')}>
            <img src="/asset/logo.png" width={80} height={80} />
          </a></Link>
      </div>
      <div className="flex-none gap-2">

        <div className="dropdown dropdown-end ">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="/asset/logo.png" />
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 p-2 shadow shadow-black menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <Link href="/create" legacyBehavior>
                <a className="justify-between" data-active={isActive('/create')}>
                  Créer un repas
                </a>
              </Link>
            </li>
            <li>
              <Link href="/mesrepas" legacyBehavior>
                <a className="justify-between" data-active={isActive('/mesrepas')}>Mes repas</a></Link></li>
            <li>
              <Link href="/signup" legacyBehavior>
                <a className="justify-between" data-active={isActive('/signup')}>Se connecter</a>
              </Link></li>
          </ul>

        </div>
      </div>
    </div >



  )
}

export default Header
