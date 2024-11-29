import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from '../navbar/navbar';
import '../Restaurante.css';

const DetallePlato = () => {
  const [plato, setPlato] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const obtenerParametroURL = (parametro) => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get(parametro);
  };

  useEffect(() => {
    const idPlato = obtenerParametroURL("idPlato");
    if (!idPlato) {
      setError("No se encontró idPlato en la URL");
      return;
    }

    const obtenerDetallePlato = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:3000/detalleplato?idPlato=${idPlato}`);
        if (!response.ok) {
          throw new Error(`Error en la API: ${response.status}`);
        }
        const platoData = await response.json();
        setPlato(platoData);
      } catch (error) {
        setError(error.message);
      }
    };

    obtenerDetallePlato();
  }, [location.search]);

  const handleComprar = () => {
    if (!plato || !plato.ID_PLATO) {
      console.error("El plato no tiene un ID_PLATO válido:", plato);
      return;
    }

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const existeEnCarrito = carrito.some(item => item.ID_PLATO === plato.ID_PLATO);

    if (!existeEnCarrito) {
      carrito.push({ ...plato, cantidad: 1 });
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    navigate("/carrito");
  };

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!plato) {
    return <p>Cargando detalles del plato...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="contenedor-gigante">
        <div className="contenedor-izquierda">
          <img src={plato.fotoURL} alt="Imagen del Producto" className="imagen-producto" />
        </div>
        <div className="contenedor-derecha">
          <h1 className="titulo-producto">{plato.nombrePlato}</h1>
          <p className="descripcion-producto">{plato.descripcionPlato}</p>
          <p className="precio-producto">${plato.precio}</p>
          <input type="text" className="input-descuento" placeholder="Cód. Descuento" />
          <button className="btn-comprar" onClick={handleComprar}>Comprar</button>
        </div>
      </div>
    </>
  );
};

export default DetallePlato;
