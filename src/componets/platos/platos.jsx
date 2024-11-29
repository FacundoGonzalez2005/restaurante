import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import '../Restaurante.css';

const Platos = () => {
  const [platos, setPlatos] = useState([]); // Estado para almacenar los platos
  const [nombreCategoria, setNombreCategoria] = useState(""); // Estado para almacenar el nombre de la categoría
  const [error, setError] = useState(null); // Estado para manejar errores
  const [orden, setOrden] = useState(""); // Estado para manejar la opción de orden
  const location = useLocation(); // Hook para obtener la ubicación de la URL
  const navigate = useNavigate(); // Hook para redirigir al detalle del plato

  const obtenerParametroURL = (parametro) => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get(parametro);
  };

  useEffect(() => {
    const idCategoria = obtenerParametroURL("idCategoria"); // Obtener el idCategoria de la URL
    console.log("ID de categoría obtenido de la URL:", idCategoria);

    if (!idCategoria) {
      setError("No se encontró idCategoria en la URL");
      return;
    }

    const obtenerPlatosDeCategoria = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:3000/categoriasyplatos?idCategoria=${idCategoria}`);
        if (!response.ok) {
          throw new Error(`Error en la API: ${response.status}`);
        }

        const platosData = await response.json();
        console.log("Platos obtenidos:", platosData);

        if (platosData.length > 0) {
          setNombreCategoria(platosData[0].nombreCategoria); // Establece el nombre de la categoría
        }
        setPlatos(platosData); // Actualizamos el estado con los platos obtenidos
      } catch (error) {
        setError(error.message); // Si ocurre un error, actualizamos el estado con el mensaje de error
      }
    };

    obtenerPlatosDeCategoria(); // Llamar a la función para obtener los platos
  }, [location.search]); // Se vuelve a ejecutar si el parámetro de la URL cambia

  const handlePlatoClick = (idPlato) => {
    navigate(`/detalles-plato?idPlato=${idPlato}`);
  };

  const handleOrdenChange = (e) => {
    const option = e.target.value;
    setOrden(option);
    let platosOrdenados = [...platos];

    if (option === "mayor") {
      platosOrdenados.sort((a, b) => b.precio - a.precio); // Ordenar de mayor a menor
    } else if (option === "menor") {
      platosOrdenados.sort((a, b) => a.precio - b.precio); // Ordenar de menor a mayor
    }

    setPlatos(platosOrdenados); // Actualizamos los platos ordenados
  };

  return (
    <>
      <main>
        <div>
          <Navbar /> 

          {error && <p style={{ color: "red" }}>{error}</p>}
          <section className="productos_seleccionado" id="productos_seleccionado">
            <h2 className="titulo-cosmetico">{nombreCategoria}</h2>

            <div className="categoria-header">
              <div className="ordenar-container">
                <select className="ordenar-select" value={orden} onChange={handleOrdenChange}>
           
                  <option value="mayor">Mayor precio</option>
                  <option value="menor">Menor barato</option>
                </select>
              </div>
            </div>

            {platos.length === 0 ? (
              <p>No hay platos disponibles para esta categoría.</p>
            ) : (
              platos.map((plato) => (
                <a key={plato.ID_PLATO} className="product-card" onClick={() => handlePlatoClick(plato.ID_PLATO)}>
                  <img src={plato.fotoURL} alt={plato.nombrePlato} className="producto_image" />
                  <div className="product-details">
                    <p className="marca_product">{plato.nombrePlato || "Marca Desconocida"}</p>
                    <p className="descripcion_product">${plato.precio}</p>
                  </div>
                </a>
              ))
            )}
          </section>
        </div>
      </main>
      <Footer /> 
    </>
  );
};

export default Platos;
