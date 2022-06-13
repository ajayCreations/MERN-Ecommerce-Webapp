import React from 'react'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
const ProtectedRoute = ({ isAuthenticated, children, isAdmin, redirect = "/", redirectAdmin = "/" }) => {

    if (!isAuthenticated) {
        return <Navigate to={redirect} />
    }

    if (!isAdmin) {
        return <Navigate to={redirectAdmin} />
    }

    return children ? children : <Outlet />;
}


export default ProtectedRoute
