import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import RepairGuidesPage from './pages/RepairGuidesPage';
import PhoneTypeSelectionPage from './pages/PhoneTypePage';
import ModelSelectionPage from './pages/ModelSelectionPage';
import GuideTypePage from './pages/GuideTypePage';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/repair-guides" element={<RepairGuidesPage />} />
                <Route path="/repair-guides/phone" element={<PhoneTypeSelectionPage />} />
                <Route
                    path="/repair-guides/phone/:phoneType"
                    element={<ModelSelectionPage />}
                />
                <Route
                    path="/repair-guides/phone/:phoneType/:model"
                    element={<GuideTypePage />}
                />
                {/* other category flows would be analogous */}
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
