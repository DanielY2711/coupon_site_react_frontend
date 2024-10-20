// src/App.js
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Coupons from './Coupons';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/coupons" element={<Coupons />} />
                {/* Add more routes here as needed */}
            </Routes>
        </Router>
    );
};

export default App;
