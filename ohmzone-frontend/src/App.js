import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RepairGuidesPage from './pages/RepairGuidesPage';
import RepairGuidesList from './RepairGuidesList';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/repair-guides" element={<RepairGuidesPage />} />
                <Route path="/guides/:category" element={<RepairGuidesList />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
