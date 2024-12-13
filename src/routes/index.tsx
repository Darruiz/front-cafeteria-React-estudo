import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/public/Home';
import { About } from '../pages/public/About';
import { NotFound } from '../pages/public/NotFound';
import Login from '../pages/auth/Login';
import { Header } from '../components/bases/Header';

export function AppRoutes() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}