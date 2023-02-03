import React, { useState, useEffect, useContext, useCallback } from "react";
import LoginService from "../../api/LoginService";
import ClientesService from "../../api/ClientesService";
import DataService from "../../api/DataService";
export const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [autorizado, setAutorizado] = useState(false);
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [loginService, setLoginService] = useState();
    const [clientesService, setClientesService] = useState();
    const [dataService, setDataService] = useState();
    
    useEffect(() => {
        // servicio para el login
        setLoginService(new LoginService());

        // verificar si esta logueado y iniciar los servicios con el token
        const token = sessionStorage.getItem("token");

        if (token) {
            // iniciar perfil
            setUser(JSON.parse(sessionStorage.getItem("perfil")));
            setClientesService(new ClientesService(token));
            setAutorizado(true);
        } else {
            sessionStorage.removeItem("products");
        }

        setLoading(false);
    }, []);

    // asignar el token a los servicios que los requieran
    const asignarTokenServicios = useCallback(
        async (usuario, clave) => {
            const clientesServiceTemp = new ClientesService();
            const respuestaValidarCliente = await clientesServiceTemp.validarCliente(
                usuario,
                clave
            );
            setClientesService(clientesServiceTemp);
            respuestaValidarCliente["cedula"] = usuario;
            respuestaValidarCliente["clave"] = '';
            let token = respuestaValidarCliente.response[0].tokentwo
            sessionStorage.setItem("token", token);
            respuestaValidarCliente["token"] = token;
            sessionStorage.setItem(
                "perfil",
                JSON.stringify(respuestaValidarCliente)
            );
            setUser(respuestaValidarCliente);
            setAutorizado(true);
            return respuestaValidarCliente;
        },
        []
    );

    // buscar valores de la base de datos
    const buscardataService = useCallback(
        async (name, parameter) => {
            const buscardataServiceTemp = new DataService();
            const respuestaData = await buscardataServiceTemp.buscarDataService(
                name,
                parameter
            );
            setDataService(respuestaData);
            return respuestaData;
        },
        []
    );    

    // const salir = () => {
    //     sessionStorage.removeItem("perfil");
    //     sessionStorage.removeItem("token");
    //     sessionStorage.removeItem("password");
    //     setAutorizado(false);
    // };

    return (
        <AuthContext.Provider
            value={{
                // autorizado,
                asignarTokenServicios,
                // clientesService,
                // user,
                // loading,
                // loginService,
                // salir,
                buscardataService,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
