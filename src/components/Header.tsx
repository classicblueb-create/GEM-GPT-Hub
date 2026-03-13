// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => (
  <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 flex justify-between items-center">
    <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">gemssnap</Link>
    <nav className="space-x-4">
      <Link to="/" className="text-gray-600 dark:text-gray-300">Home</Link>
    </nav>
  </header>
);
