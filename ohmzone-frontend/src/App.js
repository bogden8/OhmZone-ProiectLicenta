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
import SearchPage from './pages/SearchPage';
import MyPostsPage from './pages/MyPostsPage';
import FavoriteGuidesPage from './pages/FavoriteGuidesPage';
import ScrollToTop from './components/layout/ScrollToTop';
import RightToRepairPage from './pages/RightToRepairPage';
function App() {
    return (
        <Router>
            <ScrollToTop /> 
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                    <Routes>
                        {/* Public Pages */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/search" element={<SearchPage />} />

                        {/* Repair Guides */}
                        <Route path="/repair-guides" element={<RepairGuidesPage />} />
                        <Route path="/repair-guides/:categorySlug" element={<SubcategoryPage />} />
                        <Route path="/repair-guides/:categorySlug/:subcategorySlug" element={<BrandSelectionPage />} />
                        <Route path="/repair-guides/:categorySlug/:subcategorySlug/:brandSlug" element={<ModelSelectionPage />} />
                        <Route path="/repair-guides/:categorySlug/:subcategorySlug/:brandSlug/:deviceSlug" element={<GuideTypePage />} />
                        <Route path="/guides/view/:guideId" element={<ViewGuideStepsPage />} />
                        <Route path="/favorites" element={<FavoriteGuidesPage />} />
                        <Route path="/right-to-repair" element={<RightToRepairPage />} />
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
                        <Route path="/forum/myposts" element={<MyPostsPage />} /> {/* ✅ Adăugat */}

                        {/* Admin Only */}
                        <Route path="/admin/guides/full-create" element={<AddGuidePage />} />
                        <Route path="/admin/guides/:id/edit" element={<EditGuidePage />} />
                        <Route path="/admin/guides/:guideId/steps/add" element={<AddStepPage />} />
                        <Route
                            path="/admin/guides/:guideId/steps"
                            element={
                                <PrivateRoute allowedRoles={['Admin']}>
                                    <ViewGuideStepsPage />
                                </PrivateRoute>
                            }
                        />

                        {/* Authentication */}
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
