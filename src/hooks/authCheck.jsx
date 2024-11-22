import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function authCheck() {
    const auth = localStorage.getItem('token');
    const navigate = useNavigate();
    useEffect(() => {
        if(!auth){
            navigate('/login');
        }
    }, [auth, navigate]);
}
