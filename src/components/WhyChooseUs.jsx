import React from 'react';
import { Gauge, ShieldCheck, Sparkles, Headphones, ShieldAlert, Award } from 'lucide-react';

export default function WhyChooseUs() {
  const perks = [
    {
      icon: Gauge,
      title: 'Unlimited Kilometers',
      desc: 'Drive without counting kilometers. Choose our Unlimited KMs package and enjoy freedom on long highway trips.'
    },
    {
      icon: ShieldCheck,
      title: 'Zero Security Deposit',
      desc: 'Book your favorite car without blocking large security deposits. Simple, transparent, and hassle-free.'
    },
    {
      icon: Sparkles,
      title: 'Clean & Sanitized Fleet',
      desc: 'Every car undergoes strict multi-point safety checks and deep sanitization before key hand-over.'
    },
    {
      icon: Headphones,
      title: '24/7 Roadside Assistance',
      desc: 'Drive with total peace of mind. Our dedicated breakdown support team is always just a phone call away.'
    },
    {
      icon: ShieldAlert,
      title: 'No Hidden Charges',
      desc: 'What you see is what you pay. Transparent pricing with clear tax and insurance breakdown.'
    },
    {
      icon: Award,
      title: 'Backed by ORIX Global',
      desc: 'Trust India’s premier car rental brand backed by ORIX Corporation, operating in over 30 countries.'
    }
  ];

  return (
    <section className="why-us-section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="badge badge-orange mb-2">WHY MYCHOIZE</span>
          <h2>Experience the Best Self Drive Car Rental</h2>
          <p>Designed for comfort, flexibility, and absolute freedom on the road.</p>
        </div>

        <div className="perks-grid">
          {perks.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="perk-card">
                <div className="perk-icon-bg">
                  <Icon size={24} className="text-orange" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .why-us-section {
          padding: 80px 0;
          background: #F8FAFC;
        }

        .section-title-wrapper {
          text-align: center;
          max-width: 650px;
          margin: 0 auto 50px auto;
        }

        .section-title-wrapper h2 {
          font-size: 34px;
          color: #0F172A;
          margin-top: 8px;
          margin-bottom: 12px;
        }

        .section-title-wrapper p {
          font-size: 16px;
          color: #64748B;
        }

        .perks-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .perk-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          padding: 32px 24px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
        }

        .perk-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 30px rgba(15, 23, 42, 0.08);
          border-color: #FF6B00;
        }

        .perk-icon-bg {
          width: 54px;
          height: 54px;
          background: #FFF0E6;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .perk-card h3 {
          font-size: 19px;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 10px;
        }

        .perk-card p {
          font-size: 14px;
          color: #64748B;
          line-height: 1.6;
        }

        @media (max-width: 992px) {
          .perks-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .perks-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
