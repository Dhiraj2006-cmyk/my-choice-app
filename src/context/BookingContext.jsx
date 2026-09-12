import React, { createContext, useContext, useState, useMemo } from 'react';
import { CARS_DATA } from '../data/carsData';
import { CITIES_DATA } from '../data/citiesData';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState('delhi');
  const [rentalType, setRentalType] = useState('daily'); // 'daily' or 'subscription'
  
  // Dates initialization
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const returnDate = new Date(tomorrow);
  returnDate.setDate(returnDate.getDate() + 2);

  const formatDateStr = (dateObj) => dateObj.toISOString().split('T')[0];

  const [pickupDate, setPickupDate] = useState(formatDateStr(tomorrow));
  const [pickupTime, setPickupTime] = useState('09:00');
  const [dropDate, setDropDate] = useState(formatDateStr(returnDate));
  const [dropTime, setDropTime] = useState('21:00');
  const [packageType, setPackageType] = useState('unlimited'); // '120km' or 'unlimited'

  // Navigation State
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'fleets', 'offers', 'how-it-works'

  // Fleet Filter States
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState([]);
  const [selectedFuels, setSelectedFuels] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

  // Booking Modal State
  const [activeBookingCar, setActiveBookingCar] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingSuccessData, setBookingSuccessData] = useState(null);

  // User Auth State
  const [user, setUser] = useState(null); // { name, email, phone } when logged in
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Calculate rental duration in days & hours
  const durationInDays = useMemo(() => {
    try {
      const pDateTime = new Date(`${pickupDate}T${pickupTime}`);
      const dDateTime = new Date(`${dropDate}T${dropTime}`);
      const diffMs = dDateTime - pDateTime;
      if (isNaN(diffMs) || diffMs <= 0) return 1;
      const hours = Math.ceil(diffMs / (1000 * 60 * 60));
      return Math.max(1, Math.ceil(hours / 24));
    } catch {
      return 2;
    }
  }, [pickupDate, pickupTime, dropDate, dropTime]);

  // Filtered Cars logic
  const filteredCars = useMemo(() => {
    return CARS_DATA.filter((car) => {
      // City check
      if (selectedCity && car.availableCities !== 'all' && !car.availableCities.includes(selectedCity)) {
        return false;
      }
      // Category check
      if (selectedCategories.length > 0 && !selectedCategories.includes(car.category)) {
        return false;
      }
      // Transmission check
      if (selectedTransmissions.length > 0 && !selectedTransmissions.includes(car.transmission)) {
        return false;
      }
      // Fuel check
      if (selectedFuels.length > 0 && !selectedFuels.includes(car.fuel)) {
        return false;
      }
      // Seats check
      if (selectedSeats.length > 0 && !selectedSeats.includes(car.seats)) {
        return false;
      }
      // Max Price check
      if (car.dailyRate > maxPrice) {
        return false;
      }
      // Search Query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchName = car.name.toLowerCase().includes(query);
        const matchBrand = car.brand.toLowerCase().includes(query);
        const matchCategory = car.category.toLowerCase().includes(query);
        if (!matchName && !matchBrand && !matchCategory) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.dailyRate - b.dailyRate;
      if (sortBy === 'price_high') return b.dailyRate - a.dailyRate;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.tripsCount - a.tripsCount; // default recommended
    });
  }, [selectedCity, selectedCategories, selectedTransmissions, selectedFuels, selectedSeats, maxPrice, searchQuery, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedTransmissions([]);
    setSelectedFuels([]);
    setSelectedSeats([]);
    setMaxPrice(10000);
    setSearchQuery('');
    setSortBy('recommended');
  };

  const openBookingModal = (car) => {
    setActiveBookingCar(car);
    setIsBookingModalOpen(true);
    setBookingSuccessData(null);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setActiveBookingCar(null);
  };

  const currentCityObj = useMemo(() => {
    return CITIES_DATA.find((c) => c.id === selectedCity) || CITIES_DATA[0];
  }, [selectedCity]);

  return (
    <BookingContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
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
        activeTab,
        setActiveTab,
        // Filters
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
        sortBy,
        setSortBy,
        clearAllFilters,
        // Car Data
        filteredCars,
        totalCarsCount: CARS_DATA.length,
        // Modal
        activeBookingCar,
        openBookingModal,
        closeBookingModal,
        isBookingModalOpen,
        bookingSuccessData,
        setBookingSuccessData,
        // User Auth
        user,
        setUser,
        isAuthModalOpen,
        setIsAuthModalOpen
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
