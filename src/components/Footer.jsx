import React from 'react';
import { Car, MapPin, Phone, Mail, Shield, ChevronRight } from 'lucide-react';
import { CITIES_DATA } from '../data/citiesData';
import { useBooking } from '../context/BookingContext';

export default function Footer() {
  const { setSelectedCity, setActiveTab } = useBooking();

  const handleCityClick = (cityId) => {
    setSelectedCity(cityId);
    setActiveTab('fleets');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-container">
      <div className="container footer-main">
        <div className="footer-grid">
          {/* Col 1: Brand & About */}
          <div className="footer-col brand-col">
            <div className="footer-logo" onClick={() => handleTabClick('home')}>
              <div className="logo-icon-bg">
                <Car size={22} />
              </div>
              <span className="logo-text">My<span className="text-orange">Choize</span></span>
            </div>
            <p className="brand-desc">
              MyChoize is India’s leading self-drive car rental platform, owned and operated by ORIX Auto Infrastructure Services Limited, a subsidiary of ORIX Corporation, Japan.
            </p>
            <div className="orix-badge">
              <Shield size={14} className="text-orange" /> Powered by ORIX Global
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><button onClick={() => handleTabClick('home')}><ChevronRight size={14} /> Home</button></li>
              <li><button onClick={() => handleTabClick('fleets')}><ChevronRight size={14} /> Fleets & Cars</button></li>
              <li><button onClick={() => handleTabClick('offers')}><ChevronRight size={14} /> Promo Offers</button></li>
              <li><button onClick={() => handleTabClick('how-it-works')}><ChevronRight size={14} /> How It Works</button></li>
            </ul>
          </div>

          {/* Col 3: Popular Cities */}
          <div className="footer-col">
            <h4>Self Drive Cities</h4>
            <ul className="footer-links">
              <li><button onClick={() => handleCityClick('delhi')}><ChevronRight size={14} /> Delhi NCR</button></li>
              <li><button onClick={() => handleCityClick('mumbai')}><ChevronRight size={14} /> Mumbai</button></li>
              <li><button onClick={() => handleCityClick('bengaluru')}><ChevronRight size={14} /> Bengaluru</button></li>
              <li><button onClick={() => handleCityClick('hyderabad')}><ChevronRight size={14} /> Hyderabad</button></li>
              <li><button onClick={() => handleCityClick('pune')}><ChevronRight size={14} /> Pune</button></li>
            </ul>
          </div>

          {/* Col 4: Contact & Help */}
          <div className="footer-col">
            <h4>24/7 Customer Support</h4>
            <div className="contact-item">
              <Phone size={16} className="text-orange" />
              <div>
                <span className="contact-label">Toll-Free Helpline</span>
                <span className="contact-val">1800-208-1212</span>
              </div>
            </div>
            <div className="contact-item">
              <Mail size={16} className="text-orange" />
              <div>
                <span className="contact-label">Email Assistance</span>
                <span className="contact-val">support@mychoize.com</span>
              </div>
            </div>
            <div className="contact-item">
              <MapPin size={16} className="text-orange" />
              <div>
                <span className="contact-label">Head Office</span>
                <span className="contact-val">ORIX Tower, Plot 94, Sector 32, Gurugram, Haryana</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© 2026 MyChoize Self Drive Cars (ORIX Auto Infrastructure Services Ltd). All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#terms">Terms & Conditions</a>
            <span>•</span>
            <a href="#privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#faq">FAQs</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-container {
          background: #0F172A;
          color: #94A3B8;
          padding-top: 64px;
          padding-bottom: 28px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr 0.8fr 1.2fr;
          gap: 40px;
          margin-bottom: 48px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          margin-bottom: 16px;
        }

        .logo-icon-bg {
          width: 38px;
          height: 38px;
          background: #FF6B00;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
        }

        .logo-text {
          font-family: var(--font-heading);
          font-size: 24px;
          font-weight: 800;
          color: #FFFFFF;
        }

        .brand-desc {
          font-size: 13px;
          line-height: 1.6;
          color: #94A3B8;
          margin-bottom: 16px;
        }

        .orix-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 107, 0, 0.12);
          color: #FF6B00;
          font-size: 12px;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 99px;
        }

        .footer-col h4 {
          color: #FFFFFF;
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-links button {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #94A3B8;
          font-size: 13px;
          transition: color 0.2s ease;
          text-align: left;
        }

        .footer-links button:hover {
          color: #FF6B00;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 14px;
        }

        .contact-label {
          display: block;
          font-size: 11px;
          color: #64748B;
          text-transform: uppercase;
        }

        .contact-val {
          display: block;
          font-size: 13px;
          color: #E2E8F0;
          font-weight: 600;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
        }

        .footer-bottom-links {
          display: flex;
          gap: 12px;
          color: #64748B;
        }

        .footer-bottom-links a:hover {
          color: #FF6B00;
        }

        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
