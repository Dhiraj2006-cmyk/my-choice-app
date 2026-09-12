import React, { useState } from 'react';
import { X, User, Lock, Mail, Phone, ShieldCheck, LogOut, CheckCircle2, Car, Sparkles, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function AuthModal() {
  const { user, setUser, isAuthModalOpen, setIsAuthModalOpen } = useBooking();
  const [activeMode, setActiveMode] = useState('login'); // 'login' or 'signup'
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' or 'otp'
  
  // Form fields
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  
  const [toastMsg, setToastMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setToastMsg('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!emailOrPhone) return;
    const mockUser = {
      name: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'Valued Driver',
      email: emailOrPhone.includes('@') ? emailOrPhone : `${emailOrPhone}@mychoize.com`,
      phone: emailOrPhone.includes('@') ? '+91 9876543210' : emailOrPhone,
      joinedDate: 'July 2026',
      loyaltyPoints: 350
    };
    setUser(mockUser);
    setToastMsg('Successfully Logged In! Welcome back.');
    setTimeout(() => {
      handleClose();
    }, 1200);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !mobileNo || !signupEmail) return;
    const mockUser = {
      name: fullName,
      email: signupEmail,
      phone: mobileNo,
      joinedDate: 'July 2026',
      loyaltyPoints: 500 // Bonus points on signup
    };
    setUser(mockUser);
    setToastMsg('Account Created Successfully! Enjoy ₹500 discount bonus.');
    setTimeout(() => {
      handleClose();
    }, 1500);
  };

  const handleLogout = () => {
    setUser(null);
    setToastMsg('Logged out successfully.');
    setTimeout(() => {
      handleClose();
    }, 1000);
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal-card animate-fade-in">
        {/* Modal Header */}
        <div className="auth-modal-header">
          <div className="header-brand-wrap">
            <div className="brand-logo-circle">
              <Car size={22} className="text-orange" />
            </div>
            <div>
              <h3>MyChoize Account</h3>
              <p>Self Drive Rentals & Subscription</p>
            </div>
          </div>
          <button className="close-btn" onClick={handleClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="auth-modal-body">
          {user ? (
            /* Logged In User Profile View */
            <div className="user-profile-view animate-fade-in">
              <div className="profile-avatar-circle">
                <User size={36} className="text-orange" />
              </div>
              <h2 className="profile-name">Hello, {user.name}!</h2>
              <span className="profile-email">{user.email}</span>
              <span className="profile-phone">📱 {user.phone}</span>

              <div className="user-stats-grid">
                <div className="stat-box">
                  <span className="stat-num">0</span>
                  <span className="stat-lbl">Active Bookings</span>
                </div>
                <div className="stat-box">
                  <span className="stat-num text-orange">{user.loyaltyPoints}</span>
                  <span className="stat-lbl">Choize Points</span>
                </div>
              </div>

              <div className="profile-perks">
                <div className="perk-row">
                  <ShieldCheck size={16} className="text-green" />
                  <span>DL Verified for 1-Click Car Pickup</span>
                </div>
                <div className="perk-row">
                  <Sparkles size={16} className="text-orange" />
                  <span>Zero Security Deposit Eligible</span>
                </div>
              </div>

              <button className="btn-secondary w-full logout-btn" onClick={handleLogout}>
                <LogOut size={16} /> Logout from MyChoize
              </button>
            </div>
          ) : (
            /* Login / Signup Form Tabs */
            <div>
              {/* Tab Switcher */}
              <div className="auth-tabs">
                <button
                  type="button"
                  className={`auth-tab ${activeMode === 'login' ? 'active' : ''}`}
                  onClick={() => setActiveMode('login')}
                >
                  Login to Account
                </button>
                <button
                  type="button"
                  className={`auth-tab ${activeMode === 'signup' ? 'active' : ''}`}
                  onClick={() => setActiveMode('signup')}
                >
                  New Account <span className="tab-pill">GET ₹500</span>
                </button>
              </div>

              {toastMsg && (
                <div className="toast-banner animate-fade-in">
                  <CheckCircle2 size={16} /> {toastMsg}
                </div>
              )}

              {activeMode === 'login' ? (
                /* Login Form */
                <form onSubmit={handleLoginSubmit} className="auth-form animate-fade-in">
                  <div className="login-method-toggle">
                    <button
                      type="button"
                      className={`method-btn ${loginMethod === 'password' ? 'active' : ''}`}
                      onClick={() => setLoginMethod('password')}
                    >
                      With Password
                    </button>
                    <button
                      type="button"
                      className={`method-btn ${loginMethod === 'otp' ? 'active' : ''}`}
                      onClick={() => setLoginMethod('otp')}
                    >
                      With Mobile OTP
                    </button>
                  </div>

                  <div className="form-group">
                    <label><Mail size={14} /> Email ID or Mobile Number</label>
                    <div className="input-with-icon">
                      <User size={16} className="input-icon" />
                      <input
                        type="text"
                        placeholder="Enter email or 10-digit mobile"
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {loginMethod === 'password' && (
                    <div className="form-group">
                      <div className="label-flex">
                        <label><Lock size={14} /> Password</label>
                        <a href="#forgot" className="forgot-link" onClick={(e) => e.preventDefault()}>Forgot?</a>
                      </div>
                      <div className="input-with-icon">
                        <Lock size={16} className="input-icon" />
                        <input
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  )}

                  <button type="submit" className="btn-primary w-full submit-auth-btn">
                    <span>{loginMethod === 'otp' ? 'Send OTP' : 'Login'}</span>
                    <ArrowRight size={18} />
                  </button>

                  <div className="divider-or"><span>OR LOGIN WITH</span></div>

                  <button
                    type="button"
                    className="google-btn"
                    onClick={() => {
                      setUser({
                        name: 'Google User',
                        email: 'user@gmail.com',
                        phone: '+91 9988776655',
                        loyaltyPoints: 200
                      });
                      setToastMsg('Logged in via Google!');
                      setTimeout(handleClose, 1000);
                    }}
                  >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="18" />
                    <span>Continue with Google</span>
                  </button>
                </form>
              ) : (
                /* Sign Up Form */
                <form onSubmit={handleSignupSubmit} className="auth-form animate-fade-in">
                  <div className="form-group">
                    <label><User size={14} /> Full Name (as on Driving License)</label>
                    <input
                      type="text"
                      placeholder="e.g. Dhiraj Mane"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label><Phone size={14} /> Mobile Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 9876543210"
                      value={mobileNo}
                      onChange={(e) => setMobileNo(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label><Mail size={14} /> Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. dhiraj@example.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label><Lock size={14} /> Create Password</label>
                    <input
                      type="password"
                      placeholder="At least 6 characters"
                      required
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full submit-auth-btn">
                    <span>Create Free MyChoize Account</span>
                    <ArrowRight size={18} />
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .auth-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .auth-modal-card {
          background: #FFFFFF;
          width: 100%;
          max-width: 460px;
          border-radius: 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          border: 1px solid rgba(226, 232, 240, 0.8);
        }

        .auth-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          background: #FAFBFD;
          border-bottom: 1px solid #F1F5F9;
        }

        .header-brand-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-logo-circle {
          width: 40px;
          height: 40px;
          background: #FFF0E6;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .header-brand-wrap h3 {
          font-size: 17px;
          font-weight: 700;
          color: #0F172A;
        }

        .header-brand-wrap p {
          font-size: 12px;
          color: #64748B;
        }

        .auth-modal-body {
          padding: 24px;
        }

        .auth-tabs {
          display: flex;
          border-bottom: 2px solid #F1F5F9;
          margin-bottom: 20px;
        }

        .auth-tab {
          flex: 1;
          padding: 10px 0;
          font-size: 14px;
          font-weight: 700;
          color: #64748B;
          text-align: center;
          position: relative;
          transition: all 0.2s;
        }

        .auth-tab.active {
          color: #FF6B00;
        }

        .auth-tab.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 3px;
          background: #FF6B00;
          border-radius: 99px;
        }

        .tab-pill {
          background: #10B981;
          color: #FFFFFF;
          font-size: 9px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 99px;
          margin-left: 4px;
        }

        .login-method-toggle {
          display: flex;
          background: #F1F5F9;
          padding: 3px;
          border-radius: 10px;
          margin-bottom: 18px;
        }

        .method-btn {
          flex: 1;
          padding: 6px;
          font-size: 12px;
          font-weight: 600;
          color: #64748B;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .method-btn.active {
          background: #FFFFFF;
          color: #0F172A;
          box-shadow: 0 2px 4px rgba(0,0,0,0.06);
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-size: 12px;
          font-weight: 700;
          color: #475569;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .label-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .forgot-link {
          font-size: 11px;
          color: #FF6B00;
          font-weight: 700;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          color: #94A3B8;
        }

        .auth-form input {
          width: 100%;
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid #E2E8F0;
          background: #F8FAFC;
          font-size: 14px;
          color: #0F172A;
          transition: all 0.2s;
        }

        .input-with-icon input {
          padding-left: 38px;
        }

        .auth-form input:focus {
          border-color: #FF6B00;
          background: #FFFFFF;
        }

        .submit-auth-btn {
          padding: 12px;
          font-size: 15px;
          border-radius: 12px;
          margin-top: 4px;
        }

        .divider-or {
          text-align: center;
          position: relative;
          margin: 6px 0;
        }

        .divider-or::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #E2E8F0;
        }

        .divider-or span {
          position: relative;
          background: #FFFFFF;
          padding: 0 12px;
          font-size: 11px;
          font-weight: 700;
          color: #94A3B8;
        }

        .google-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 10px;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          background: #FFFFFF;
          font-size: 13px;
          font-weight: 700;
          color: #334155;
          transition: background 0.2s;
        }

        .google-btn:hover {
          background: #F8FAFC;
        }

        /* Profile View */
        .user-profile-view {
          text-align: center;
          padding: 10px 0;
        }

        .profile-avatar-circle {
          width: 70px;
          height: 70px;
          background: #FFF0E6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px auto;
        }

        .profile-name {
          font-size: 22px;
          color: #0F172A;
          margin-bottom: 2px;
        }

        .profile-email, .profile-phone {
          display: block;
          font-size: 13px;
          color: #64748B;
        }

        .user-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin: 20px 0;
        }

        .stat-box {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 14px;
        }

        .stat-num {
          display: block;
          font-size: 22px;
          font-weight: 800;
          color: #0F172A;
        }

        .stat-lbl {
          font-size: 11px;
          color: #64748B;
          font-weight: 600;
        }

        .profile-perks {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
          text-align: left;
          background: #FFFBF7;
          border: 1px solid #FFE4D6;
          border-radius: 12px;
          padding: 12px 16px;
        }

        .perk-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          color: #475569;
        }

        .logout-btn {
          padding: 12px;
          font-size: 14px;
        }

        .toast-banner {
          background: #ECFDF5;
          color: #047857;
          font-size: 13px;
          font-weight: 600;
          padding: 10px 14px;
          border-radius: 10px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
      `}</style>
    </div>
  );
}
