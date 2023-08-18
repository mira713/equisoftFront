import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "../components/homepage/home";
import PrivateRoute from './privateRoute';
import Task from '../components/task/tasks'
import Login from '../components/authentication/Login';
import Register from '../components/authentication/register';
import Create from '../components/task/create';
import Update from '../components/task/update'

const AllRoute = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                } />
                <Route path="/tasks" element={
                    <PrivateRoute>
                        <Task />
                    </PrivateRoute>
                } />
                <Route path="/create" element={
                    <PrivateRoute>
                        <Create />
                    </PrivateRoute>
                } />
                <Route path="/update/:id" element={
                    <PrivateRoute>
                        <Update />
                    </PrivateRoute>
                } />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Register />} />
            </Routes>
        </div>
    )
}

export default AllRoute