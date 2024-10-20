// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Coupons from './Coupons'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element = {<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                {/* Add more routes here as needed */}
                <Route path="/coupons" element={<Coupons/>} />
            </Routes>
        </Router>
    );
};

export default App;
