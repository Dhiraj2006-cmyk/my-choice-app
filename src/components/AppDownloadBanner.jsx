import React from 'react';
import { Smartphone, Download, Star, ShieldCheck } from 'lucide-react';

export default function AppDownloadBanner() {
  return (
    <section className="app-banner-section">
      <div className="container">
        <div className="app-banner-card">
          <div className="app-banner-content">
            <span className="badge badge-orange mb-3">MYCHOIZE MOBILE APP</span>
            <h2>Download MyChoize App & Get ₹500 Off</h2>
            <p>
              Unlock instant keyless access, real-time vehicle tracking, exclusive app-only deals, and 1-click door delivery.
            </p>

            <div className="banner-perks-list">
              <span><ShieldCheck size={16} className="text-orange" /> Instant DL Verification</span>
              <span><Star size={16} className="text-orange" /> 4.8★ App Store Rating</span>
            </div>

            <div className="app-store-btns">
              <button className="store-btn">
                <Smartphone size={20} />
                <div>
                  <span className="store-sub">GET IT ON</span>
                  <span className="store-name">Google Play</span>
                </div>
              </button>
              <button className="store-btn">
                <Download size={20} />
                <div>
                  <span className="store-sub">DOWNLOAD ON THE</span>
                  <span className="store-name">App Store</span>
                </div>
              </button>
            </div>
          </div>

          <div className="app-mockup-wrapper">
            <img
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80"
              alt="MyChoize Mobile App Mockup"
              className="mockup-img"
            />
          </div>
        </div>
      </div>

      <style>{`
        .app-banner-section {
          padding: 60px 0;
          background: #F8FAFC;
        }

        .app-banner-card {
          background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
          border-radius: 28px;
          padding: 48px 56px;
          color: #FFFFFF;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
          align-items: center;
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.2);
          overflow: hidden;
          position: relative;
        }

        .app-banner-content h2 {
          font-size: 34px;
          font-weight: 800;
          color: #FFFFFF;
          margin-bottom: 14px;
          line-height: 1.2;
        }

        .app-banner-content p {
          font-size: 16px;
          color: #94A3B8;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .banner-perks-list {
          display: flex;
          gap: 20px;
          margin-bottom: 32px;
        }

        .banner-perks-list span {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #E2E8F0;
        }

        .app-store-btns {
          display: flex;
          gap: 16px;
        }

        .store-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 12px 20px;
          border-radius: 14px;
          color: #FFFFFF;
          transition: all 0.2s ease;
          text-align: left;
        }

        .store-btn:hover {
          background: #FF6B00;
          border-color: #FF6B00;
          transform: translateY(-2px);
        }

        .store-sub {
          display: block;
          font-size: 9px;
          letter-spacing: 0.05em;
          color: #CBD5E1;
        }

        .store-name {
          display: block;
          font-size: 14px;
          font-weight: 700;
        }

        .app-mockup-wrapper {
          display: flex;
          justify-content: center;
        }

        .mockup-img {
          max-width: 280px;
          border-radius: 24px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          transform: rotate(3deg);
        }

        @media (max-width: 992px) {
          .app-banner-card {
            grid-template-columns: 1fr;
            padding: 36px 28px;
          }
          .app-mockup-wrapper {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
