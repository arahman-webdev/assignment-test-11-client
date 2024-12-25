import React, { useContext } from 'react';
import { AuthContext } from '../../Auth/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateLayout = ({children}) => {
    
    const location = useLocation()
    console.log(location)

    const {user, loading} = useContext(AuthContext)

    if(loading){
        return <div className="min-h-screen items-center justify-center flex">
            <span className="loading bg-[#0d81fd] loading-bars loading-lg"></span>
        </div>
    }


    if(user){
        return children
    }


    return (
        <Navigate to='/login' state={location.pathname}>
            
        </Navigate>
    );
};

export default PrivateLayout;