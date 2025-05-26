import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import HomePage from './pages/HomePage';
import RepairGuidesPage from './pages/RepairGuidesPage';
import SubcategoryPage from './pages/SubcategorySelectionPage';
import ModelSelectionPage from './pages/ModelSelectionPage';
import GuideTypePage from './pages/GuideTypePage';
import RoboticsPage from './pages/RoboticsPage';
import { AddTutorialPage } from './pages/AddTutorialPage';
import { AddProjectPage } from './pages/AddProjectPage';
import PrivateRoute from './components/PrivateRoute';
import ForumPage from './pages/ForumPage';
import ForumAskPage from './pages/ForumAskPage';
import ForumPostPage from './pages/ForumPostPage';
import AddStepPage from './pages/AddStepPage';
import ViewGuideStepsPage from './pages/ViewGuideStepsPage';
import AddGuidePage from './pages/AddGuidePage';
import BrandSelectionPage from './pages/BrandSelectionPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import EditGuidePage from './pages/EditGuidePage';
import RoboticsTutorialPage from './pages/RoboticsTutorialPage';
import EditTutorialPage from './pages/EditTutorialPage';
function App() {
    return (
        <Router>
            <Header />

            <Routes>
                {/* Public Pages */}
                <Route path="/" element={<HomePage />} />

                {/* Repair Guides */}
                <Route path="/repair-guides" element={<RepairGuidesPage />} />
                <Route path="/repair-guides/:categorySlug" element={<SubcategoryPage />} />
                <Route path="/repair-guides/:categorySlug/:subcategorySlug" element={<BrandSelectionPage />} />
                <Route path="/repair-guides/:categorySlug/:subcategorySlug/:brandSlug" element={<ModelSelectionPage />} />
                <Route path="/repair-guides/:categorySlug/:subcategorySlug/:brandSlug/:deviceSlug" element={<GuideTypePage />} />
                <Route path="/guides/view/:guideId" element={<ViewGuideStepsPage />} />

                {/* Robotics */}
                <Route path="/robotics" element={<RoboticsPage />} />
                <Route path="/robotics/new-tutorial" element={<AddTutorialPage />} />
                <Route path="/robotics/new-project" element={<AddProjectPage />} />
                <Route path="/robotics/:id" element={<RoboticsTutorialPage />} />
                <Route path="/robotics/edit/:id" element={<EditTutorialPage />} />
                {/* Forum */}
                <Route path="/forum" element={<ForumPage />} />
                <Route path="/forum/ask" element={<ForumAskPage />} />
                <Route path="/forum/post/:id" element={<ForumPostPage />} />

                {/* Admin Only */}
                <Route path="/admin/guides/full-create" element={<AddGuidePage />} />
                <Route path="/admin/guides/:id/edit" element={<EditGuidePage />} />
                <Route path="/admin/guides/:guideId/steps/add" element={<AddStepPage />} />
                <Route path="/admin/guides/:guideId/steps" element={
                    <PrivateRoute allowedRoles={['Admin']}>
                        <ViewGuideStepsPage />
                    </PrivateRoute>
                } />

                {/* Authentication */}
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>

            <Footer />
        </Router>
    );
}

export default App;
