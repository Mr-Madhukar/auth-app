import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useState } from 'react';
import {
  LogOut,
  User,
  Mail,
  Shield,
  Calendar,
  CheckCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login', { replace: true });
    } catch {
      toast.error('Logout failed');
    } finally {
      setLoggingOut(false);
    }
  };

  if (!user) return null;

  const avatar = user.avatar?.url;
  const createdAt = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '—';
  const updatedAt = user.updatedAt
    ? new Date(user.updatedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '—';

  return (
    <div className="min-h-screen bg-pattern relative overflow-hidden">
      {/* Floating Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Navbar */}
      <nav className="w-full relative z-20 border-b border-border backdrop-blur-xl bg-surface/60">
        <div className="w-full max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center ring-1 ring-white/10">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              AuthApp
            </span>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="btn-outline flex items-center gap-2"
          >
            {loggingOut ? (
              <>
                <div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
                Logging out…
              </>
            ) : (
              <>
                <LogOut className="w-4 h-4" />
                Logout
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-full relative z-10 max-w-2xl mx-auto px-6 py-14 page-enter">
        {/* Profile Header */}
        <div className="glass-card p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="relative shrink-0">
              {avatar ? (
                <img
                  src={avatar}
                  alt={user.username}
                  className="w-24 h-24 rounded-2xl object-cover ring-2 ring-primary/30"
                />
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-primary/15 flex items-center justify-center ring-2 ring-primary/30">
                  <User className="w-10 h-10 text-primary" />
                </div>
              )}
              {user.isEmailVerified && (
                <div className="absolute -bottom-1 -right-1 bg-success rounded-full p-0.5">
                  <CheckCircle className="w-5 h-5 text-surface" />
                </div>
              )}
            </div>

            {/* Name & Role */}
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                {user.username}
              </h1>
              <p className="text-text-secondary text-base mb-4">{user.email}</p>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-primary-hover shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                <Shield className="w-4 h-4" />
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="glass-card p-8">
          <h2 className="text-lg font-semibold text-text-primary mb-6">
            Account Details
          </h2>
          <div className="flex flex-col gap-4">
            <div className="info-row">
              <User className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-text-muted mb-0.5">Username</p>
                <p className="text-sm font-medium text-text-primary">{user.username}</p>
              </div>
            </div>

            <div className="info-row">
              <Mail className="w-5 h-5 text-accent shrink-0" />
              <div>
                <p className="text-xs text-text-muted mb-0.5">Email</p>
                <p className="text-sm font-medium text-text-primary">{user.email}</p>
              </div>
            </div>

            <div className="info-row">
              <Shield className="w-5 h-5 text-success shrink-0" />
              <div>
                <p className="text-xs text-text-muted mb-0.5">Role</p>
                <p className="text-sm font-medium text-text-primary">{user.role}</p>
              </div>
            </div>

            <div className="info-row">
              <CheckCircle className="w-5 h-5 text-warning shrink-0" />
              <div>
                <p className="text-xs text-text-muted mb-0.5">Email Verified</p>
                <p className="text-sm font-medium text-text-primary">
                  {user.isEmailVerified ? 'Yes ✓' : 'No ✗'}
                </p>
              </div>
            </div>

            <div className="info-row">
              <Calendar className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-text-muted mb-0.5">Joined</p>
                <p className="text-sm font-medium text-text-primary">{createdAt}</p>
              </div>
            </div>

            <div className="info-row">
              <Clock className="w-5 h-5 text-accent shrink-0" />
              <div>
                <p className="text-xs text-text-muted mb-0.5">Last Updated</p>
                <p className="text-sm font-medium text-text-primary">{updatedAt}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-text-muted text-xs mt-10">
          Powered by{' '}
          <a
            href="https://freeapi.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-hover transition-colors"
          >
            FreeAPI.app
          </a>
        </p>
      </main>
    </div>
  );
}
