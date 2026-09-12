import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Search, Gauge, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import CitySelectorModal from './CitySelectorModal';

export default function SearchWidget() {
  const {
    currentCityObj,
    rentalType,
    setRentalType,
    pickupDate,
    setPickupDate,
    pickupTime,
    setPickupTime,
    dropDate,
    setDropDate,
    dropTime,
    setDropTime,
    packageType,
    setPackageType,
    durationInDays,
    setActiveTab
  } = useBooking();

  const [isCityModalOpen, setIsCityModalOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveTab('fleets');
  };

  return (
    <div className="search-widget-card glass-panel">
      {/* Search Header Tabs */}
      <div className="search-tabs">
        <button
          type="button"
          className={`search-tab ${rentalType === 'daily' ? 'active' : ''}`}
          onClick={() => setRentalType('daily')}
        >
          <Sparkles size={16} /> Daily & Hourly Rental
        </button>
        <button
          type="button"
          className={`search-tab ${rentalType === 'subscription' ? 'active' : ''}`}
          onClick={() => setRentalType('subscription')}
        >
          <Calendar size={16} /> Monthly Subscription <span className="tab-badge">SAVE 45%</span>
        </button>
      </div>

      <form onSubmit={handleSearchSubmit} className="search-form-grid">
        {/* City Input */}
        <div className="form-field-group" onClick={() => setIsCityModalOpen(true)}>
          <label className="field-label">
            <MapPin size={15} className="text-orange" /> Pick-up City
          </label>
          <div className="field-input-box clickable">
            <div>
              <span className="field-primary-text">{currentCityObj.name}</span>
              <span className="field-sub-text">Self Drive Service</span>
            </div>
            <span className="change-link">Change</span>
          </div>
        </div>

        {/* Pickup Date & Time */}
        <div className="form-field-group">
          <label className="field-label">
            <Calendar size={15} className="text-orange" /> Pick-up Date & Time
          </label>
          <div className="field-input-box split">
            <input
              type="date"
              className="date-input"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              required
            />
            <select
              className="time-select"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
            >
              <option value="06:00">06:00 AM</option>
              <option value="09:00">09:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="15:00">03:00 PM</option>
              <option value="18:00">06:00 PM</option>
              <option value="21:00">09:00 PM</option>
            </select>
          </div>
        </div>

        {/* Return Date & Time */}
        <div className="form-field-group">
          <label className="field-label">
            <Clock size={15} className="text-orange" /> Drop-off Date & Time
          </label>
          <div className="field-input-box split">
            <input
              type="date"
              className="date-input"
              value={dropDate}
              onChange={(e) => setDropDate(e.target.value)}
              required
            />
            <select
              className="time-select"
              value={dropTime}
              onChange={(e) => setDropTime(e.target.value)}
            >
              <option value="06:00">06:00 AM</option>
              <option value="09:00">09:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="15:00">03:00 PM</option>
              <option value="18:00">06:00 PM</option>
              <option value="21:00">09:00 PM</option>
            </select>
          </div>
        </div>

        {/* Package Selector */}
        <div className="form-field-group">
          <label className="field-label">
            <Gauge size={15} className="text-orange" /> Mileage Package
          </label>
          <div className="package-toggle-box">
            <button
              type="button"
              className={`package-btn ${packageType === '120km' ? 'selected' : ''}`}
              onClick={() => setPackageType('120km')}
            >
              <span>120 KM / Day</span>
            </button>
            <button
              type="button"
              className={`package-btn ${packageType === 'unlimited' ? 'selected' : ''}`}
              onClick={() => setPackageType('unlimited')}
            >
              <span>Unlimited KMs</span>
              <span className="popular-dot">★</span>
            </button>
          </div>
        </div>

        {/* Duration Pill & Search CTA */}
        <div className="search-cta-group">
          <div className="duration-pill">
            <span>Duration: <strong>{durationInDays} {durationInDays === 1 ? 'Day' : 'Days'}</strong></span>
          </div>
          <button type="submit" className="btn-primary search-submit-btn">
            <Search size={18} /> Search Cars
          </button>
        </div>
      </form>

      {/* Feature Badges under widget */}
      <div className="widget-footer-perks">
        <span className="perk-tag"><CheckCircle2 size={14} className="text-green" /> Free Delivery Available</span>
        <span className="perk-tag"><CheckCircle2 size={14} className="text-green" /> Zero Security Deposit</span>
        <span className="perk-tag"><CheckCircle2 size={14} className="text-green" /> Clean & Sanitized Fleet</span>
      </div>

      <CitySelectorModal isOpen={isCityModalOpen} onClose={() => setIsCityModalOpen(false)} />

      <style>{`
        .search-widget-card {
          border-radius: 24px;
          padding: 24px;
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.15);
          background: #FFFFFF;
        }

        .search-tabs {
          display: flex;
          gap: 12px;
          border-bottom: 2px solid #F1F5F9;
          margin-bottom: 24px;
          padding-bottom: 4px;
        }

        .search-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          font-weight: 700;
          font-size: 15px;
          color: #64748B;
          border-radius: 12px 12px 0 0;
          transition: all 0.2s ease;
          position: relative;
        }

        .search-tab:hover {
          color: #FF6B00;
        }

        .search-tab.active {
          color: #FF6B00;
        }

        .search-tab.active::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          right: 0;
          height: 3px;
          background: #FF6B00;
          border-radius: 4px;
        }

        .tab-badge {
          background: #10B981;
          color: #FFFFFF;
          font-size: 10px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 99px;
        }

        .search-form-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .form-field-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .field-label {
          font-size: 12px;
          font-weight: 700;
          color: #475569;
          display: flex;
          align-items: center;
          gap: 6px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .field-input-box {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 10px 14px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.2s ease;
        }

        .field-input-box.clickable {
          cursor: pointer;
        }

        .field-input-box:hover {
          border-color: #FF6B00;
          background: #FFFBF7;
        }

        .field-primary-text {
          display: block;
          font-weight: 700;
          font-size: 14px;
          color: #0F172A;
          line-height: 1.2;
        }

        .field-sub-text {
          display: block;
          font-size: 11px;
          color: #64748B;
        }

        .change-link {
          font-size: 12px;
          font-weight: 700;
          color: #FF6B00;
        }

        .field-input-box.split {
          gap: 8px;
        }

        .date-input {
          border: none;
          background: transparent;
          font-size: 13px;
          font-weight: 700;
          color: #0F172A;
          width: 60%;
          cursor: pointer;
        }

        .time-select {
          border: none;
          background: transparent;
          font-size: 12px;
          font-weight: 700;
          color: #475569;
          width: 40%;
          cursor: pointer;
        }

        .package-toggle-box {
          display: flex;
          background: #F1F5F9;
          padding: 4px;
          border-radius: 14px;
          height: 52px;
        }

        .package-btn {
          flex: 1;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 700;
          color: #64748B;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          transition: all 0.2s ease;
        }

        .package-btn.selected {
          background: #FFFFFF;
          color: #FF6B00;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        }

        .popular-dot {
          color: #F59E0B;
        }

        .search-cta-group {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 12px;
          padding-top: 16px;
          border-top: 1px dashed #E2E8F0;
        }

        .duration-pill {
          background: #FFF0E6;
          color: #FF6B00;
          padding: 8px 16px;
          border-radius: 99px;
          font-size: 13px;
        }

        .search-submit-btn {
          padding: 14px 32px;
          font-size: 16px;
          border-radius: 14px;
        }

        .widget-footer-perks {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-top: 18px;
          padding-top: 12px;
        }

        .perk-tag {
          font-size: 12px;
          font-weight: 600;
          color: #475569;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .text-green {
          color: #10B981;
        }

        @media (max-width: 1024px) {
          .search-form-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .search-form-grid {
            grid-template-columns: 1fr;
          }
          .search-cta-group {
            flex-direction: column;
            gap: 12px;
          }
          .search-submit-btn {
            width: 100%;
          }
          .widget-footer-perks {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}
