// src/pages/UserGuide.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export const UserGuide = () => (
  <div className="p-8 max-w-4xl mx-auto">
    <h1 className="text-4xl font-bold mb-6">User Guide</h1>
    <p className="text-lg mb-4">Learn how to use gemssnap effectively. From creating your first GEM to sharing it with the community.</p>
    <h2 className="text-2xl font-semibold mb-3">Getting Started</h2>
    <ol className="list-decimal pl-5 mb-6">
      <li>Sign up/Log in.</li>
      <li>Use the GEM Maker to generate your first AI system.</li>
      <li>Save or export your GEM as a document.</li>
    </ol>
    <Link to="/" className="text-purple-600 hover:underline">Back to Home</Link>
  </div>
);
