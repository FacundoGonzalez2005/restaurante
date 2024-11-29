import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Inicio.css';
import logo1 from "../assets/inicio.png";
import Register from './register/register';

const Inicio = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);

    const navigate = useNavigate();

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validación para usuario admin
        if (username === "admin" && password === "admin") {
            // Redirige a la vista de admin
            navigate("/admin");
            return; // Detiene la ejecución posterior
        }

        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Error en el inicio de sesión");
            }

            const data = await response.json();
            // Almacenar el token en el localStorage y la información del usuario en sessionStorage
            localStorage.setItem("token", data.token); // Guarda el token
            sessionStorage.setItem("user", JSON.stringify(data.user)); // Guarda los datos del usuario

            // Redirige a la página del restaurante
            navigate("/restaurante");
        } catch (error) {
            setError(error.message);
        }
    };

    // Función para manejar el éxito del registro
    const handleRegisterSuccess = () => {
        setIsRegistering(false);
    };

    const handleLogout = () => {
        sessionStorage.removeItem("user"); // Elimina los datos del usuario
        localStorage.removeItem("token"); // Elimina el token de autenticación
        navigate("/inicio"); // Redirige a la página de inicio
    };

    return (
        <div className="inicio-container">
            <div className="content-container">
                <div className="image-container">
                    <img src={logo1} alt="Restaurante 1" className="slide-image" />
                </div>
                <div className="text-container">
                    <h1 className="text">Restaurante<br></br><div className="brr"> REAL HASTA LA MUERTE</div></h1>

                    {isRegistering ? (
                        <Register onRegisterSuccess={handleRegisterSuccess} /> // Pasa la función de éxito al registro
                    ) : (
                        <div className="login-container">
                            {error && <p style={{ color: "red" }}>{error}</p>}
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="username" className="username">Usuario</label>
                                    <input
                                        type="text"
                                        id="username"
                                        placeholder="Usuario"
                                        value={username}
                                        onChange={handleUsernameChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password">Contraseña</label>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Contraseña"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                                <button type="submit" className="button-inicio">Iniciar sesión</button>
                            </form>
                            <p className="pe">
                                ¿No tienes cuenta?{" "}
                                <span 
                                    style={{ color: "#ff6347", cursor: "pointer" }}
                                    onClick={() => setIsRegistering(true)}
                                >
                                    Regístrate
                                </span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Inicio;
