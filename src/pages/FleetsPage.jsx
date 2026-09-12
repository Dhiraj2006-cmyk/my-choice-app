import React, { useState } from 'react';
import { SlidersHorizontal, MapPin, Calendar, Clock, RotateCcw, X, Car, ArrowUpDown } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import FleetFilters from '../components/FleetFilters';
import FleetCard from '../components/FleetCard';
import CitySelectorModal from '../components/CitySelectorModal';

export default function FleetsPage() {
  const {
    currentCityObj,
    pickupDate,
    pickupTime,
    dropDate,
    dropTime,
    durationInDays,
    packageType,
    filteredCars,
    sortBy,
    setSortBy,
    selectedCategories,
    setSelectedCategories,
    selectedTransmissions,
    setSelectedTransmissions,
    selectedFuels,
    setSelectedFuels,
    selectedSeats,
    setSelectedSeats,
    clearAllFilters
  } = useBooking();

  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const activeFiltersCount =
    selectedCategories.length +
    selectedTransmissions.length +
    selectedFuels.length +
    selectedSeats.length;

  return (
    <div className="fleets-page-container">
      {/* Top Search Context Bar */}
      <div className="fleets-search-header">
        <div className="container fleets-header-inner">
          <div className="search-summary-group">
            <div className="summary-pill" onClick={() => setIsCityModalOpen(true)}>
              <MapPin size={16} className="text-orange" />
              <div>
                <span className="pill-sub">City</span>
                <span className="pill-main">{currentCityObj.name}</span>
              </div>
            </div>

            <div className="summary-pill">
              <Calendar size={16} className="text-orange" />
              <div>
                <span className="pill-sub">Dates ({durationInDays} Days)</span>
                <span className="pill-main">{pickupDate} → {dropDate}</span>
              </div>
            </div>

            <div className="summary-pill">
              <Clock size={16} className="text-orange" />
              <div>
                <span className="pill-sub">Times</span>
                <span className="pill-main">{pickupTime} - {dropTime}</span>
              </div>
            </div>

            <div className="summary-pill">
              <div>
                <span className="pill-sub">Package</span>
                <span className="pill-main">{packageType === 'unlimited' ? 'Unlimited KMs' : '120 KM/Day'}</span>
              </div>
            </div>
          </div>

          <button className="modify-search-btn" onClick={() => setIsCityModalOpen(true)}>
            Modify Location
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container fleets-body">
        {/* Results Header */}
        <div className="fleets-results-bar">
          <div className="results-info">
            <h2>Available Self Drive Cars in {currentCityObj.name}</h2>
            <span className="results-count">Showing {filteredCars.length} vehicles</span>
          </div>

          <div className="sort-and-mobile-filter">
            {/* Mobile Filter Drawer Toggle Button */}
            <button
              className="mobile-filter-toggle-btn"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            >
              <SlidersHorizontal size={16} /> Filters ({activeFiltersCount})
            </button>

            {/* Sort Selector */}
            <div className="sort-dropdown-wrap">
              <ArrowUpDown size={15} className="text-muted" />
              <span className="sort-label">Sort:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="recommended">Recommended</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="active-chips-bar animate-fade-in">
            <span className="active-chips-title">Active Filters:</span>
            {selectedCategories.map((cat) => (
              <span key={cat} className="chip">
                {cat}
                <X size={12} onClick={() => setSelectedCategories(selectedCategories.filter((c) => c !== cat))} />
              </span>
            ))}
            {selectedTransmissions.map((t) => (
              <span key={t} className="chip">
                {t}
                <X size={12} onClick={() => setSelectedTransmissions(selectedTransmissions.filter((item) => item !== t))} />
              </span>
            ))}
            {selectedFuels.map((f) => (
              <span key={f} className="chip">
                {f}
                <X size={12} onClick={() => setSelectedFuels(selectedFuels.filter((item) => item !== f))} />
              </span>
            ))}
            {selectedSeats.map((s) => (
              <span key={s} className="chip">
                {s} Seater
                <X size={12} onClick={() => setSelectedSeats(selectedSeats.filter((item) => item !== s))} />
              </span>
            ))}
            <button className="clear-chips-link" onClick={clearAllFilters}>
              <RotateCcw size={12} /> Clear All
            </button>
          </div>
        )}

        {/* Grid Layout: Sidebar + Fleet Cards */}
        <div className="fleets-main-grid">
          {/* Desktop Filter Sidebar */}
          <div className="desktop-sidebar-wrap">
            <FleetFilters />
          </div>

          {/* Fleets Content Area */}
          <div className="fleets-grid-column">
            {filteredCars.length > 0 ? (
              <div className="grid-responsive">
                {filteredCars.map((car) => (
                  <FleetCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="empty-fleet-state glass-panel">
                <Car size={48} className="text-orange mb-3" />
                <h3>No Cars Match Your Filter Criteria</h3>
                <p>Try adjusting your category, transmission, or fuel filters to view available vehicles in {currentCityObj.name}.</p>
                <button className="btn-primary mt-4" onClick={clearAllFilters}>
                  <RotateCcw size={16} /> Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer Overlay */}
      {mobileFilterOpen && (
        <div className="mobile-filter-drawer-overlay">
          <div className="mobile-filter-drawer-content animate-fade-in">
            <div className="drawer-header">
              <h3>Filter Cars</h3>
              <button className="close-btn" onClick={() => setMobileFilterOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="drawer-body">
              <FleetFilters />
              <button className="btn-primary w-full mt-4" onClick={() => setMobileFilterOpen(false)}>
                Apply Filters ({filteredCars.length} Cars)
              </button>
            </div>
          </div>
        </div>
      )}

      <CitySelectorModal isOpen={isCityModalOpen} onClose={() => setIsCityModalOpen(false)} />

      <style>{`
        .fleets-page-container {
          padding-bottom: 80px;
          background: #F8FAFC;
          min-height: 80vh;
        }

        .fleets-search-header {
          background: #0F172A;
          color: #FFFFFF;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .fleets-header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .search-summary-group {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .summary-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.08);
          padding: 8px 14px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
        }

        .pill-sub {
          display: block;
          font-size: 10px;
          color: #94A3B8;
          text-transform: uppercase;
        }

        .pill-main {
          display: block;
          font-size: 13px;
          font-weight: 700;
          color: #FFFFFF;
        }

        .modify-search-btn {
          background: #FF6B00;
          color: #FFFFFF;
          font-weight: 700;
          font-size: 13px;
          padding: 10px 18px;
          border-radius: 12px;
          transition: all 0.2s;
        }

        .modify-search-btn:hover {
          background: #E05D00;
        }

        .fleets-body {
          margin-top: 32px;
        }

        .fleets-results-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .results-info h2 {
          font-size: 24px;
          color: #0F172A;
        }

        .results-count {
          font-size: 13px;
          color: #64748B;
        }

        .sort-and-mobile-filter {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .mobile-filter-toggle-btn {
          display: none;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          font-weight: 700;
          font-size: 13px;
          color: #0F172A;
        }

        .sort-dropdown-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          padding: 8px 14px;
          border-radius: 12px;
        }

        .sort-label {
          font-size: 13px;
          font-weight: 600;
          color: #64748B;
        }

        .sort-dropdown-wrap select {
          border: none;
          background: transparent;
          font-size: 13px;
          font-weight: 700;
          color: #0F172A;
          cursor: pointer;
        }

        .active-chips-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 24px;
          background: #FFFFFF;
          padding: 12px 18px;
          border-radius: 14px;
          border: 1px solid #E2E8F0;
        }

        .active-chips-title {
          font-size: 13px;
          font-weight: 700;
          color: #475569;
        }

        .chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #FFF0E6;
          color: #FF6B00;
          font-size: 12px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 99px;
        }

        .chip svg {
          cursor: pointer;
        }

        .clear-chips-link {
          font-size: 12px;
          font-weight: 700;
          color: #64748B;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-left: 8px;
        }

        .fleets-main-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 28px;
        }

        .empty-fleet-state {
          text-align: center;
          padding: 60px 24px;
          border-radius: 20px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
        }

        .empty-fleet-state h3 {
          font-size: 20px;
          color: #0F172A;
          margin-bottom: 8px;
        }

        .empty-fleet-state p {
          font-size: 14px;
          color: #64748B;
          max-width: 450px;
          margin: 0 auto;
        }

        .mobile-filter-drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(6px);
          z-index: 1000;
          display: flex;
          justify-content: flex-end;
        }

        .mobile-filter-drawer-content {
          background: #FFFFFF;
          width: 100%;
          max-width: 360px;
          height: 100%;
          overflow-y: auto;
          padding: 24px;
        }

        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        @media (max-width: 992px) {
          .fleets-main-grid {
            grid-template-columns: 1fr;
          }
          .desktop-sidebar-wrap {
            display: none;
          }
          .mobile-filter-toggle-btn {
            display: flex;
          }
        }
      `}</style>
    </div>
  );
}
