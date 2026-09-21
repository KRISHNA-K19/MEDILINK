import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Cross, Lock, Mail, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Please enter your email address and password.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Login failed. Please check credentials.');
      }

      // Save token and user role
      if (result.data?.session?.access_token) {
        localStorage.setItem('medilink_token', result.data.session.access_token);
        localStorage.setItem('medilink_user', JSON.stringify(result.data.user));
      }

      const role = result.data?.user?.role || 'PATIENT';
      if (role === 'PATIENT') navigate('/patient/dashboard');
      else if (role === 'PHARMACY') navigate('/pharmacy/dashboard');
      else if (role === 'ADMIN') navigate('/admin/dashboard');
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed.');
    } finally {
      setIsLoading(false);
    }
  };

  // Demo account quick login helpers
  const setDemoAccount = (role: 'PATIENT' | 'PHARMACY' | 'ADMIN') => {
    if (role === 'PATIENT') {
      setEmail('patient@demo.medilink.local');
      setPassword('DemoPatient123!');
    } else if (role === 'PHARMACY') {
      setEmail('apollo@demo.medilink.local');
      setPassword('DemoPharmacy123!');
    } else if (role === 'ADMIN') {
      setEmail('admin@demo.medilink.local');
      setPassword('DemoAdmin123!');
    }
  };

  return (
    <div className="min-h-screen bg-medilink-surface flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-medilink-navy text-medilink-tealLight flex items-center justify-center mx-auto shadow-sm">
              <Cross className="w-6 h-6 rotate-45" />
            </div>
            <h1 className="text-2xl font-extrabold text-medilink-navy font-heading">Sign In to MediLink</h1>
            <p className="text-xs text-medilink-muted">Access your medicine discovery & reservation dashboard</p>
          </div>

          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-medilink-danger flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="flex items-center justify-between text-xs">
                <Link to="/forgot-password" className="text-medilink-teal font-semibold hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <Button type="submit" variant="primary" className="w-full py-2.5" isLoading={isLoading}>
                Sign In
              </Button>
            </form>

            {/* Quick Demo Credentials Assistant */}
            <div className="mt-6 pt-4 border-t border-medilink-border text-center space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-medilink-muted">Quick Demo Login Shortcuts</p>
              <div className="flex justify-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setDemoAccount('PATIENT')}
                  className="px-2.5 py-1 rounded bg-teal-50 text-medilink-teal border border-teal-200 font-medium hover:bg-teal-100"
                >
                  Patient Demo
                </button>
                <button
                  type="button"
                  onClick={() => setDemoAccount('PHARMACY')}
                  className="px-2.5 py-1 rounded bg-sky-50 text-sky-700 border border-sky-200 font-medium hover:bg-sky-100"
                >
                  Pharmacy Demo
                </button>
                <button
                  type="button"
                  onClick={() => setDemoAccount('ADMIN')}
                  className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-300 font-medium hover:bg-slate-200"
                >
                  Admin Demo
                </button>
              </div>
            </div>
          </Card>

          <p className="text-center text-xs text-medilink-muted">
            Don't have an account?{' '}
            <Link to="/register" className="text-medilink-teal font-bold hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
