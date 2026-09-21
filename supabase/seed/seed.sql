-- ============================================================
-- MEDILINK DEMO SEED DATA (Valid Hexadecimal UUIDs)
-- ============================================================

-- Clean existing seed data
TRUNCATE TABLE public.notifications, public.prescriptions, public.reservations, public.medicines, public.pharmacies, public.activity_logs, public.system_settings, public.users CASCADE;

-- Insert System Settings
INSERT INTO public.system_settings (key, value) VALUES
('reservation_expiry_hours', '24'::jsonb),
('platform_name', '"MediLink"'::jsonb);

-- Insert Users (Admin, Pharmacies, Patients)
INSERT INTO public.users (id, full_name, email, phone, role, account_status) VALUES
('11111111-1111-1111-1111-111111111111', 'MediLink System Admin', 'admin@demo.medilink.local', '+1-800-555-0100', 'ADMIN', 'ACTIVE'),
('22222222-2222-2222-2222-222222222222', 'Apollo Community Pharmacy Lead', 'apollo@demo.medilink.local', '+1-800-555-0200', 'PHARMACY', 'ACTIVE'),
('33333333-3333-3333-3333-333333333333', 'MedPlus Wellness Pharmacy Lead', 'medplus@demo.medilink.local', '+1-800-555-0300', 'PHARMACY', 'ACTIVE'),
('44444444-4444-4444-4444-444444444444', 'CareFirst Pharmacy Lead (Pending)', 'carefirst@demo.medilink.local', '+1-800-555-0400', 'PHARMACY', 'ACTIVE'),
('55555555-5555-5555-5555-555555555555', 'Sarah Jenkins', 'patient@demo.medilink.local', '+1-800-555-0500', 'PATIENT', 'ACTIVE'),
('66666666-6666-6666-6666-666666666666', 'Michael Chang', 'mchang@demo.medilink.local', '+1-800-555-0600', 'PATIENT', 'ACTIVE');

-- Insert Pharmacies (Valid Hex UUIDs: a1111111, b2222222, f3333333)
INSERT INTO public.pharmacies (id, user_id, pharmacy_name, license_number, address, city, state, postal_code, phone, email, verification_status, verified_at) VALUES
('a1111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'Apollo Community Pharmacy', 'PH-LIC-2026-001', '104 Healthcare Boulevard', 'Chennai', 'TN', '600001', '+1-800-555-0200', 'apollo@demo.medilink.local', 'VERIFIED', NOW() - INTERVAL '30 days'),
('b2222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', 'MedPlus Wellness Pharmacy', 'PH-LIC-2026-002', '55 Park Street, Sector 4', 'Bengaluru', 'KA', '560001', '+1-800-555-0300', 'medplus@demo.medilink.local', 'VERIFIED', NOW() - INTERVAL '15 days'),
('f3333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', 'CareFirst Express Pharmacy', 'PH-LIC-2026-003', '12 Station Road', 'Mumbai', 'MH', '400001', '+1-800-555-0400', 'carefirst@demo.medilink.local', 'PENDING', NULL);

-- Insert Medicines (Valid Hex UUIDs starting with c1111111, c2222222, c3333333, c4444444, c5555555)
INSERT INTO public.medicines (id, pharmacy_id, name, generic_name, description, category, requires_prescription, availability, internal_stock_qty) VALUES
('c1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 'Paracetamol 500mg', 'Paracetamol / Acetaminophen', 'Fast effective relief from mild to moderate fever and muscle pain.', 'Analgesic', FALSE, 'AVAILABLE', 120),
('c2222222-2222-2222-2222-222222222222', 'a1111111-1111-1111-1111-111111111111', 'Amoxicillin 500mg Capsules', 'Amoxicillin Trihydrate', 'Broad spectrum antibiotic used to treat bacterial infections.', 'Antibiotics', TRUE, 'LIMITED', 15),
('c3333333-3333-3333-3333-333333333333', 'b2222222-2222-2222-2222-222222222222', 'Metformin 850mg Tablets', 'Metformin Hydrochloride', 'First-line medication for the treatment of type 2 diabetes.', 'Diabetes Care', TRUE, 'AVAILABLE', 85),
('c4444444-4444-4444-4444-444444444444', 'b2222222-2222-2222-2222-222222222222', 'Atorvastatin 20mg Tablets', 'Atorvastatin Calcium', 'Lowers cholesterol levels and helps reduce heart disease risk.', 'Cardiology', TRUE, 'UNAVAILABLE', 0),
('c5555555-5555-5555-5555-555555555555', 'a1111111-1111-1111-1111-111111111111', 'Cetirizine 10mg Allergy Relief', 'Cetirizine Hydrochloride', 'Non-drowsy antihistamine for seasonal allergy symptoms.', 'Allergy', FALSE, 'AVAILABLE', 200);

-- Insert Sample Reservations (Valid Hex UUIDs starting with d1111111, d2222222, d3333333)
INSERT INTO public.reservations (id, reservation_number, patient_id, pharmacy_id, medicine_id, status, expires_at, created_at) VALUES
('d1111111-1111-1111-1111-111111111111', 'RES-2026-8801', '55555555-5555-5555-5555-555555555555', 'a1111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', 'APPROVED', NOW() + INTERVAL '18 hours', NOW() - INTERVAL '2 hours'),
('d2222222-2222-2222-2222-222222222222', 'RES-2026-8802', '55555555-5555-5555-5555-555555555555', 'a1111111-1111-1111-1111-111111111111', 'c2222222-2222-2222-2222-222222222222', 'PENDING', NOW() + INTERVAL '22 hours', NOW() - INTERVAL '30 minutes'),
('d3333333-3333-3333-3333-333333333333', 'RES-2026-8803', '66666666-6666-6666-6666-666666666666', 'b2222222-2222-2222-2222-222222222222', 'c3333333-3333-3333-3333-333333333333', 'PENDING', NOW() + INTERVAL '12 hours', NOW() - INTERVAL '1 hour');

-- Insert Notifications
INSERT INTO public.notifications (user_id, type, title, message, is_read) VALUES
('55555555-5555-5555-5555-555555555555', 'RESERVATION_APPROVED', 'Reservation Approved!', 'Apollo Community Pharmacy approved your reservation RES-2026-8801 for Paracetamol 500mg.', FALSE),
('22222222-2222-2222-2222-222222222222', 'NEW_RESERVATION', 'New Reservation Request', 'Patient Sarah Jenkins submitted reservation RES-2026-8802 requiring prescription review.', FALSE),
('11111111-1111-1111-1111-111111111111', 'PHARMACY_REGISTRATION', 'Pharmacy Pending Verification', 'CareFirst Express Pharmacy submitted registration documents for review.', FALSE);
