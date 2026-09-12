import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, ShieldCheck, CheckCircle2, Car, Tag, ArrowRight, User, Phone, Mail, FileText } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function BookingModal() {
  const {
    activeBookingCar,
    isBookingModalOpen,
    closeBookingModal,
    currentCityObj,
    pickupDate,
    pickupTime,
    dropDate,
    dropTime,
    packageType,
    durationInDays,
    bookingSuccessData,
    setBookingSuccessData
  } = useBooking();

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');

  // Form input state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    licenseNo: ''
  });

  if (!isBookingModalOpen || !activeBookingCar) return null;

  const multiplier = packageType === 'unlimited' ? 1.15 : 1.0;
  const baseRatePerDay = Math.round(activeBookingCar.dailyRate * multiplier);
  const totalBaseFare = baseRatePerDay * durationInDays;
  const refundableDeposit = activeBookingCar.deposit;
  const taxesAndFees = Math.round(totalBaseFare * 0.18); // 18% GST
  const grandTotal = Math.max(0, totalBaseFare + taxesAndFees - appliedDiscount + refundableDeposit);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'FIRST15') {
      const discount = Math.round(totalBaseFare * 0.15);
      setAppliedDiscount(discount);
      setCouponMsg(`Coupon FIRST15 applied! ₹${discount} saved.`);
    } else if (code === 'WEEKEND20') {
      const discount = 750;
      setAppliedDiscount(discount);
      setCouponMsg(`Coupon WEEKEND20 applied! ₹${discount} saved.`);
    } else {
      setAppliedDiscount(0);
      setCouponMsg('Invalid promo code. Try FIRST15 or WEEKEND20.');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const bookingId = 'MYC-' + Math.floor(100000 + Math.random() * 900000);
    setBookingSuccessData({
      bookingId,
      car: activeBookingCar,
      city: currentCityObj.name,
      pickup: `${pickupDate} at ${pickupTime}`,
      drop: `${dropDate} at ${dropTime}`,
      totalPaid: grandTotal,
      customer: formData
    });
  };

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal-content animate-fade-in">
        {/* Modal Header */}
        <div className="booking-modal-header">
          <div className="modal-header-title">
            <Car className="text-orange" size={24} />
            <div>
              <h3>Reserve {activeBookingCar.name}</h3>
              <p>Self Drive Rental Confirmation • {currentCityObj.name}</p>
            </div>
          </div>
          <button className="close-btn" onClick={closeBookingModal} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {bookingSuccessData ? (
          /* Success Screen */
          <div className="booking-success-wrapper animate-fade-in">
            <div className="success-icon-badge">
              <CheckCircle2 size={48} className="text-green" />
            </div>
            <h2>Booking Confirmed!</h2>
            <p className="success-sub">
              Your self-drive vehicle reservation is locked in. We have sent confirmation to <strong>{bookingSuccessData.customer.email || 'your email'}</strong>.
            </p>

            <div className="receipt-card">
              <div className="receipt-row">
                <span className="receipt-label">Booking Reference:</span>
                <span className="receipt-val highlight">{bookingSuccessData.bookingId}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Vehicle Reserved:</span>
                <span className="receipt-val">{bookingSuccessData.car.name}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Pick-up:</span>
                <span className="receipt-val">{bookingSuccessData.pickup}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Drop-off:</span>
                <span className="receipt-val">{bookingSuccessData.drop}</span>
              </div>
              <div className="receipt-row total">
                <span className="receipt-label">Total Amount:</span>
                <span className="receipt-val price">₹{bookingSuccessData.totalPaid.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button className="btn-primary w-full" onClick={closeBookingModal}>
              Done & Return to Fleets
            </button>
          </div>
        ) : (
          /* Normal Checkout Form */
          <div className="booking-modal-body">
            <div className="modal-grid">
              {/* Left Column: Car Specs & Itinerary */}
              <div className="modal-left-col">
                <div className="modal-car-preview">
                  <img src={activeBookingCar.image} alt={activeBookingCar.name} className="preview-image" />
                  <div className="preview-info">
                    <h4>{activeBookingCar.name}</h4>
                    <span className="preview-brand">{activeBookingCar.brand} • {activeBookingCar.category}</span>
                    <div className="preview-pills">
                      <span>{activeBookingCar.transmission}</span>
                      <span>{activeBookingCar.fuel}</span>
                      <span>{activeBookingCar.seats} Seats</span>
                    </div>
                  </div>
                </div>

                {/* Booking Itinerary Box */}
                <div className="itinerary-card">
                  <h4 className="card-section-title">Rental Summary</h4>
                  <div className="itinerary-item">
                    <MapPin size={16} className="text-orange" />
                    <div>
                      <span className="label">Pick-up City:</span>
                      <span className="val">{currentCityObj.name}</span>
                    </div>
                  </div>
                  <div className="itinerary-item">
                    <Calendar size={16} className="text-orange" />
                    <div>
                      <span className="label">Pick-up Date & Time:</span>
                      <span className="val">{pickupDate} ({pickupTime})</span>
                    </div>
                  </div>
                  <div className="itinerary-item">
                    <Clock size={16} className="text-orange" />
                    <div>
                      <span className="label">Drop-off Date & Time:</span>
                      <span className="val">{dropDate} ({dropTime})</span>
                    </div>
                  </div>
                  <div className="itinerary-item">
                    <ShieldCheck size={16} className="text-orange" />
                    <div>
                      <span className="label">Package Option:</span>
                      <span className="val">{packageType === 'unlimited' ? 'Unlimited KMs' : '120 KM/Day'}</span>
                    </div>
                  </div>
                </div>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyCoupon} className="coupon-box">
                  <div className="coupon-input-wrap">
                    <Tag size={16} className="text-muted" />
                    <input
                      type="text"
                      placeholder="Have a promo code? (e.g. FIRST15)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button type="submit" className="apply-btn">Apply</button>
                  </div>
                  {couponMsg && <span className="coupon-feedback">{couponMsg}</span>}
                </form>

                {/* Price Breakdown */}
                <div className="fare-breakdown-card">
                  <h4 className="card-section-title">Fare Breakup</h4>
                  <div className="fare-row">
                    <span>Base Fare ({durationInDays} days @ ₹{baseRatePerDay}/day):</span>
                    <span>₹{totalBaseFare.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="fare-row">
                    <span>GST & Taxes (18%):</span>
                    <span>₹{taxesAndFees.toLocaleString('en-IN')}</span>
                  </div>
                  {refundableDeposit > 0 && (
                    <div className="fare-row">
                      <span>Refundable Security Deposit:</span>
                      <span>₹{refundableDeposit.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {appliedDiscount > 0 && (
                    <div className="fare-row discount">
                      <span>Promo Discount:</span>
                      <span>-₹{appliedDiscount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="fare-divider" />
                  <div className="fare-row grand-total">
                    <span>Total Amount Payable:</span>
                    <span className="total-price">₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Customer Information Form */}
              <div className="modal-right-col">
                <form onSubmit={handleFormSubmit} className="driver-info-form">
                  <h4 className="card-section-title">Driver Information</h4>
                  <p className="form-subtext">Required for instant vehicle hand-over verification</p>

                  <div className="form-field">
                    <label><User size={14} /> Full Name (as on Driving License)</label>
                    <input
                      type="text"
                      placeholder="e.g. Dhiraj Mane"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>

                  <div className="form-field">
                    <label><Phone size={14} /> Mobile Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 9876543210"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-field">
                    <label><Mail size={14} /> Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. dhiraj@example.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-field">
                    <label><FileText size={14} /> Driving License Number</label>
                    <input
                      type="text"
                      placeholder="e.g. DL-1420110012345"
                      required
                      value={formData.licenseNo}
                      onChange={(e) => setFormData({ ...formData, licenseNo: e.target.value })}
                    />
                  </div>

                  <div className="policy-checkbox">
                    <input type="checkbox" id="terms" required defaultChecked />
                    <label htmlFor="terms">
                      I accept MyChoize Self Drive terms & conditions, privacy policy, and age limit criteria (21+ yrs).
                    </label>
                  </div>

                  <button type="submit" className="btn-primary w-full submit-booking-btn">
                    <span>Confirm & Reserve Car</span>
                    <ArrowRight size={18} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .booking-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(10px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .booking-modal-content {
          background: #FFFFFF;
          width: 100%;
          max-width: 920px;
          max-height: 90vh;
          border-radius: 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .booking-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 28px;
          border-bottom: 1px solid #F1F5F9;
          background: #FAFBFD;
          position: sticky;
          top: 0;
          z-index: 5;
        }

        .modal-header-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .modal-header-title h3 {
          font-size: 20px;
          font-weight: 700;
          color: #0F172A;
        }

        .modal-header-title p {
          font-size: 13px;
          color: #64748B;
        }

        .booking-modal-body {
          padding: 28px;
        }

        .modal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
        }

        .modal-car-preview {
          display: flex;
          gap: 16px;
          padding: 14px;
          background: #F8FAFC;
          border-radius: 16px;
          border: 1px solid #E2E8F0;
          margin-bottom: 18px;
        }

        .preview-image {
          width: 110px;
          height: 80px;
          object-fit: cover;
          border-radius: 12px;
        }

        .preview-info h4 {
          font-size: 16px;
          font-weight: 700;
          color: #0F172A;
        }

        .preview-brand {
          font-size: 12px;
          color: #64748B;
          display: block;
          margin-bottom: 6px;
        }

        .preview-pills {
          display: flex;
          gap: 6px;
        }

        .preview-pills span {
          background: #E2E8F0;
          color: #334155;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 6px;
        }

        .itinerary-card, .fare-breakdown-card, .driver-info-form {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 18px;
          padding: 18px;
          margin-bottom: 18px;
        }

        .card-section-title {
          font-size: 15px;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 14px;
          border-bottom: 1px solid #E2E8F0;
          padding-bottom: 8px;
        }

        .itinerary-item {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .itinerary-item .label {
          font-size: 12px;
          color: #64748B;
          display: block;
        }

        .itinerary-item .val {
          font-size: 13px;
          font-weight: 700;
          color: #0F172A;
        }

        .coupon-box {
          margin-bottom: 18px;
        }

        .coupon-input-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 6px 12px;
        }

        .coupon-input-wrap input {
          border: none;
          flex: 1;
          font-size: 13px;
          text-transform: uppercase;
        }

        .apply-btn {
          font-weight: 700;
          font-size: 13px;
          color: #FF6B00;
        }

        .coupon-feedback {
          display: block;
          font-size: 12px;
          color: #10B981;
          margin-top: 4px;
          font-weight: 600;
        }

        .fare-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #475569;
          margin-bottom: 8px;
        }

        .fare-row.discount {
          color: #10B981;
          font-weight: 600;
        }

        .fare-divider {
          height: 1px;
          background: #CBD5E1;
          margin: 12px 0;
        }

        .fare-row.grand-total {
          font-size: 16px;
          font-weight: 800;
          color: #0F172A;
        }

        .total-price {
          color: #FF6B00;
          font-size: 20px;
        }

        .form-subtext {
          font-size: 12px;
          color: #64748B;
          margin-bottom: 14px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 14px;
        }

        .form-field label {
          font-size: 12px;
          font-weight: 700;
          color: #475569;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .form-field input {
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px solid #E2E8F0;
          background: #FFFFFF;
          font-size: 14px;
        }

        .form-field input:focus {
          border-color: #FF6B00;
        }

        .policy-checkbox {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 11px;
          color: #64748B;
          margin-bottom: 18px;
        }

        .submit-booking-btn {
          padding: 14px;
          font-size: 16px;
          border-radius: 14px;
        }

        /* Success View */
        .booking-success-wrapper {
          padding: 40px 28px;
          text-align: center;
          max-width: 500px;
          margin: 0 auto;
        }

        .success-icon-badge {
          width: 80px;
          height: 80px;
          background: #ECFDF5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px auto;
        }

        .booking-success-wrapper h2 {
          font-size: 26px;
          color: #0F172A;
          margin-bottom: 8px;
        }

        .success-sub {
          font-size: 14px;
          color: #64748B;
          margin-bottom: 24px;
        }

        .receipt-card {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 24px;
          text-align: left;
        }

        .receipt-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 13px;
        }

        .receipt-val.highlight {
          font-weight: 800;
          color: #FF6B00;
        }

        .receipt-row.total {
          border-top: 1px solid #E2E8F0;
          padding-top: 10px;
          font-size: 15px;
          font-weight: 800;
        }

        .receipt-val.price {
          color: #FF6B00;
          font-size: 18px;
        }

        @media (max-width: 768px) {
          .modal-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
