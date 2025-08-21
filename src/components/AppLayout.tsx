import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Partners from '@/pages/Partners';
import Products from '@/pages/Products';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import Login from '@/pages/Login';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;