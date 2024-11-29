import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/restaurante.png";

const Navbar = () => {
  const [cantidadCarrito, setCantidadCarrito] = useState(0);

  useEffect(() => {
    // Leer los datos del carrito desde localStorage y calcular la cantidad total
    const actualizarCantidadCarrito = () => {
      const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      const cantidadTotal = carrito.reduce((total, plato) => total + (plato.cantidad || 0), 0);
      setCantidadCarrito(cantidadTotal);
    };

    // Actualizar la cantidad inicial
    actualizarCantidadCarrito();

    // Escuchar cambios en el localStorage
    const handleStorageChange = () => {
      actualizarCantidadCarrito();
    };

    window.addEventListener("storage", handleStorageChange);

    // Limpiar el listener al desmontar el componente
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/carrito" className="nav-icon" id="cart-icon">
          <i className="fa-solid fa-cart-shopping"></i>
          <span id="cart-count" className="cart-count">{cantidadCarrito}</span>
        </Link>
        <a href="/perfiluser" className="nav-icon"><i className="fa-solid fa-user"></i></a>
      </div>
      <div className="nav-center">
        <Link to="/restaurante">
          <img src={logo} alt="Logo" className="nav-logo" />
        </Link>
      </div>
      <div className="nav-right">
        <a href="#" className="nav-icon" id="search-icon"><i className="fa-solid fa-magnifying-glass"></i></a>
        <a href="#" className="nav-icon" id="menu-icon"><i className="fa-solid fa-bars"></i></a>
      </div>
    </nav>
  );
};

export default Navbar;
