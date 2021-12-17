import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Auth } from './pages/Auth';
import { Create } from './pages/Create';
import { Details } from './pages/Details';

export const useRoutes = isAuth => {
    if (isAuth) {
        return (
            <Routes>
                <Route path='/create' element={<Create />} exact />
                <Route path='/details/:id' element={<Details />} />
                <Route
                    path="*"
                    element={<Navigate to="/create" />}
                />
                {/* <Redirect to='/create' /> */}
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path='/' element={<Auth />} exact />
            <Route
                path="*"
                element={<Navigate to="/" />}
            />
            {/* <Redirect to='/' /> */}
        </Routes>
    )
}