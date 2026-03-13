// src/components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
      <div>
        <h4 className="font-bold text-gray-900 dark:text-white mb-4">Resources</h4>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li><Link to="/resources">Resources</Link></li>
          <li><Link to="/user-guide">User Guide</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/help-center">Help Center</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-gray-900 dark:text-white mb-4">Legal</h4>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li><Link to="/legal">Legal</Link></li>
          <li><Link to="/terms-of-service">Terms of Service</Link></li>
          <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          <li><Link to="/cookie-policy">Cookie Policy</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-gray-900 dark:text-white mb-4">Contact</h4>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li><Link to="/contact-us">Contact Us</Link></li>
        </ul>
      </div>
    </div>
  </footer>
);
