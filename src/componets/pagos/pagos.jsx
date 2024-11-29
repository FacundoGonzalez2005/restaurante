import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Cambiamos useHistory por useNavigate
import Navbar from '../navbar/navbar';


const Pago = () => {
  const [metodoPago, setMetodoPago] = useState("");
  const [formData, setFormData] = useState({ numeroTarjeta: "", fechaExpiracion: "", cvv: "" });
  const navigate = useNavigate(); // Usamos useNavigate

  const manejarCambioSelect = (event) => {
    setMetodoPago(event.target.value);
  };

  const manejarCambioFormulario = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const manejarEnvioFormulario = (event) => {
    event.preventDefault();
    if (metodoPago === "tarjeta") {
      console.log("Enviando datos de tarjeta:", formData);
      // Aquí puedes agregar la lógica para procesar el pago con tarjeta
      alert("Pago realizado con tarjeta");
    } else {
      alert("Por favor, acerquese a la caja o llame a un mozo para cobrar.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="pago-contenedor">
        <h1>Formulario de Pago</h1>
        
        <form onSubmit={manejarEnvioFormulario}>
          <div className="opciones-pago">
            <label htmlFor="metodoPago">Método de pago:</label>
            <select id="metodoPago" value={metodoPago} onChange={manejarCambioSelect}>
              <option value="">Seleccione un método de pago</option>
              <option value="efectivo">Efectivo</option>
              <option value="tarjeta">Tarjeta</option>
            </select>
          </div>

          {metodoPago === "efectivo" && (
            <p>Por favor, acerquese a la caja o llame a un mozo para cobrar.</p>
          )}

          {metodoPago === "tarjeta" && (
            <div className="formulario-tarjeta">
              <label htmlFor="numeroTarjeta">Número de tarjeta:</label>
              <input
                type="text"
                id="numeroTarjeta"
                name="numeroTarjeta"
                value={formData.numeroTarjeta}
                onChange={manejarCambioFormulario}
                required
              />

              <label htmlFor="fechaExpiracion">Fecha de expiración:</label>
              <input
                type="text"
                id="fechaExpiracion"
                name="fechaExpiracion"
                value={formData.fechaExpiracion}
                onChange={manejarCambioFormulario}
                required
              />

              <label htmlFor="cvv">CVV:</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={manejarCambioFormulario}
                required
              />
            </div>
          )}

          <button type="submit" className="btn-enviar">Confirmar Pago</button>
        </form>
      </div>
    </>
  );
};

export default Pago;
