import React from 'react';
import { BookingProvider, useBooking } from './context/BookingContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import AuthModal from './components/AuthModal';
import HomePage from './pages/HomePage';
import FleetsPage from './pages/FleetsPage';
import OffersSection from './components/OffersSection';
import HowItWorks from './components/HowItWorks';

function MainAppContent() {
  const { activeTab } = useBooking();

  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'fleets' && <FleetsPage />}
        {activeTab === 'offers' && (
          <div style={{ paddingTop: '20px' }}>
            <OffersSection />
          </div>
        )}
        {activeTab === 'how-it-works' && (
          <div style={{ paddingTop: '20px' }}>
            <HowItWorks />
          </div>
        )}
      </main>

      <BookingModal />
      <AuthModal />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BookingProvider>
      <MainAppContent />
    </BookingProvider>
  );
}
