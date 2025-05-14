import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import HomePage from './pages/HomePage';
import RepairGuidesPage from './pages/RepairGuidesPage';
import PhoneTypeSelectionPage from './pages/PhoneTypePage';
import ModelSelectionPage from './pages/ModelSelectionPage';
import GuideTypePage from './pages/GuideTypePage';
import RoboticsPage from './pages/RoboticsPage';
import { AddTutorialPage } from './pages/AddTutorialPage';
import { AddProjectPage } from './pages/AddProjectPage';
import EditRepairGuide from './pages/EditRepairGuide';
import PrivateRoute from './components/PrivateRoute';
import AddRepairGuidePage from './pages/AddRepairGuidePage';
import ForumPage from './pages/ForumPage';
import ForumAskPage from './pages/ForumAskPage';
import ForumPostPage from './pages/ForumPostPage';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

function App() {
    return (
        <Router>
            <Header />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/repair-guides" element={<RepairGuidesPage />} />
                <Route path="/repair-guides/phone" element={<PhoneTypeSelectionPage />} />
                <Route path="/repair-guides/phone/:phoneType" element={<ModelSelectionPage />} />
                <Route path="/repair-guides/phone/:phoneType/:model" element={<GuideTypePage />} />
                <Route path="/robotics" element={<RoboticsPage />} />
                <Route path="/robotics/new-tutorial" element={<AddTutorialPage />} />
                <Route path="/robotics/new-project" element={<AddProjectPage />} />
                <Route path="/forum" element={<ForumPage />} />
                <Route path="/forum/ask" element={<ForumAskPage />} />
                <Route path="/forum/post/:id" element={<ForumPostPage />} />

                <Route path="/admin/guides/:id/edit" element={
                    <PrivateRoute allowedRoles={['Admin']}>
                        <EditRepairGuide />
                    </PrivateRoute>
                } />

                <Route
                    path="/admin/guides/new"
                    element={<AddRepairGuidePage />}
                />

                
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>

            <Footer />
        </Router>
    );
}

export default App;