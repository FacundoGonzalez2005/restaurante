import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';

const PerfilUser = () => {
    const [userData, setUserData] = useState({
        username: "",
        token: ""
    });

    useEffect(() => {
        const username = sessionStorage.getItem("username");
        const token = sessionStorage.getItem("user_token");

        if (username && token) {
            setUserData({ username, token });
        }
    }, []);

    return (
        <>
        <main>
            <Navbar /> 
            <h2 className="titulo-cosmetico">
                Bienvenido {userData.username} BRRR
            </h2>
        <div>
          
        </div>

        </main>

        <Footer /> 
        </>
    );
};

export default PerfilUser;
