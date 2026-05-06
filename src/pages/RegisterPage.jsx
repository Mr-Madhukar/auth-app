import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';
import toast from 'react-hot-toast';
import { UserPlus, Mail, Lock, User, Shield, ArrowRight, Sparkles } from 'lucide-react';

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'ADMIN',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username.trim() || !form.email.trim() || !form.password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await registerUser(form);
      toast.success('Account created successfully! 🎉');
      navigate('/login', { replace: true });
    } catch (err) {
      const msg =
        err.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-pattern relative overflow-hidden">
      {/* Floating Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="w-full max-w-md page-enter relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/15 mb-5">
            <Sparkles className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Create Account</h1>
          <p className="text-text-secondary text-sm">
            Join us and get started in seconds
          </p>
        </div>

        {/* Card */}
        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="space-y-2">
              <label htmlFor="reg-username" className="text-sm font-medium text-text-secondary flex items-center gap-2">
                <User className="w-4 h-4" />
                Username
              </label>
              <div className="gradient-border rounded-xl">
                <input
                  id="reg-username"
                  name="username"
                  type="text"
                  placeholder="e.g. doejohn"
                  value={form.username}
                  onChange={handleChange}
                  className="input-field"
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="reg-email" className="text-sm font-medium text-text-secondary flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <div className="gradient-border rounded-xl">
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="input-field"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="reg-password" className="text-sm font-medium text-text-secondary flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <div className="gradient-border rounded-xl">
                <input
                  id="reg-password"
                  name="password"
                  type="password"
                  placeholder="At least 6 characters"
                  value={form.password}
                  onChange={handleChange}
                  className="input-field"
                  autoComplete="new-password"
                />
              </div>
            </div>

            {/* Role */}
            <div className="space-y-2">
              <label htmlFor="reg-role" className="text-sm font-medium text-text-secondary flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Role
              </label>
              <div className="gradient-border rounded-xl">
                <select
                  id="reg-role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="input-field cursor-pointer appearance-none"
                >
                  <option value="ADMIN">Admin</option>
                  <option value="USER">User</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary mt-2"
            >
              <span>
                {loading ? (
                  <>
                    <div className="spinner" />
                    Creating account…
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Create Account
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="mt-7 pt-6 border-t border-border text-center">
            <p className="text-text-muted text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary font-semibold hover:text-primary-hover transition-colors inline-flex items-center gap-1"
              >
                Sign in <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
