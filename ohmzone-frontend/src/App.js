// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import HomePage from './pages/HomePage';
import RepairGuidesPage from './pages/RepairGuidesPage';
import PhoneTypeSelectionPage from './pages/PhoneTypePage';
import ModelSelectionPage from './pages/ModelSelectionPage';
import GuideTypePage from './pages/GuideTypePage';

// ‼️ Importă doar paginile de autentificare ‼️
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

function App() {
    return (
        <Router>
            <Header />

            <Routes>
                {/* Flow-urile existente de pe site */}
                <Route path="/" element={<HomePage />} />
                <Route path="/repair-guides" element={<RepairGuidesPage />} />
                <Route path="/repair-guides/phone" element={<PhoneTypeSelectionPage />} />
                <Route path="/repair-guides/phone/:phoneType" element={<ModelSelectionPage />} />
                <Route path="/repair-guides/phone/:phoneType/:model" element={<GuideTypePage />} />

                {/* Rutele de autentificare, fără forum */}
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>

            <Footer />
        </Router>
    );
}

export default App;
