import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import LoginForm from './components/LoginForm';
import CompanyLoginPage from './pages/company/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import CompanyRegistrationPage from './pages/CompanyRegistrationPage';
import CampaignsPage from './pages/CampaignsPage';
import CampaignDetailPage from './pages/CampaignDetailPage';
import CampaignManagementPage from './pages/CampaignManagementPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import MessagesPage from './pages/MessagesPage';
import EarningsPage from './pages/EarningsPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import RegistrationGuidePage from './pages/guide/RegistrationGuidePage';
import EarningsGuidePage from './pages/guide/EarningsGuidePage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ContactPage from './pages/ContactPage';
import CompanyRegistrationGuidePage from './pages/company/RegistrationGuidePage';
import CompanyDashboardPage from './pages/company/DashboardPage';
import CompanyCampaignManagementPage from './pages/company/CampaignManagementPage';
import CompanySettingsPage from './pages/company/SettingsPage';
import CompanyProfilePage from './pages/company/ProfilePage';
import PostCampaignPage from './pages/company/PostCampaignPage';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollToTop />
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 w-full overflow-x-hidden">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/company/login" element={<CompanyLoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/company/register" element={<CompanyRegistrationPage />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/campaigns/:id" element={<CampaignDetailPage />} />

            {/* Information Pages */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/guide/registration" element={<RegistrationGuidePage />} />
            <Route path="/guide/earnings" element={<EarningsGuidePage />} />
            <Route path="/company/guide" element={<CompanyRegistrationGuidePage />} />

            {/* Influencer Private Routes */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            } />
            <Route path="/campaign-management" element={
              <PrivateRoute>
                <CampaignManagementPage />
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            } />
            <Route path="/messages" element={
              <PrivateRoute>
                <MessagesPage />
              </PrivateRoute>
            } />
            <Route path="/messages/:chatId" element={
              <PrivateRoute>
                <MessagesPage />
              </PrivateRoute>
            } />
            <Route path="/earnings" element={
              <PrivateRoute>
                <EarningsPage />
              </PrivateRoute>
            } />
            <Route path="/settings" element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            } />

            {/* Company Private Routes */}
            <Route path="/company/dashboard" element={
              <PrivateRoute>
                <CompanyDashboardPage />
              </PrivateRoute>
            } />
            <Route path="/company/campaigns" element={
              <PrivateRoute>
                <CompanyCampaignManagementPage />
              </PrivateRoute>
            } />
            <Route path="/company/post" element={
              <PrivateRoute>
                <PostCampaignPage />
              </PrivateRoute>
            } />
            <Route path="/company/profile" element={
              <PrivateRoute>
                <CompanyProfilePage />
              </PrivateRoute>
            } />
            <Route path="/company/settings" element={
              <PrivateRoute>
                <CompanySettingsPage />
              </PrivateRoute>
            } />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;