import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthLayout from './layout/AuthLayout';
import RutaProtegina from './layout/RutaProtegina';

import Login from './pages/Login';
import Registrar from './pages/Registrar';
import OlvidePassword from './pages/OlvidePassword';
import ConfirmarCuenta from './pages/ConfirmarCuenta';
import NuevoPassword from './pages/NuevoPassword';
import AdministrarPacientes from './pages/AdministrarPacientes';

import { AuthProvider } from './context/AuthProvider';
import { PacientesProvider } from './context/PacientesProvider';
import EditarPerfil from './pages/EditarPerfil';
import CambiarPassword from './pages/CambiarPassword';

function App() {

  console.log(import.meta.env.VITE_BACKEND_URL);

  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            {/* Rutas Publicas */}
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='registrar' element={<Registrar />} />
              <Route path='olvide-password' element={<OlvidePassword />} />
              <Route path='olvide-password/:token' element={<NuevoPassword />} />
              <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
            </Route>

            {/*  Rutas Privadas */}
            <Route path='/admin' element={<RutaProtegina />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path='perfil' element={<EditarPerfil />}/>
              <Route path='cambiar-password' element={<CambiarPassword />}/>
            </Route>
          </Routes>

        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App
