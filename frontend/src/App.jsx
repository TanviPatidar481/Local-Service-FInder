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
import Login from "./pages/onboarding/Login";

// Provider dashboard
import DashboardShell from "./components/layout/DashboardShell";
import Overview      from "./pages/dashboard/Overview";
import Bookings      from "./pages/dashboard/Bookings";
import Availability  from "./pages/dashboard/Availability";
import Messages      from "./pages/dashboard/Messages";
import Reviews       from "./pages/dashboard/Reviews";
import Settings      from "./pages/dashboard/Settings";

// User dashboard
import UserDashboardShell from "./components/layout/UserDashboardShell";
import UserDashboard  from "./pages/dashboard/UserDashboard";
import Explore        from "./pages/dashboard/Explore";
import UserBookings   from "./pages/dashboard/UserBookings";
import UserMessages   from "./pages/dashboard/UserMessages";
import UserProfile    from "./pages/dashboard/UserProfile";

// Public provider marketplace pages
import ProvidersList          from "./pages/providers/ProvidersList";
import ProviderPublicProfile  from "./pages/providers/ProviderPublicProfile";
import ProfilePage            from "./pages/ProfilePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Onboarding */}
        <Route path="/" element={<OnboardingChoice />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding/user-signup"           element={<UserSignup />} />
        <Route path="/onboarding/user-verify-email"     element={<UserVerifyEmail />} />
        <Route path="/onboarding/user-profile-setup"    element={<UserProfileSetup />} />
        <Route path="/onboarding/business-signup"       element={<BusinessSignup />} />
        <Route path="/onboarding/business-verify-email" element={<BusinessVerifyEmail />} />
        <Route path="/onboarding/business-category"     element={<BusinessCategory />} />
        <Route path="/onboarding/business-basic-info"   element={<BusinessBasicInfo />} />
        <Route path="/onboarding/business-location"     element={<BusinessLocation />} />

        {/* User Dashboard */}
        <Route path="/user" element={<UserDashboardShell />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home"     element={<UserDashboard />} />
          <Route path="explore"  element={<Explore />} />
          <Route path="bookings" element={<UserBookings />} />
          <Route path="messages" element={<UserMessages />} />
          <Route path="profile"      element={<UserProfile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Legacy /dashboard redirect */}
        <Route path="/dashboard" element={<Navigate to="/user/home" replace />} />

        {/* Public provider marketplace — listing + read-only profile */}
        <Route path="/providers"     element={<ProvidersList />} />
        <Route path="/providers/:id" element={<ProviderPublicProfile />} />

        {/* Legacy provider profile routes — full design */}
        <Route path="/provider/:id/view" element={<ProfilePage />} />
        <Route path="/provider/:id"      element={<ProfilePage />} />

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
