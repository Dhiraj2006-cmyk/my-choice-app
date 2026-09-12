import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Sparkles, ChevronDown, ChevronUp, Star, Car } from 'lucide-react';
import SearchWidget from '../components/SearchWidget';
import FleetCard from '../components/FleetCard';
import WhyChooseUs from '../components/WhyChooseUs';
import HowItWorks from '../components/HowItWorks';
import OffersSection from '../components/OffersSection';
import TestimonialsSection from '../components/TestimonialsSection';
import AppDownloadBanner from '../components/AppDownloadBanner';
import { CARS_DATA } from '../data/carsData';
import { useBooking } from '../context/BookingContext';

export default function HomePage() {
  const { setActiveTab } = useBooking();
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('All');
  const [activeFaq, setActiveFaq] = useState(null);

  const categories = ['All', 'Hatchback', 'Sedan', 'SUV', 'EV', 'Luxury'];

  const featuredCars = CARS_DATA.filter((car) => {
    if (selectedCategoryTab === 'All') return true;
    return car.category === selectedCategoryTab;
  }).slice(0, 6);

  const faqs = [
    {
      q: 'What documents are required to rent a self-drive car with MyChoize?',
      a: 'You need a valid Original Indian Driving License (minimum 1 year old) and a valid Govt ID proof (Aadhaar Card, Passport, or Voter ID). Verification takes less than 2 minutes.'
    },
    {
      q: 'Is security deposit mandatory for all car bookings?',
      a: 'No! MyChoize offers Zero Security Deposit options on most popular Hatchbacks, Sedans, and EVs. Selected luxury models may require a nominal refundable deposit.'
    },
    {
      q: 'How does the Unlimited Kilometers package work?',
      a: 'With our Unlimited KMs package, there are no limits or per-kilometer penalties on how far you drive. You only pay for the fuel you consume!'
    },
    {
      q: 'Can I pick up the car in one city and drop it in another?',
      a: 'Yes, we offer one-way self-drive rentals between major metropolitan hubs including Delhi NCR, Jaipur, Mumbai, Pune, and Bengaluru.'
    },
    {
      q: 'What happens in case of a breakdown or vehicle issue?',
      a: 'MyChoize provides 24/7 Roadside Assistance across all national and state highways in India. Simply call our toll-free helpline 1800-208-1212.'
    }
  ];

  return (
    <div className="home-page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-inner">
          <div className="hero-text-content animate-fade-in">
            <span className="badge badge-orange hero-pill mb-3">
              <Sparkles size={14} /> INDIA'S TOP RATED SELF DRIVE CAR RENTAL
            </span>
            <h1 className="hero-title">
              Drive Your Way With <span className="text-orange-glow">Unlimited KMs</span> & Zero Deposit
            </h1>
            <p className="hero-subtitle">
              Choose from 1,000+ sanitized Hatchbacks, Sedans, SUVs, EVs & Luxury cars across 10+ major Indian cities.
            </p>

            <div className="hero-highlights">
              <span className="highlight-item"><ShieldCheck size={16} className="text-orange" /> Zero Security Deposit</span>
              <span className="highlight-item"><ShieldCheck size={16} className="text-orange" /> Unlimited KMs Freedom</span>
              <span className="highlight-item"><ShieldCheck size={16} className="text-orange" /> 24/7 Roadside Support</span>
            </div>
          </div>

          {/* Embedded Hero Search Widget */}
          <div className="hero-widget-wrapper animate-fade-in">
            <SearchWidget />
          </div>
        </div>
      </section>

      {/* Featured Fleets Preview */}
      <section className="featured-fleets-section">
        <div className="container">
          <div className="section-title-wrapper flex-between">
            <div>
              <span className="badge badge-orange mb-2">TRENDING VEHICLES</span>
              <h2>Explore Our Self Drive Fleet</h2>
            </div>

            {/* Category Filter Pills */}
            <div className="category-tabs-row">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`cat-tab-btn ${selectedCategoryTab === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategoryTab(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cars Grid */}
          <div className="grid-responsive mb-5">
            {featuredCars.map((car) => (
              <FleetCard key={car.id} car={car} />
            ))}
          </div>

          {/* View All Fleets CTA */}
          <div className="text-center">
            <button
              className="btn-primary view-all-btn"
              onClick={() => {
                setActiveTab('fleets');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>View Full Fleet ({CARS_DATA.length} Cars Available)</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Offers & Promo Section */}
      <OffersSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQ Accordion Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="badge badge-orange mb-2">FREQUENTLY ASKED QUESTIONS</span>
            <h2>Got Questions? We Have Answers</h2>
            <p>Everything you need to know about renting a self-drive car with MyChoize.</p>
          </div>

          <div className="faq-accordion-wrapper">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div key={index} className={`faq-card ${isOpen ? 'open' : ''}`}>
                  <button
                    className="faq-question-btn"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={20} className="text-orange" /> : <ChevronDown size={20} />}
                  </button>
                  {isOpen && (
                    <div className="faq-answer-content animate-fade-in">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* App Download Banner */}
      <AppDownloadBanner />

      <style>{`
        .hero-section {
          background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
          padding: 60px 0 80px 0;
          color: #FFFFFF;
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: -20%;
          right: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(255, 107, 0, 0.25) 0%, rgba(255, 107, 0, 0) 70%);
          border-radius: 50%;
        }

        .hero-inner {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        .hero-text-content {
          max-width: 800px;
        }

        .hero-title {
          font-size: 44px;
          font-weight: 800;
          line-height: 1.15;
          color: #FFFFFF;
          margin-bottom: 16px;
        }

        .text-orange-glow {
          color: #FF6B00;
          text-shadow: 0 0 20px rgba(255, 107, 0, 0.4);
        }

        .hero-subtitle {
          font-size: 18px;
          color: #CBD5E1;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .hero-highlights {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        .highlight-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #E2E8F0;
        }

        .featured-fleets-section {
          padding: 80px 0;
          background: #FFFFFF;
        }

        .flex-between {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 36px;
        }

        .category-tabs-row {
          display: flex;
          gap: 8px;
          background: #F1F5F9;
          padding: 4px;
          border-radius: 14px;
        }

        .cat-tab-btn {
          padding: 8px 18px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 700;
          color: #64748B;
          transition: all 0.2s ease;
        }

        .cat-tab-btn.active {
          background: #FF6B00;
          color: #FFFFFF;
          box-shadow: 0 4px 12px rgba(255, 107, 0, 0.3);
        }

        .view-all-btn {
          padding: 16px 36px;
          font-size: 16px;
          border-radius: 16px;
        }

        .text-center {
          text-align: center;
        }

        .faq-section {
          padding: 80px 0;
          background: #F8FAFC;
        }

        .faq-accordion-wrapper {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .faq-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.2s ease;
        }

        .faq-card.open {
          border-color: #FF6B00;
          box-shadow: 0 4px 14px rgba(255, 107, 0, 0.1);
        }

        .faq-question-btn {
          width: 100%;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 16px;
          font-weight: 700;
          color: #0F172A;
          text-align: left;
        }

        .faq-answer-content {
          padding: 0 24px 20px 24px;
          font-size: 14px;
          color: #475569;
          line-height: 1.6;
          border-top: 1px solid #F1F5F9;
          padding-top: 14px;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 32px;
          }
          .flex-between {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .category-tabs-row {
            flex-wrap: wrap;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
