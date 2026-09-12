import React, { useState } from 'react';
import { Tag, Copy, Check, Sparkles, ArrowRight } from 'lucide-react';
import { OFFERS_DATA } from '../data/offersData';
import { useBooking } from '../context/BookingContext';

export default function OffersSection() {
  const { setActiveTab } = useBooking();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section className="offers-section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="badge badge-orange mb-2">HOT DEALS & DISCOUNTS</span>
          <h2>Exclusive MyChoize Offers</h2>
          <p>Save big on your next self-drive trip with active promotional promo codes.</p>
        </div>

        <div className="offers-grid">
          {OFFERS_DATA.map((offer) => {
            const isCopied = copiedCode === offer.code;
            return (
              <div key={offer.id} className="offer-card">
                <div className="offer-card-top">
                  <span className="badge badge-purple">{offer.badge}</span>
                  <span className="valid-text">Valid till {offer.validTill}</span>
                </div>

                <div className="offer-discount-badge">{offer.discount}</div>
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>

                <div className="offer-action-row">
                  <div className="code-pill">
                    <Tag size={14} className="text-orange" />
                    <span>{offer.code}</span>
                  </div>

                  <button
                    className="copy-btn"
                    onClick={() => handleCopy(offer.code)}
                  >
                    {isCopied ? <Check size={14} className="text-green" /> : <Copy size={14} />}
                    <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                <button
                  className="btn-secondary w-full apply-offer-cta"
                  onClick={() => {
                    setActiveTab('fleets');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span>Book with this Deal</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .offers-section {
          padding: 80px 0;
          background: #F8FAFC;
        }

        .offers-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }

        .offer-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .offer-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 6px;
          height: 100%;
          background: #FF6B00;
        }

        .offer-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 30px rgba(15, 23, 42, 0.1);
          border-color: #FF6B00;
        }

        .offer-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .valid-text {
          font-size: 12px;
          color: #64748B;
          font-weight: 500;
        }

        .offer-discount-badge {
          font-family: var(--font-heading);
          font-size: 26px;
          font-weight: 800;
          color: #FF6B00;
          margin-bottom: 6px;
        }

        .offer-card h3 {
          font-size: 19px;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 8px;
        }

        .offer-card p {
          font-size: 14px;
          color: #64748B;
          line-height: 1.5;
          margin-bottom: 20px;
        }

        .offer-action-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #F8FAFC;
          border: 1px dashed #CBD5E1;
          padding: 10px 14px;
          border-radius: 12px;
          margin-bottom: 16px;
        }

        .code-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-heading);
          font-size: 16px;
          font-weight: 800;
          color: #0F172A;
          letter-spacing: 0.05em;
        }

        .copy-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          font-weight: 700;
          color: #0F172A;
        }

        .copy-btn:hover {
          color: #FF6B00;
        }

        .apply-offer-cta {
          margin-top: auto;
        }

        @media (max-width: 768px) {
          .offers-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
