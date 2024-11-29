import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../navbar/navbar';
import './Carrito.css';

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const carritoData = JSON.parse(localStorage.getItem("carrito")) || [];
    const carritoInicializado = carritoData.map(plato => ({
      ...plato,
      cantidad: plato.cantidad || 1, // Asegura que siempre haya una cantidad inicial
    }));
    setCarrito(carritoInicializado);
  }, []);

  const aumentarCantidad = (idPlato) => {
    const nuevoCarrito = carrito.map(plato => {
      if (plato.ID_PLATO === idPlato && plato.cantidad < 4) { // Ajusta a `ID_PLATO`
        return { ...plato, cantidad: plato.cantidad + 1 };
      }
      return plato;
    });
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const disminuirCantidad = (idPlato) => {
    const nuevoCarrito = carrito.map(plato => {
      if (plato.ID_PLATO === idPlato && plato.cantidad > 1) { // Ajusta a `ID_PLATO`
        return { ...plato, cantidad: plato.cantidad - 1 };
      }
      return plato;
    });
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const eliminarPlato = (idPlato) => {
    const carritoActualizado = carrito.filter(plato => plato.ID_PLATO !== idPlato);
    setCarrito(carritoActualizado);
    localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
  };

  const calcularTotal = () => {
    return carrito.reduce((total, plato) => total + plato.precio * plato.cantidad, 0);
  };

  const irAPago = () => {
    navigate("/pagos");
  };

  return (
    <>
      <Navbar />
      <div className="carrito-contenedor">
        <h1>Carrito de Compras</h1>
        {carrito.length === 0 ? (
          <p>No hay platos en el carrito</p>
        ) : (
          <ul className="lista-carrito">
            {carrito.map(plato => (
              <li key={plato.ID_PLATO} className="plato-item">
                <img src={plato.fotoURL} alt={plato.nombrePlato} className="imagen-producto" />
                <h3>{plato.nombrePlato}</h3>
                <p>{plato.descripcionPlato}</p>
                <p className="precio">${plato.precio}</p>

                <div className="contador-cantidad">
                  <button onClick={() => disminuirCantidad(plato.ID_PLATO)} className="btn-cantidad">-</button>
                  <span className="cantidad">{plato.cantidad}</span>
                  <button onClick={() => aumentarCantidad(plato.ID_PLATO)} className="btn-cantidad">+</button>
                </div>

                <button onClick={() => eliminarPlato(plato.ID_PLATO)} className="btn-eliminar">Eliminar</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="footer-carrito">
        <div className="total">
          <span>Total: </span>
          <span className="total-amount">${calcularTotal()}</span>
        </div>
        <button className="btn-comprar" onClick={irAPago}>Comprar</button>
      </div>
    </>
  );
};

export default Carrito;
