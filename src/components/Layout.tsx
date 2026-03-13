// src/components/Layout.tsx
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <div className="flex-grow">{children}</div>
    <Footer />
  </div>
);
