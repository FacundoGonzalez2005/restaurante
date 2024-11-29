import React, { useEffect, useState } from 'react';

const Admin = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Intenta obtener los datos del usuario desde sessionStorage
        const userData = sessionStorage.getItem("user");

        // Si los datos existen, parsea y establece el nombre de usuario
        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                if (parsedUser && parsedUser.username) {
                    setUsername(parsedUser.username);
                } else {
                    console.error("Error: 'username' no está disponible en los datos de usuario");
                }
            } catch (error) {
                console.error("Error al parsear los datos de usuario:", error);
            }
        } else {
            console.error("Error: No hay datos de usuario en sessionStorage");
        }
    }, []);

    return (
        <div className="admin-container">
            <h1>Bienvenido {username || "Admin"}</h1>
            {/* Aquí puedes agregar el contenido específico del admin */}
        </div>
    );
};

export default Admin;
