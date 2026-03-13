// src/pages/Resources.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export const Resources = () => (
  <div className="p-8 max-w-4xl mx-auto">
    <h1 className="text-4xl font-bold mb-6">Resources</h1>
    <p className="text-lg mb-4">Welcome to the gemssnap resources center. Here you can find tools, guides, and assets to help you get the most out of our platform.</p>
    <h2 className="text-2xl font-semibold mb-3">Available Tools</h2>
    <ul className="list-disc pl-5 mb-6">
      <li>GEM Maker: Create custom AI systems in seconds.</li>
      <li>Blueprint Hub: Access a library of pre-built AI prompts.</li>
    </ul>
    <Link to="/" className="text-purple-600 hover:underline">Back to Home</Link>
  </div>
);
