import React from 'react';
import { Filter, RotateCcw, Search, Car, Fuel, Users, Gauge, Check } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function FleetFilters() {
  const {
    selectedCategories,
    setSelectedCategories,
    selectedTransmissions,
    setSelectedTransmissions,
    selectedFuels,
    setSelectedFuels,
    selectedSeats,
    setSelectedSeats,
    maxPrice,
    setMaxPrice,
    searchQuery,
    setSearchQuery,
    clearAllFilters,
    filteredCars,
    totalCarsCount
  } = useBooking();

  const toggleItem = (list, setList, value) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const categoriesList = ['Hatchback', 'Sedan', 'SUV', 'EV', 'Luxury'];
  const transmissionList = ['Manual', 'Automatic'];
  const fuelList = ['Petrol', 'Diesel', 'Electric'];
  const seatsList = [5, 7];

  return (
    <aside className="fleet-filter-sidebar">
      <div className="filter-header">
        <div className="filter-title-group">
          <Filter size={18} className="text-orange" />
          <h3>Filter Fleets</h3>
          <span className="filter-count-badge">{filteredCars.length} / {totalCarsCount}</span>
        </div>
        <button className="clear-btn" onClick={clearAllFilters} title="Reset Filters">
          <RotateCcw size={14} /> Clear
        </button>
      </div>

      {/* Search Input Filter */}
      <div className="filter-section">
        <label className="filter-label">Search Car Model</label>
        <div className="search-filter-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="e.g. Swift, Creta, BMW..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Car Type / Category */}
      <div className="filter-section">
        <label className="filter-label">
          <Car size={15} /> Body Type
        </label>
        <div className="filter-chip-grid">
          {categoriesList.map((cat) => {
            const isSelected = selectedCategories.includes(cat);
            return (
              <button
                key={cat}
                type="button"
                className={`filter-chip ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleItem(selectedCategories, setSelectedCategories, cat)}
              >
                {isSelected && <Check size={12} />} {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Transmission */}
      <div className="filter-section">
        <label className="filter-label">
          <Gauge size={15} /> Transmission
        </label>
        <div className="filter-chip-grid">
          {transmissionList.map((trans) => {
            const isSelected = selectedTransmissions.includes(trans);
            return (
              <button
                key={trans}
                type="button"
                className={`filter-chip ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleItem(selectedTransmissions, setSelectedTransmissions, trans)}
              >
                {isSelected && <Check size={12} />} {trans}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fuel Type */}
      <div className="filter-section">
        <label className="filter-label">
          <Fuel size={15} /> Fuel Type
        </label>
        <div className="filter-chip-grid">
          {fuelList.map((fuel) => {
            const isSelected = selectedFuels.includes(fuel);
            return (
              <button
                key={fuel}
                type="button"
                className={`filter-chip ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleItem(selectedFuels, setSelectedFuels, fuel)}
              >
                {isSelected && <Check size={12} />} {fuel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Seating Capacity */}
      <div className="filter-section">
        <label className="filter-label">
          <Users size={15} /> Seating Capacity
        </label>
        <div className="filter-chip-grid">
          {seatsList.map((seat) => {
            const isSelected = selectedSeats.includes(seat);
            return (
              <button
                key={seat}
                type="button"
                className={`filter-chip ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleItem(selectedSeats, setSelectedSeats, seat)}
              >
                {isSelected && <Check size={12} />} {seat} Seater
              </button>
            );
          })}
        </div>
      </div>

      {/* Max Price Range */}
      <div className="filter-section">
        <div className="range-header">
          <label className="filter-label">Max Price / Day</label>
          <span className="price-val">₹{maxPrice.toLocaleString('en-IN')}</span>
        </div>
        <input
          type="range"
          min="1200"
          max="10000"
          step="200"
          className="price-slider"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
        <div className="slider-labels">
          <span>₹1,200</span>
          <span>₹10,000</span>
        </div>
      </div>

      <style>{`
        .fleet-filter-sidebar {
          background: #FFFFFF;
          border-radius: 20px;
          padding: 24px;
          border: 1px solid #E2E8F0;
          box-shadow: var(--shadow-sm);
          position: sticky;
          top: 100px;
        }

        .filter-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 16px;
          border-bottom: 1px solid #F1F5F9;
          margin-bottom: 20px;
        }

        .filter-title-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .filter-title-group h3 {
          font-size: 17px;
          font-weight: 700;
          color: #0F172A;
        }

        .filter-count-badge {
          background: #FFF0E6;
          color: #FF6B00;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 99px;
        }

        .clear-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 700;
          color: #64748B;
          transition: color 0.2s;
        }

        .clear-btn:hover {
          color: #FF6B00;
        }

        .filter-section {
          margin-bottom: 20px;
        }

        .filter-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          color: #475569;
          margin-bottom: 10px;
        }

        .search-filter-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-filter-box input {
          width: 100%;
          padding: 10px 14px 10px 38px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          font-size: 13px;
          color: #0F172A;
          transition: border-color 0.2s;
        }

        .search-filter-box input:focus {
          border-color: #FF6B00;
          background: #FFFFFF;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          color: #94A3B8;
        }

        .filter-chip-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .filter-chip {
          padding: 6px 12px;
          border-radius: 10px;
          border: 1px solid #E2E8F0;
          background: #F8FAFC;
          color: #475569;
          font-size: 12px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: all 0.2s ease;
        }

        .filter-chip:hover {
          border-color: #FF6B00;
          color: #FF6B00;
        }

        .filter-chip.selected {
          background: #FF6B00;
          color: #FFFFFF;
          border-color: #FF6B00;
          box-shadow: 0 2px 6px rgba(255, 107, 0, 0.25);
        }

        .range-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .price-val {
          font-size: 14px;
          font-weight: 800;
          color: #FF6B00;
        }

        .price-slider {
          width: 100%;
          accent-color: #FF6B00;
          margin-top: 6px;
          cursor: pointer;
        }

        .slider-labels {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: #94A3B8;
          margin-top: 4px;
        }
      `}</style>
    </aside>
  );
}
