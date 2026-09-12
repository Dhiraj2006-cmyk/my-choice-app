import React, { useState } from 'react';
import { Car, MapPin, ChevronDown, User, Menu, X, Shield, Sparkles, Tag, HelpCircle, LogIn } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import CitySelectorModal from './CitySelectorModal';

export default function Navbar() {
  const { currentCityObj, activeTab, setActiveTab, user, setIsAuthModalOpen } = useBooking();
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="navbar-header">
        {/* Top Info Banner */}
        <div className="top-bar">
          <div className="container top-bar-inner">
            <div className="top-perks">
              <span className="top-perk-item">
                <Shield size={14} className="text-orange" /> Zero Security Deposit Available
              </span>
              <span className="top-perk-divider">•</span>
              <span className="top-perk-item">
                <Sparkles size={14} className="text-orange" /> Unlimited KMs Package Options
              </span>
            </div>
            <div className="top-contact">
              <span>📞 24/7 Helpline: 1800-208-1212</span>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <nav className="main-nav">
          <div className="container main-nav-inner">
            {/* Logo */}
            <div className="brand-container" onClick={() => handleNavClick('home')}>
              <div className="brand-icon-wrapper">
                <Car size={26} className="brand-car-icon" />
              </div>
              <div className="brand-text">
                <span className="brand-title">My<span className="text-orange">Choize</span></span>
                <span className="brand-subtitle">SELF DRIVE CARS • ORIX</span>
              </div>
            </div>

            {/* City Selector Button */}
            <button className="city-selector-btn" onClick={() => setIsCityModalOpen(true)}>
              <div className="city-pin-bg">
                <MapPin size={18} className="text-orange" />
              </div>
              <div className="city-label-group">
                <span className="city-title">{currentCityObj.name}</span>
                <span className="city-sub">Change City</span>
              </div>
              <ChevronDown size={16} className="chevron-icon" />
            </button>

            {/* Desktop Navigation Links */}
            <div className="nav-links-desktop">
              <button
                className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                Home
              </button>
              <button
                className={`nav-link ${activeTab === 'fleets' ? 'active' : ''}`}
                onClick={() => handleNavClick('fleets')}
              >
                Fleets & Pricing
              </button>
              <button
                className={`nav-link ${activeTab === 'offers' ? 'active' : ''}`}
                onClick={() => handleNavClick('offers')}
              >
                Offers <span className="nav-badge">NEW</span>
              </button>
              <button
                className={`nav-link ${activeTab === 'how-it-works' ? 'active' : ''}`}
                onClick={() => handleNavClick('how-it-works')}
              >
                How It Works
              </button>
            </div>

            {/* User Action CTA */}
            <div className="nav-actions">
              <button
                className={`user-login-btn ${user ? 'logged-in' : ''}`}
                onClick={() => setIsAuthModalOpen(true)}
              >
                <User size={18} />
                <span>{user ? user.name : 'Login / Sign Up'}</span>
              </button>

              <button
                className="mobile-hamburger"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="mobile-drawer animate-fade-in">
              <div className="mobile-drawer-inner">
                <button
                  className={`mobile-nav-item ${activeTab === 'home' ? 'active' : ''}`}
                  onClick={() => handleNavClick('home')}
                >
                  <Car size={20} /> Home
                </button>
                <button
                  className={`mobile-nav-item ${activeTab === 'fleets' ? 'active' : ''}`}
                  onClick={() => handleNavClick('fleets')}
                >
                  <Car size={20} /> Fleets & Pricing
                </button>
                <button
                  className={`mobile-nav-item ${activeTab === 'offers' ? 'active' : ''}`}
                  onClick={() => handleNavClick('offers')}
                >
                  <Tag size={20} /> Deals & Offers
                </button>
                <button
                  className={`mobile-nav-item ${activeTab === 'how-it-works' ? 'active' : ''}`}
                  onClick={() => handleNavClick('how-it-works')}
                >
                  <HelpCircle size={20} /> How It Works
                </button>

                <div className="mobile-drawer-divider" />

                <button
                  className="mobile-nav-item"
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <User size={20} /> {user ? user.name : 'Login / Sign Up'}
                </button>

                <button className="btn-primary w-full" onClick={() => setIsCityModalOpen(true)}>
                  <MapPin size={18} /> Change City ({currentCityObj.name})
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* City Modal */}
      <CitySelectorModal isOpen={isCityModalOpen} onClose={() => setIsCityModalOpen(false)} />

      <style>{`
        .navbar-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: #FFFFFF;
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
        }

        .top-bar {
          background: #0F172A;
          color: #94A3B8;
          font-size: 12px;
          padding: 6px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .top-bar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .top-perks {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .top-perk-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #E2E8F0;
          font-weight: 500;
        }

        .top-perk-divider {
          color: #475569;
        }

        .main-nav {
          padding: 14px 0;
          background: #FFFFFF;
        }

        .main-nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .brand-container {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .brand-icon-wrapper {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #FF6B00 0%, #E05D00 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          box-shadow: 0 4px 12px rgba(255, 107, 0, 0.35);
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-title {
          font-family: var(--font-heading);
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #0F172A;
          line-height: 1.1;
        }

        .text-orange {
          color: #FF6B00;
        }

        .brand-subtitle {
          font-size: 10px;
          font-weight: 700;
          color: #64748B;
          letter-spacing: 0.08em;
        }

        .city-selector-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 14px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          transition: all 0.2s ease;
        }

        .city-selector-btn:hover {
          border-color: #FF6B00;
          background: #FFF0E6;
        }

        .city-pin-bg {
          width: 32px;
          height: 32px;
          background: rgba(255, 107, 0, 0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .city-label-group {
          text-align: left;
        }

        .city-title {
          display: block;
          font-size: 14px;
          font-weight: 700;
          color: #0F172A;
          line-height: 1.2;
        }

        .city-sub {
          display: block;
          font-size: 11px;
          color: #64748B;
        }

        .chevron-icon {
          color: #94A3B8;
        }

        .nav-links-desktop {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .nav-link {
          font-weight: 600;
          font-size: 15px;
          color: #475569;
          position: relative;
          padding: 6px 0;
          transition: color 0.2s ease;
        }

        .nav-link:hover, .nav-link.active {
          color: #FF6B00;
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 3px;
          background: #FF6B00;
          border-radius: 2px;
        }

        .nav-badge {
          background: #FF6B00;
          color: #FFFFFF;
          font-size: 10px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 99px;
          margin-left: 4px;
        }

        .user-login-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 12px;
          background: #0F172A;
          color: #FFFFFF;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .user-login-btn:hover {
          background: #1E293B;
          transform: translateY(-1px);
        }

        .user-login-btn.logged-in {
          background: #FF6B00;
          box-shadow: 0 4px 12px rgba(255, 107, 0, 0.3);
        }

        .mobile-hamburger {
          display: none;
          padding: 8px;
          color: #0F172A;
        }

        .mobile-drawer {
          background: #FFFFFF;
          border-top: 1px solid #E2E8F0;
          padding: 20px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .mobile-drawer-inner {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .mobile-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 16px;
          color: #334155;
          text-align: left;
          transition: background 0.2s ease;
        }

        .mobile-nav-item.active, .mobile-nav-item:hover {
          background: #FFF0E6;
          color: #FF6B00;
        }

        .mobile-drawer-divider {
          height: 1px;
          background: #E2E8F0;
          margin: 8px 0;
        }

        @media (max-width: 1024px) {
          .nav-links-desktop {
            display: none;
          }
          .mobile-hamburger {
            display: block;
          }
        }

        @media (max-width: 640px) {
          .top-bar-inner {
            justify-content: center;
          }
          .top-contact {
            display: none;
          }
          .city-sub {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
