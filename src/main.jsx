import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/index.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './contexts/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <RouterProvider router={router} />
    </>
)
