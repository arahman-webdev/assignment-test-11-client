import React, { useContext } from 'react';
import { AuthContext } from '../../Auth/AuthProvider';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const PrivateLayout = ({children}) => {
    
    const location = useLocation()
    const navigate = useNavigate()
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
        navigate("/login", {state: {from: location}})
    );
};

export default PrivateLayout;