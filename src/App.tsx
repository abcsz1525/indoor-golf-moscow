import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Advantages } from './components/Advantages';
import { ForWhom } from './components/ForWhom';
import { Activities } from './components/Activities';
import { TrackMan } from './components/TrackMan';
import { Gallery } from './components/Gallery';
import { Events } from './components/Events';
import { Formats } from './components/Formats';
import { Location } from './components/Location';
import { BookingForm } from './components/BookingForm';
import { Partners } from './components/Partners';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-bg-primary text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Advantages />
        <ForWhom />
        <Activities />
        <TrackMan />
        <Gallery />
        <Events />
        <Formats />
        <Location />
        <BookingForm />
        <Partners />
      </main>
      <Footer />
    </div>
  );
}

export default App;
