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
      <nav className="relative z-20 border-b border-border backdrop-blur-xl bg-surface/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg text-text-primary">AuthApp</span>
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
      <main className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-12 page-enter">
        {/* Profile Header */}
        <div className="glass-card p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
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
              <h1 className="text-2xl font-bold text-text-primary mb-1">
                {user.username}
              </h1>
              <p className="text-text-secondary text-sm mb-3">{user.email}</p>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/15 text-primary-hover">
                <Shield className="w-3.5 h-3.5" />
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="glass-card p-8">
          <h2 className="text-lg font-semibold text-text-primary mb-5">
            Account Details
          </h2>
          <div className="space-y-3">
            <div className="info-row">
              <User className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-text-muted">Username</p>
                <p className="text-sm font-medium text-text-primary">{user.username}</p>
              </div>
            </div>

            <div className="info-row">
              <Mail className="w-5 h-5 text-accent shrink-0" />
              <div>
                <p className="text-xs text-text-muted">Email</p>
                <p className="text-sm font-medium text-text-primary">{user.email}</p>
              </div>
            </div>

            <div className="info-row">
              <Shield className="w-5 h-5 text-success shrink-0" />
              <div>
                <p className="text-xs text-text-muted">Role</p>
                <p className="text-sm font-medium text-text-primary">{user.role}</p>
              </div>
            </div>

            <div className="info-row">
              <CheckCircle className="w-5 h-5 text-warning shrink-0" />
              <div>
                <p className="text-xs text-text-muted">Email Verified</p>
                <p className="text-sm font-medium text-text-primary">
                  {user.isEmailVerified ? 'Yes ✓' : 'No ✗'}
                </p>
              </div>
            </div>

            <div className="info-row">
              <Calendar className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-text-muted">Joined</p>
                <p className="text-sm font-medium text-text-primary">{createdAt}</p>
              </div>
            </div>

            <div className="info-row">
              <Clock className="w-5 h-5 text-accent shrink-0" />
              <div>
                <p className="text-xs text-text-muted">Last Updated</p>
                <p className="text-sm font-medium text-text-primary">{updatedAt}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-text-muted text-xs mt-8">
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
