import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useUser from '../hook/useUser';
import Loaded from '../Shared items/Loaded/Loaded';


const PrivateRoute = ({ children }) => {
    const data = JSON.parse(localStorage.getItem('user'))
    const { user, userLoading } = useUser(data);
    const location = useLocation();

    if (userLoading) {
        return <Loaded />
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};


export default PrivateRoute;