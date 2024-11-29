import React from 'react';
import { Link } from 'react-router-dom';
import futer from "../../assets/futer.png";
import rhlm from "../../assets/rhlm.png";

const Footer = () => (
<footer className="final">
<div className="hijofinal">
    {/* Imagen a la izquierda */}
    <div className="footer-image-container">
        <img src={futer} alt="Descripción de la imagen" />
    </div>

    {/* Contenedor principal que agrupa el contenido en columna */}
    <div className="footer-content">
        {/* Contenedor superior */}
        <div className="footer-top-container">
            <div className="footer-logo">
                <img src={rhlm} alt="Logo" />
            </div>
            <div className="footer-links">
                <div><h1>Acerca De</h1></div>
                <a href="https://es.wikipedia.org/wiki/Anuel_AA">Anuel AA</a>
                <a href="https://es.wikipedia.org/wiki/Real_hasta_la_muerte">Real Hasta La Muerte</a>
                <a href="#">Servicio de Comida</a>
                <a href="#">Pilares De Marca</a>
            </div>
            <div className="footer-links">
                <div><h1>Recursos</h1></div>
                <div>Preguntas Frecuentes</div>
                <div>Guía de nutrición</div>
                <div>Politicas de Privacidad</div>
                <div>Folletos</div>
            </div>
        </div>

      
        <div className="footer-bottom-container">
            <div className="footer-socials">
                <a href="https://open.spotify.com/intl-es/artist/2R21vXR83lH98kGeO99Y66?si=Hh44iEGhS2iRceSr-DaKAw"><i class="fa-brands fa-spotify"></i></a>
                <a href="https://www.instagram.com/anuel/"><i class="fa-brands fa-instagram"></i></a>
                <a href="https://www.anuelaa.com/"><i class="fa-solid fa-globe"></i></a>
                <a href="https://x.com/Anuel_2bleA?t=PS8EgCzSrgsZs72LXM4lVQ&s=09"><i class="fa-brands fa-twitter"></i></a>
            </div>
            <div className="footer-extra-links">
            <div><h1>Nosotros</h1></div>
              
                <a href="https://www.instagram.com/emaa.piris/">Emaa Piris</a>
                <a href="https://www.instagram.com/facu_gonzalez_18/">Facu Gonzalez</a>
                <div>© 2024 Real Hasta La Muerte Todos los derechos reservados</div>
            </div>
        </div>
    </div>
</div>
</footer>);
export default Footer;