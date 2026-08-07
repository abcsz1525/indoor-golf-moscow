import { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { YClientsModal } from './components/YClientsModal';
import { yclientsEnabled, LEAD_ONLY_INTERESTS } from './config/booking';
import { CustomCursor } from './components/CustomCursor';

const HomePage = lazy(() => import('./pages/HomePage').then((module) => ({ default: module.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((module) => ({ default: module.AboutPage })));
const TechPage = lazy(() => import('./pages/TechPage').then((module) => ({ default: module.TechPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then((module) => ({ default: module.GalleryPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((module) => ({ default: module.ServicesPage })));
const EventsPage = lazy(() => import('./pages/EventsPage').then((module) => ({ default: module.EventsPage })));
const ContactsPage = lazy(() => import('./pages/ContactsPage').then((module) => ({ default: module.ContactsPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then((module) => ({ default: module.PrivacyPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })));

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
      <CustomCursor />
      <div id="app-shell" className="min-h-screen bg-bg-primary" style={{ color: 'var(--text-primary)' }}>
        <Navbar onBooking={() => openBooking()} />
        <main>
          <Suspense fallback={<div className="min-h-[60vh]" aria-label="Загрузка страницы" />}>
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
          </Suspense>
        </main>
        <Footer />
      </div>
      <BookingModal
        key={`lead-${bookingOpen ? 'open' : 'closed'}-${bookingInterest ?? ''}`}
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
    </BrowserRouter>
  );
}

export default App;
