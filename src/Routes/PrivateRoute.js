import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useUser from '../hook/useUser';


const PrivateRoute = ({ children }) => {
    const data = JSON.parse(localStorage.getItem('user'))
    const { user, userLoading } = useUser(data);
    const location = useLocation();

    if (userLoading) {
        return <p>loading..</p>
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};


export default PrivateRoute;