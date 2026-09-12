import React from 'react';
import { MapPin, X, Check, Flame } from 'lucide-react';
import { CITIES_DATA } from '../data/citiesData';
import { useBooking } from '../context/BookingContext';

export default function CitySelectorModal({ isOpen, onClose }) {
  const { selectedCity, setSelectedCity } = useBooking();

  if (!isOpen) return null;

  const popularCities = CITIES_DATA.filter((c) => c.popular);
  const otherCities = CITIES_DATA.filter((c) => !c.popular);

  const handleSelect = (cityId) => {
    setSelectedCity(cityId);
    onClose();
  };

  return (
    <div className="city-modal-overlay">
      <div className="city-modal-content animate-fade-in">
        <div className="city-modal-header">
          <div className="header-title">
            <MapPin className="text-orange" size={22} />
            <div>
              <h3>Select City for Rental</h3>
              <p>Choose your pickup location for self-drive cars</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="city-modal-body">
          <div className="city-section">
            <h4 className="section-label">
              <Flame size={16} className="text-orange" /> Popular Cities
            </h4>
            <div className="city-grid">
              {popularCities.map((city) => {
                const isSelected = selectedCity === city.id;
                return (
                  <button
                    key={city.id}
                    className={`city-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelect(city.id)}
                  >
                    <div className="city-info">
                      <span className="city-name">{city.name}</span>
                      <span className="city-code">{city.code}</span>
                    </div>
                    {isSelected && <Check size={18} className="check-icon" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="city-section">
            <h4 className="section-label">Other Cities</h4>
            <div className="city-grid">
              {otherCities.map((city) => {
                const isSelected = selectedCity === city.id;
                return (
                  <button
                    key={city.id}
                    className={`city-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelect(city.id)}
                  >
                    <div className="city-info">
                      <span className="city-name">{city.name}</span>
                      <span className="city-code">{city.code}</span>
                    </div>
                    {isSelected && <Check size={18} className="check-icon" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .city-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(8px);
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .city-modal-content {
          background: #FFFFFF;
          width: 100%;
          max-width: 650px;
          border-radius: 20px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          border: 1px solid rgba(226, 232, 240, 0.8);
        }

        .city-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 28px;
          border-bottom: 1px solid #F1F5F9;
          background: #FAFBFD;
        }

        .header-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .text-orange {
          color: #FF6B00;
        }

        .header-title h3 {
          font-size: 20px;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 2px;
        }

        .header-title p {
          font-size: 13px;
          color: #64748B;
        }

        .close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748B;
          background: #F1F5F9;
          transition: all 0.2s ease;
        }

        .close-btn:hover {
          background: #E2E8F0;
          color: #0F172A;
        }

        .city-modal-body {
          padding: 24px 28px;
          max-height: 70vh;
          overflow-y: auto;
        }

        .city-section {
          margin-bottom: 24px;
        }

        .city-section:last-child {
          margin-bottom: 0;
        }

        .section-label {
          font-size: 14px;
          font-weight: 700;
          color: #475569;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .city-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 12px;
        }

        .city-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          border-radius: 12px;
          border: 1px solid #E2E8F0;
          background: #FFFFFF;
          transition: all 0.2s ease;
          text-align: left;
        }

        .city-card:hover {
          border-color: #FF6B00;
          background: #FFF9F5;
          transform: translateY(-1px);
        }

        .city-card.selected {
          border-color: #FF6B00;
          background: #FFF0E6;
          box-shadow: 0 4px 12px rgba(255, 107, 0, 0.15);
        }

        .city-name {
          display: block;
          font-weight: 600;
          font-size: 14px;
          color: #0F172A;
        }

        .city-code {
          display: block;
          font-size: 11px;
          color: #94A3B8;
          font-weight: 600;
        }

        .check-icon {
          color: #FF6B00;
        }

        @media (max-width: 640px) {
          .city-modal-content {
            border-radius: 16px;
          }
          .city-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
}
