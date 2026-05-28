import { Outlet } from 'react-router-dom'
import { Firma } from './Firma'
import css from './Layout.module.css'

export function Layout() {
  return (
    <div className={css.shell}>
      <div className={css.contenido}>
        <Outlet />
      </div>
      <Firma />
    </div>
  )
}
