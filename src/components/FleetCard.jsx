import React from 'react';
import { Users, Briefcase, Fuel, Zap, Star, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function FleetCard({ car }) {
  const { durationInDays, packageType, openBookingModal } = useBooking();

  const multiplier = packageType === 'unlimited' ? 1.15 : 1.0;
  const calculatedDailyRate = Math.round(car.dailyRate * multiplier);
  const totalTripPrice = calculatedDailyRate * durationInDays;

  return (
    <div className="fleet-card animate-fade-in">
      {/* Car Image Header */}
      <div className="card-image-wrapper">
        <img src={car.image} alt={car.name} className="car-image" loading="lazy" />
        
        {/* Overlay Badges */}
        <div className="card-top-badges">
          <span className="badge badge-orange">{car.category}</span>
          {car.deposit === 0 && (
            <span className="badge badge-green">
              <ShieldCheck size={12} /> Zero Deposit
            </span>
          )}
        </div>

        {/* Transmission & Fuel Overlay */}
        <div className="card-bottom-pills">
          <span className="pill-badge">{car.transmission}</span>
          <span className="pill-badge">
            {car.fuel === 'Electric' ? <Zap size={11} className="text-purple" /> : <Fuel size={11} />}
            {car.fuel}
          </span>
        </div>
      </div>

      {/* Car Content Info */}
      <div className="card-content">
        <div className="card-title-row">
          <div>
            <span className="brand-name">{car.brand}</span>
            <h3 className="car-model-name">{car.name}</h3>
          </div>
          <div className="rating-badge">
            <Star size={13} fill="#F59E0B" className="text-amber" />
            <span className="rating-num">{car.rating}</span>
            <span className="trips-count">({car.tripsCount})</span>
          </div>
        </div>

        {/* Car Key Attributes */}
        <div className="specs-row">
          <div className="spec-item">
            <Users size={14} className="text-muted" />
            <span>{car.seats} Seats</span>
          </div>
          <div className="spec-item">
            <Briefcase size={14} className="text-muted" />
            <span>{car.luggage} Bags</span>
          </div>
          <div className="spec-item">
            <Check size={14} className="text-orange" />
            <span>{packageType === 'unlimited' ? 'Unlimited KMs' : '120 KM/Day'}</span>
          </div>
        </div>

        <div className="card-divider" />

        {/* Price & CTA */}
        <div className="card-price-footer">
          <div className="price-group">
            <div className="daily-rate-wrap">
              <span className="price-currency">₹</span>
              <span className="price-amount">{calculatedDailyRate.toLocaleString('en-IN')}</span>
              <span className="price-unit">/ day</span>
            </div>
            <span className="total-estimate">
              Total: <strong>₹{totalTripPrice.toLocaleString('en-IN')}</strong> ({durationInDays} {durationInDays === 1 ? 'day' : 'days'})
            </span>
          </div>

          <button
            className="btn-primary book-now-btn"
            onClick={() => openBookingModal(car)}
          >
            <span>Book</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .fleet-card {
          background: #FFFFFF;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid #E2E8F0;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
        }

        .fleet-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 35px rgba(15, 23, 42, 0.12);
          border-color: #FF6B00;
        }

        .card-image-wrapper {
          position: relative;
          width: 100%;
          height: 190px;
          background: #F1F5F9;
          overflow: hidden;
        }

        .car-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .fleet-card:hover .car-image {
          transform: scale(1.06);
        }

        .card-top-badges {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          gap: 6px;
          z-index: 2;
        }

        .card-bottom-pills {
          position: absolute;
          bottom: 12px;
          right: 12px;
          display: flex;
          gap: 6px;
          z-index: 2;
        }

        .pill-badge {
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(8px);
          color: #FFFFFF;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 99px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .card-content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-title-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .brand-name {
          font-size: 11px;
          font-weight: 700;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .car-model-name {
          font-size: 17px;
          font-weight: 700;
          color: #0F172A;
          line-height: 1.2;
        }

        .rating-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          background: #FEF3C7;
          padding: 4px 8px;
          border-radius: 8px;
        }

        .text-amber {
          color: #F59E0B;
        }

        .rating-num {
          font-size: 12px;
          font-weight: 800;
          color: #78350F;
        }

        .trips-count {
          font-size: 10px;
          color: #92400E;
        }

        .specs-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .spec-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 600;
          color: #475569;
        }

        .card-divider {
          height: 1px;
          background: #F1F5F9;
          margin-top: auto;
          margin-bottom: 16px;
        }

        .card-price-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .daily-rate-wrap {
          display: flex;
          align-items: baseline;
          gap: 2px;
        }

        .price-currency {
          font-size: 16px;
          font-weight: 800;
          color: #FF6B00;
        }

        .price-amount {
          font-size: 22px;
          font-weight: 800;
          color: #0F172A;
          font-family: var(--font-heading);
        }

        .price-unit {
          font-size: 12px;
          color: #64748B;
          margin-left: 2px;
        }

        .total-estimate {
          display: block;
          font-size: 11px;
          color: #64748B;
        }

        .book-now-btn {
          padding: 10px 18px;
          border-radius: 12px;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
