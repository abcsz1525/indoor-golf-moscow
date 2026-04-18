import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { TechPage } from './pages/TechPage';
import { GalleryPage } from './pages/GalleryPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactsPage } from './pages/ContactsPage';

function App() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg-primary text-neutral-900">
        <Navbar onBooking={() => setBookingOpen(true)} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage onBooking={() => setBookingOpen(true)} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/tech" element={<TechPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
          </Routes>
        </main>
        <Footer />
        <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
      </div>
    </BrowserRouter>
  );
}

export default App;
