import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Public Pages
import { LandingPage } from '@/pages/public/landing';
import { HowItWorksPage } from '@/pages/public/how-it-works';
import { ForPharmaciesPage } from '@/pages/public/for-pharmacies';
import { LoginPage } from '@/pages/auth/login';
import { RegisterPage } from '@/pages/auth/register';

// Patient Pages
import { PatientDashboard } from '@/pages/patient/dashboard';
import { PatientSearchPage } from '@/pages/patient/search';
import { ReservationWizardPage } from '@/pages/patient/reserve-wizard';
import { PatientReservationsPage } from '@/pages/patient/reservations';
import { PatientReservationDetailsPage } from '@/pages/patient/reservation-details';
import { PatientNotificationsPage } from '@/pages/patient/notifications';
import { PatientProfilePage } from '@/pages/patient/profile';

// Pharmacy Pages
import { PharmacyVerificationPage } from '@/pages/pharmacy/verification';
import { PharmacyInventoryPage } from '@/pages/pharmacy/inventory';
import { PharmacyReservationsPage } from '@/pages/pharmacy/reservations';
import { PharmacyReservationDetailsPage } from '@/pages/pharmacy/reservation-details';
import { PharmacyReportsPage } from '@/pages/pharmacy/reports';
import { PharmacyNotificationsPage } from '@/pages/pharmacy/notifications';
import { PharmacyProfilePage } from '@/pages/pharmacy/profile';

// Admin Pages
import { AdminDashboard } from '@/pages/admin/dashboard';
import { AdminPharmaciesPage } from '@/pages/admin/pharmacies';
import { AdminUsersPage } from '@/pages/admin/users';
import { AdminReservationsPage } from '@/pages/admin/reservations';
import { AdminActivityPage } from '@/pages/admin/activity';
import { AdminStatisticsPage } from '@/pages/admin/statistics';
import { AdminSettingsPage } from '@/pages/admin/settings';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Marketing Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/for-pharmacies" element={<ForPharmaciesPage />} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Patient Routes */}
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/patient/search" element={<PatientSearchPage />} />
        <Route path="/patient/reserve" element={<ReservationWizardPage />} />
        <Route path="/patient/reservations" element={<PatientReservationsPage />} />
        <Route path="/patient/reservations/:id" element={<PatientReservationDetailsPage />} />
        <Route path="/patient/notifications" element={<PatientNotificationsPage />} />
        <Route path="/patient/profile" element={<PatientProfilePage />} />

        {/* Pharmacy Routes */}
        <Route path="/pharmacy/dashboard" element={<PharmacyVerificationPage />} />
        <Route path="/pharmacy/verification" element={<PharmacyVerificationPage />} />
        <Route path="/pharmacy/inventory" element={<PharmacyInventoryPage />} />
        <Route path="/pharmacy/reservations" element={<PharmacyReservationsPage />} />
        <Route path="/pharmacy/reservations/:id" element={<PharmacyReservationDetailsPage />} />
        <Route path="/pharmacy/reports" element={<PharmacyReportsPage />} />
        <Route path="/pharmacy/notifications" element={<PharmacyNotificationsPage />} />
        <Route path="/pharmacy/profile" element={<PharmacyProfilePage />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/pharmacies" element={<AdminPharmaciesPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/reservations" element={<AdminReservationsPage />} />
        <Route path="/admin/activity" element={<AdminActivityPage />} />
        <Route path="/admin/statistics" element={<AdminStatisticsPage />} />
        <Route path="/admin/settings" element={<AdminSettingsPage />} />

        {/* Catch-all redirect to Landing Page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
