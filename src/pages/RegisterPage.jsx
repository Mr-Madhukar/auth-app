import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';
import toast from 'react-hot-toast';
import { UserPlus, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
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
    <div className="min-h-screen flex items-center justify-center p-6 bg-pattern relative overflow-hidden">
      {/* Floating Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="w-full max-w-md page-enter relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 mb-6 ring-1 ring-white/10 shadow-lg">
            <Sparkles className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-accent via-primary to-accent bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]">
            Create Account
          </h1>
          <p className="text-text-secondary text-base">
            Join us and get started in seconds
          </p>
        </div>

        {/* Card */}
        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Username */}
            <div className="form-group">
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
            <div className="form-group">
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
            <div className="form-group">
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary mt-1"
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
          <div className="form-divider">
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
