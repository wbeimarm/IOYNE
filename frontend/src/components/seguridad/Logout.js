import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken, setPerfil, setRutas, setProducts, setUsuarios, setCotizaciones } 
from '../../slices/uiSlice';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setToken(null));
        dispatch(setPerfil(null));
        dispatch(setRutas(null));
        dispatch(setUsuarios([]));
        dispatch(setProducts([]));
        dispatch(setCotizaciones([]));
        sessionStorage.setItem("usuarios", "");
        sessionStorage.setItem("products", "");
        sessionStorage.setItem("cotizaciones", "");
        sessionStorage.setItem("token", "");    
        sessionStorage.setItem("perfil", "");   
        // redireccionar al inicio ya logueado
        navigate('/');          
    }, [])
    return (
        <>
        </>
    )
}
