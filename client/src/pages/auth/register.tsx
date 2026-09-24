import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Cross, AlertCircle, Building2, User } from 'lucide-react';
import { apiFetch } from '@/lib/api';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'PHARMACY' ? 'PHARMACY' : 'PATIENT';

  const [role, setRole] = useState<'PATIENT' | 'PHARMACY'>(initialRole);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Pharmacy specific fields
  const [pharmacyName, setPharmacyName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName || !email || !password) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    if (role === 'PHARMACY' && (!pharmacyName || !licenseNumber || !address || !city || !state || !postalCode)) {
      setErrorMessage('Please complete all pharmacy registration details including government license number.');
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        role,
        fullName,
        email,
        phone,
        password,
        ...(role === 'PHARMACY' && {
          pharmacyName,
          licenseNumber,
          address,
          city,
          state,
          postalCode,
        }),
      };

      const result = await apiFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      // Save token and user details
      if (result.data?.session?.access_token) {
        localStorage.setItem('medilink_token', result.data.session.access_token);
        localStorage.setItem('medilink_user', JSON.stringify(result.data.user));
      }

      if (role === 'PHARMACY') {
        navigate('/pharmacy/verification');
      } else {
        navigate('/patient/dashboard');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-medilink-surface flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-6 my-8">
        <div className="w-full max-w-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-medilink-navy text-medilink-tealLight flex items-center justify-center mx-auto shadow-sm">
              <Cross className="w-6 h-6 rotate-45" />
            </div>
            <h1 className="text-2xl font-extrabold text-medilink-navy font-heading">Create MediLink Account</h1>
            <p className="text-xs text-medilink-muted">Join the verified medicine discovery & qualitative reservation network</p>
          </div>

          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-medilink-danger flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Role Selector Tabs */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-medilink-text uppercase tracking-wider">Account Role</label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-medilink-surface rounded-xl border border-medilink-border">
                  <button
                    type="button"
                    onClick={() => setRole('PATIENT')}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                      role === 'PATIENT' ? 'bg-white text-medilink-navy shadow-xs border border-medilink-border' : 'text-medilink-muted'
                    }`}
                  >
                    <User className="w-4 h-4 text-medilink-teal" />
                    <span>Patient Account</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('PHARMACY')}
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                      role === 'PHARMACY' ? 'bg-white text-medilink-navy shadow-xs border border-medilink-border' : 'text-medilink-muted'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-medilink-teal" />
                    <span>Pharmacy Account</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name / Primary Contact"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <Input
                  label="Phone Number"
                  placeholder="+1 (800) 555-0199"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {/* Pharmacy Specific Fields */}
              {role === 'PHARMACY' && (
                <div className="pt-4 border-t border-medilink-border space-y-4 animate-in fade-in duration-200">
                  <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg text-xs text-medilink-teal font-medium">
                    Pharmacy registrations require admin approval of government license credentials before becoming active.
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Pharmacy Legal Name"
                      placeholder="Apollo Community Pharmacy"
                      value={pharmacyName}
                      onChange={(e) => setPharmacyName(e.target.value)}
                      required
                    />
                    <Input
                      label="Government License Number"
                      placeholder="PH-LIC-2026-9900"
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value)}
                      required
                    />
                  </div>

                  <Input
                    label="Street Address"
                    placeholder="104 Healthcare Boulevard"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />

                  <div className="grid grid-cols-3 gap-3">
                    <Input label="City" placeholder="Chennai" value={city} onChange={(e) => setCity(e.target.value)} required />
                    <Input label="State" placeholder="TN" value={state} onChange={(e) => setState(e.target.value)} required />
                    <Input label="Postal Code" placeholder="600001" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                  </div>
                </div>
              )}

              <Button type="submit" variant="primary" className="w-full py-2.5 mt-2" isLoading={isLoading}>
                {role === 'PHARMACY' ? 'Submit Pharmacy Application' : 'Create Patient Account'}
              </Button>
            </form>
          </Card>

          <p className="text-center text-xs text-medilink-muted">
            Already have an account?{' '}
            <Link to="/login" className="text-medilink-teal font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
