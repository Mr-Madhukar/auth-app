import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, getCurrentUser } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { LogIn, User, Lock, ArrowRight, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username.trim() || !form.password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await loginUser(form);

      // Fetch user data after login
      const userData = await getCurrentUser();
      login(userData?.data || null);

      toast.success('Welcome back! 🎉');
      navigate('/', { replace: true });
    } catch (err) {
      const msg =
        err.response?.data?.message || 'Login failed. Please check your credentials.';
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-6 ring-1 ring-white/10 shadow-lg">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]">
            Welcome Back
          </h1>
          <p className="text-text-secondary text-base">
            Sign in to your account to continue
          </p>
        </div>

        {/* Card */}
        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Username */}
            <div className="form-group">
              <label htmlFor="login-username" className="text-sm font-medium text-text-secondary flex items-center gap-2">
                <User className="w-4 h-4" />
                Username
              </label>
              <div className="gradient-border rounded-xl">
                <input
                  id="login-username"
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

            {/* Password */}
            <div className="form-group">
              <label htmlFor="login-password" className="text-sm font-medium text-text-secondary flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <div className="gradient-border rounded-xl">
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className="input-field"
                  autoComplete="current-password"
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
                    Signing in…
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Sign In
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="form-divider">
            <p className="text-text-muted text-sm">
              Don&apos;t have an account?{' '}
              <Link
                to="/register"
                className="text-primary font-semibold hover:text-primary-hover transition-colors inline-flex items-center gap-1"
              >
                Create one <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
