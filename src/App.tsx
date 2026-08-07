import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { YClientsModal } from './components/YClientsModal';
import { yclientsEnabled, LEAD_ONLY_INTERESTS } from './config/booking';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { TechPage } from './pages/TechPage';
import { GalleryPage } from './pages/GalleryPage';
import { ServicesPage } from './pages/ServicesPage';
import { EventsPage } from './pages/EventsPage';
import { ContactsPage } from './pages/ContactsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingInterest, setBookingInterest] = useState<string | undefined>(undefined);
  const [yclientsOpen, setYclientsOpen] = useState(false);

  // Telegram-форма заявки (для корпоративов, вопросов и как фолбэк).
  const openLeadForm = (interest?: string) => {
    setBookingInterest(interest);
    setBookingOpen(true);
  };

  // Основной вход «Записаться»: слоты — в YClients, нестандартное — в форму.
  const openBooking = (interest?: string) => {
    if (yclientsEnabled() && !LEAD_ONLY_INTERESTS.has(interest ?? '')) {
      setYclientsOpen(true);
    } else {
      openLeadForm(interest);
    }
  };

  return (
    <BrowserRouter>
      <Preloader />
      <CustomCursor />
      <div className="min-h-screen bg-bg-primary" style={{ color: 'var(--text-primary)' }}>
        <Navbar onBooking={() => openBooking()} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage onBooking={openBooking} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/tech" element={<TechPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/services" element={<ServicesPage onBooking={openBooking} />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <BookingModal
          open={bookingOpen}
          interest={bookingInterest}
          onClose={() => setBookingOpen(false)}
        />
        <YClientsModal
          open={yclientsOpen}
          onClose={() => setYclientsOpen(false)}
          onLeadFallback={() => {
            setYclientsOpen(false);
            openLeadForm('Корпоратив');
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
