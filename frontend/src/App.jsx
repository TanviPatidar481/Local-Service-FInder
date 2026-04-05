import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OnboardingChoice from "./pages/onboarding/OnboardingChoice";
import UserSignup from "./pages/onboarding/UserSignup";
import UserVerifyEmail from "./pages/onboarding/UserVerifyEmail";
import UserProfileSetup from "./pages/onboarding/UserProfileSetup";
import BusinessSignup from "./pages/onboarding/BusinessSignup";
import BusinessVerifyEmail from "./pages/onboarding/BusinessVerifyEmail";
import BusinessCategory from "./pages/onboarding/BusinessCategory";
import BusinessBasicInfo from "./pages/onboarding/BusinessBasicInfo";
import BusinessLocation from "./pages/onboarding/BusinessLocation";
import BusinessDocuments from "./pages/onboarding/BusinessDocuments";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OnboardingChoice />} />

        <Route path="/onboarding/user-signup" element={<UserSignup />} />
        <Route path="/onboarding/user-verify-email" element={<UserVerifyEmail />} />
        <Route path="/onboarding/user-profile-setup" element={<UserProfileSetup />} />

        <Route path="/onboarding/business-signup" element={<BusinessSignup />} />
        <Route path="/onboarding/business-verify-email" element={<BusinessVerifyEmail />} />
        <Route path="/onboarding/business-category" element={<BusinessCategory />} />
        <Route path="/onboarding/business-basic-info" element={<BusinessBasicInfo />} />
        <Route path="/onboarding/business-location" element={<BusinessLocation />} />
        <Route path="/onboarding/business-documents" element={<BusinessDocuments />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;