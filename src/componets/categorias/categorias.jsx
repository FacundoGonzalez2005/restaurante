// src/categorias/Categorias.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../Restaurante.css';
import imgCategoria1 from "../../assets/1.jpg";
import imgCategoria2 from "../../assets/2.jpg";
import imgCategoria3 from "../../assets/3.jpg";
import imgCategoria4 from "../../assets/4.jpg";
import imgCategoria5 from "../../assets/5.jpg";

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/categorias");
        if (!response.ok) throw new Error("Error al obtener las categorías");
        const data = await response.json();
        
        // Asignar imágenes manualmente a las categorías
        const categoriasConImagenes = data.map((categoria, index) => ({
          ...categoria,
          imagen: [imgCategoria1, imgCategoria2, imgCategoria3, imgCategoria4, imgCategoria5][index],
        }));

        setCategorias(categoriasConImagenes);
      } catch (error) {
        setError(error.message);
      }
    };

    obtenerCategorias();
  }, []);

  const handleCategoriaClick = (idCategoria) => {
    navigate(`/platos?idCategoria=${idCategoria}`);
  };

  return (
    <section className="scroll_productos" id="productos-container">
    
      {error && <p style={{ color: "red" }}>{error}</p>}
      {categorias.length === 0 ? (
        <p>No hay categorías disponibles.</p>
      ) : (
        categorias.map((categoria) => (
          <a
            href="#"
            key={categoria.ID_CATEGORIA}
            className="container_produc"
            onClick={(e) => {
              e.preventDefault();
              handleCategoriaClick(categoria.ID_CATEGORIA);
            }}
          >
            <img
              src={categoria.imagen}
              alt={categoria.nombreCategoria}
              className="product-image"
            />
            {/* <p className="name_produc">{categoria.nombreCategoria}</p> */}
          </a>
        ))
      )}
    </section>
  );
};

export default Categorias;
