import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "../pages/Layouts/Layout";
import HomePage from "../pages/Home/Home";
import LibroPage from "../pages/Libro/Libro";
import UsuarioLibroPage from "../pages/UsuarioLibro/UsuarioLibro";
import EditorialPage from "../pages/Editorial/Editorial";
import PrestamoPage from "../pages/Prestamo/Prestamo";
import EditorialCrearPage from "../pages/Editorial/EditorialCrearPage";
import EditorialUpdatePage from "../pages/Editorial/EditorialUpdatePage";

function AppRoute() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/libro" element={<LibroPage />} />
                    <Route path="/prestamo" element={<PrestamoPage />} />
                    <Route path="/editorial" element={<EditorialPage />} />
                    <Route path="/editorial/crear" element={<EditorialCrearPage />} />
                    <Route path="/editorial/editar" element={<EditorialUpdatePage />} />
                    <Route path="/usuario-libro" element={<UsuarioLibroPage />} />
                    <Route path="*" element={<div>404</div> } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoute;