// src/register/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // Estado para almacenar el nombre de usuario, la contraseña y los mensajes de error
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Para redirigir a otra página después del login

  // Manejar el cambio de los inputs
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

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
      localStorage.setItem("token", data.token); // Guardar el token en localStorage
      navigate("/categorias"); // Redirigir a la página de categorías
    } catch (error) {
      setError(error.message); // Mostrar error si ocurre alguno
    }
  };

  return (
    <div>
      <h1>Iniciar sesión</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Usuario</label>
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
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
