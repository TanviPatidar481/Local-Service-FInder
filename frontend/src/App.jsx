import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import OnboardingChoice from "./pages/onboarding/OnboardingChoice";
import UserSignup from "./pages/onboarding/UserSignup";
import UserVerifyEmail from "./pages/onboarding/UserVerifyEmail";
import UserProfileSetup from "./pages/onboarding/UserProfileSetup";
import BusinessSignup from "./pages/onboarding/BusinessSignup";
import BusinessVerifyEmail from "./pages/onboarding/BusinessVerifyEmail";
import BusinessCategory from "./pages/onboarding/BusinessCategory";
import BusinessBasicInfo from "./pages/onboarding/BusinessBasicInfo";
import BusinessLocation from "./pages/onboarding/BusinessLocation";

// User dashboard
import Dashboard from "./pages/dashboard/Dashboard";

// Public provider profile — no sidebar, accessible by anyone
import ProviderPublicProfile from "./pages/provider-public/ProviderPublicProfile";

// Provider dashboard — operations only (profile/services live on public profile)
import DashboardShell from "./pages/provider-dashboard/layout/DashboardShell";
import Overview      from "./pages/provider-dashboard/pages/Overview";
import Bookings      from "./pages/provider-dashboard/pages/Bookings";
import Availability  from "./pages/provider-dashboard/pages/Availability";
import Messages      from "./pages/provider-dashboard/pages/Messages";
import Reviews       from "./pages/provider-dashboard/pages/Reviews";
import Settings      from "./pages/provider-dashboard/pages/Settings";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Onboarding */}
        <Route path="/" element={<OnboardingChoice />} />
        <Route path="/onboarding/user-signup"           element={<UserSignup />} />
        <Route path="/onboarding/user-verify-email"     element={<UserVerifyEmail />} />
        <Route path="/onboarding/user-profile-setup"    element={<UserProfileSetup />} />
        <Route path="/onboarding/business-signup"       element={<BusinessSignup />} />
        <Route path="/onboarding/business-verify-email" element={<BusinessVerifyEmail />} />
        <Route path="/onboarding/business-category"     element={<BusinessCategory />} />
        <Route path="/onboarding/business-basic-info"   element={<BusinessBasicInfo />} />
        <Route path="/onboarding/business-location"     element={<BusinessLocation />} />

        {/* User Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Public provider profile — single route, role-based view/edit */}
        <Route path="/provider/:id/view" element={<ProviderPublicProfile />} />
        <Route path="/provider/:id"      element={<ProviderPublicProfile />} />

        {/* Provider Dashboard — operations only, profile/services on public profile */}
        <Route path="/provider" element={<DashboardShell />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview"     element={<Overview />} />
          <Route path="bookings"     element={<Bookings />} />
          <Route path="availability" element={<Availability />} />
          <Route path="messages"     element={<Messages />} />
          <Route path="reviews"      element={<Reviews />} />
          <Route path="settings"     element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
