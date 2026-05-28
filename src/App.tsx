import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Splash } from './pantallas/Splash'
import { Intro } from './pantallas/Intro'
import { Menu } from './pantallas/Menu'
import { CrearCuento } from './pantallas/CrearCuento'
import { MisCuentos } from './pantallas/MisCuentos'
import { Multiverso } from './pantallas/Multiverso'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Splash />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/crear" element={<CrearCuento />} />
          <Route path="/mis-cuentos" element={<MisCuentos />} />
          <Route path="/multiverso" element={<Multiverso />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
