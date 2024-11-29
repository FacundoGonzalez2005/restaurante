import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Restaurante from "./componets/restaurante/Restaurante";
import Inicio from "./componets/Inicio";
import Login from "./componets/login/login";
import Register from "./componets/register/register";
import Categorias from "./componets/categorias/categorias";
import Platos from "./componets/platos/platos";
import PlatosDetalle from "./componets/detallesPlato/detallesPlato";
import Perfil from "./componets/perfil/perfiluser";
import Admin from "./componets/admin/admin";
import Carrito from "./componets/carrito/carrito";
import Pagos from "./componets/pagos/pagos";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/restaurante" element={<Restaurante />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/categorias" element={<Categorias />} />
                <Route path="/platos" element={<Platos />} />
                <Route path="/detalles-plato" element={<PlatosDetalle />} />
                <Route path="/perfiluser" element={<Perfil />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/pagos" element={<Pagos />} />
            </Routes>
        </BrowserRouter>  
    </React.StrictMode>
);

