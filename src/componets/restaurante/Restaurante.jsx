import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Restaurante.css';
import plato1 from "../../assets/plato1.png";
import plato2 from "../../assets/plato2.png";
import futer from "../../assets/futer.png";
import rhlm from "../../assets/rhlm.png";
import gif from "../../assets/restaurante-gif.gif";
import Categorias from '../categorias/categorias'; 
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';

export default function Dragonball() {
    const [pg, setPg] = useState(1);
    const [personajes, setPersonajes] = useState([]);

    const fetchData = async (page) => {
        try {
            const url = `http://127.0.0.1:3000/restaurantes`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const info = await response.json();
            setPersonajes(info);
        } catch (error) {
            console.error("Error al obtener datos:", error);
        }
    };

    useEffect(() => {
        if (pg) {
            fetchData(pg);
        }
        console.log("La recuperación de datos se está ejecutando");
    }, [pg]);

    return (
        <>
        <main>
        <Navbar /> 
            
            <section className="elegidos_mes">
                <img src={gif} alt="Animación divertida" width="100%" height="100%" />
            </section>
            
            {personajes.length > 0 ? (
                personajes.map((restaurante, index) => (
                    <div key={`${restaurante.nombreRestaurante}-${index}`}>
                        
                        {/* Renderiza el componente Categorias debajo de "Hora de cierre" */}
                        <Categorias />

                        <div class="container">  
                            <img src={plato1} alt="Cilantro" class="img-left"/>  
                            <div class="content">  
                            <h2 class="subtitle">Recetas Artesanales</h2>  
                            <h1 class="title">INDISCUTIBLEMENTE DELICIOSO</h1>  
                            <p class="description">  
                                Presentamos el extraordinario sabor de Pastas Puertorriqueñas<br/>  
                                elegidas por el cantante y compositos Anuel AA.  
                            </p>  
                           
                            </div>  
                            <img src={plato2} alt="Ajo" class="img-right"/>  
                        </div>  
                    <section class="descuento_produc-widow">


                        <div class="carousel-widow">
                        <div class="carousel-container-widow">
                            <div class="carousel-item-widow">
                            <img src={futer} alt="Imagen 1"/>
                            </div>
                          
                        </div>
                        </div>




                    </section>

                        <div class="container_disfrute">  
                            <h1 className="h1_disfrute">YA LO DISFRUTAN MILLONES</h1>  
                            
                            
                            <div class="card_disfrute">  
                                <div class="icon_disfrute">“</div>  
                                <p class="testimonial_disfrute">¡Las carnes de Boar’s Head® son increíbles! Las como desde que soy adolescente. ¡Amo el Roast Beef y el Cajun Turkey! En realidad, todos. ¡Y los quesos son igual de buenos, sobre todo el Pepper Jack y el Sharp Cheddar! Soy muy fan…</p>  
                                <footer class="footer_disfrute">  
                                    <span>RYAN</span>  
                                    <span>FACEBOOK</span>  
                                </footer>  
                            </div>  

                            <div class="card_disfrute">  
                                <div class="icon_disfrute">“</div>  
                                <p class="testimonial_disfrute">Durante toda mi infancia, mi madre siempre me envió sándwiches de Boar’s Head® en la lonchera. Ahora, estoy generando recuerdos increíbles con mi familia comiendo los mismos sándwiches deliciosos de Boar’s Head®. Es una tradición construida con amor.</p>  
                                <footer class="footer_disfrute">  
                                    <span>NANCY</span>  
                                    <span>POR QUÉ CONFIÓ</span>  
                                </footer>  
                            </div>  

                            <div class="card_disfrute">  
                                <div class="icon_disfrute">“</div>  
                                <p class="testimonial_disfrute">Somos un hogar Boar’s Head®. Si bien yo me ocupo de todas las compras de la familia y de todas las comidas, no comemos carne. Sigo eligiendo comprar lo que es mejor para mi familia.</p>  
                                <footer class="footer_disfrute">  
                                    <span>JESS</span>  
                                    <span>TWITTER</span>  
                                </footer>  
                            </div>  
                        </div> 

                     


                       
                    </div>
                ))
            ) : (
                <p>Cargando restaurantes...</p>
            )}
        </main>
        <Footer /> 
        </>
        
    );
}
