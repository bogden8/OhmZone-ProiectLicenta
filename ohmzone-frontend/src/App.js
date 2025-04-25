import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RepairGuidesPage from './pages/RepairGuidesPage';
import RepairGuidesList from './RepairGuidesList';
import BrandSelectionPage from "./pages/BrandSelectionPage";
import ModelSelectionPage from "./pages/ModelSelectionPage";
import GuideTypePage from "./pages/GuideTypePage";
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/repair-guides" element={<RepairGuidesPage />} />
                <Route path="/repair-guides/:category" element={<BrandSelectionPage />} />
                <Route path="/repair-guides/:category/:brand" element={<ModelSelectionPage />} />
                <Route path="/repair-guides/:category/:brand/:model" element={<GuideTypePage />} />
                <Route path="/guides/:category" element={<RepairGuidesList />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
