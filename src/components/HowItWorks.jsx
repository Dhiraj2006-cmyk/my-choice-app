import React from 'react';
import { Search, FileCheck, Key, Compass } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: Search,
      title: 'Search & Pick Car',
      desc: 'Choose your pickup city, dates, and vehicle model from our wide selection of Hatchbacks, Sedans, SUVs & Luxury cars.'
    },
    {
      num: '02',
      icon: FileCheck,
      title: 'Book & Verify',
      desc: 'Complete quick online booking and upload your driving license & ID for instant automated verification.'
    },
    {
      num: '03',
      icon: Key,
      title: 'Doorstep Delivery',
      desc: 'Receive the sanitized vehicle at your doorstep or pick it up from your nearest MyChoize hub point.'
    },
    {
      num: '04',
      icon: Compass,
      title: 'Drive & Return',
      desc: 'Enjoy unlimited kilometers, create lasting trip memories, and return the car seamlessly at your destination.'
    }
  ];

  return (
    <section className="how-it-works-section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="badge badge-orange mb-2">SIMPLE 4-STEP PROCESS</span>
          <h2>How MyChoize Self Drive Works</h2>
          <p>Renting a car has never been this quick, transparent, and easy.</p>
        </div>

        <div className="steps-flow-grid">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="step-card">
                <div className="step-num-pill">{step.num}</div>
                <div className="step-icon-circle">
                  <Icon size={26} className="text-orange" />
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .how-it-works-section {
          padding: 80px 0;
          background: #FFFFFF;
        }

        .steps-flow-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          position: relative;
        }

        .step-card {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          padding: 32px 20px;
          text-align: center;
          position: relative;
          transition: all 0.3s ease;
        }

        .step-card:hover {
          transform: translateY(-4px);
          border-color: #FF6B00;
          box-shadow: 0 16px 30px rgba(255, 107, 0, 0.1);
        }

        .step-num-pill {
          position: absolute;
          top: 16px;
          right: 20px;
          font-family: var(--font-heading);
          font-size: 28px;
          font-weight: 800;
          color: #E2E8F0;
        }

        .step-icon-circle {
          width: 64px;
          height: 64px;
          background: #FFFFFF;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px auto;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
          border: 2px solid #FFF0E6;
        }

        .step-card h3 {
          font-size: 18px;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 10px;
        }

        .step-card p {
          font-size: 13px;
          color: #64748B;
          line-height: 1.6;
        }

        @media (max-width: 992px) {
          .steps-flow-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .steps-flow-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
