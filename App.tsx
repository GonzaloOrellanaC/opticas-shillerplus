import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Products } from './components/Products';
import { Assistant } from './components/Assistant';
import { Appointment } from './components/Appointment';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Products />
        <Appointment />
        <Assistant />
      </main>
      <Footer />
    </div>
  );
};

export default App;