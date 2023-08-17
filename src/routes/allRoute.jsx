import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "../components/homepage/home";
import PrivateRoute from './privateRoute';
import Login from '../components/authentication/Login';
import Register from '../components/authentication/register';

const AllRoute = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                } />
                <Route path='login' element={<Login/>}/> 
                <Route path='signup' element={<Register/>}/>    
            </Routes>
        </div>
    )
}

export default AllRoute