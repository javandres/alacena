import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Firma } from './Firma'
import { precargarVoces } from '../lib/narrador'
import css from './Layout.module.css'

export function Layout() {
  useEffect(() => {
    precargarVoces()
  }, [])

  return (
    <div className={css.shell}>
      <div className={css.contenido}>
        <Outlet />
      </div>
      <Firma />
    </div>
  )
}
