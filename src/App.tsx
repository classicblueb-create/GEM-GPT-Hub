import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { blueprints, Blueprint } from './data';
import { BlueprintCard } from './components/BlueprintCard';
import { PromptGenerator } from './components/PromptGenerator';
import { LandingPage } from './components/LandingPage';
import { LayoutDashboard, Zap, Crown, User } from 'lucide-react';

const Dashboard = ({ onBack }: { onBack: () => void }) => {
  const { userTier, setUserTier, remainingRequests } = useAuth();
  const [selectedBlueprint, setSelectedBlueprint] = useState<Blueprint | null>(null);
  const [category, setCategory] = useState('All');

  const filteredBlueprints = category === 'All' ? blueprints : blueprints.filter(b => b.category === category);

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white p-6 border-r border-gray-200">
        <button onClick={onBack} className="text-sm text-gray-500 mb-4">← Back to Home</button>
        <h1 className="text-2xl font-bold text-purple-900 mb-8">GPTs & GEM Hub</h1>
        <nav className="space-y-4">
          {['All', 'Sales', 'Marketing', 'Content', 'Vibe Coding'].map(cat => (
            <button key={cat} className={`block w-full text-left p-3 rounded-xl ${category === cat ? 'bg-purple-100 text-purple-900' : 'text-gray-600'}`} onClick={() => setCategory(cat)}>
              {cat}
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-8">
          {userTier === 'vip' && (
            <div className="mb-6 p-4 bg-purple-900 text-white rounded-2xl shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs font-medium uppercase tracking-wider opacity-80">Monthly Requests</p>
                <span className="text-2xl font-bold">{remainingRequests} / 3</span>
              </div>
              <div className="w-full bg-purple-800 rounded-full h-2">
                <div 
                  className="bg-purple-300 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${(remainingRequests / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
          <label className="text-xs text-gray-500 uppercase">Membership</label>
          <select className="w-full mt-2 p-2 border rounded-xl" value={userTier} onChange={(e) => setUserTier(e.target.value as any)}>
            <option value="free">Free</option>
            <option value="premium">Premium</option>
            <option value="vip">VIP</option>
          </select>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlueprints.map(b => (
            <BlueprintCard key={b.id} blueprint={b} onBlueprintClick={(b) => setSelectedBlueprint(b)} />
          ))}
        </div>
      </main>
      {selectedBlueprint && <PromptGenerator blueprint={selectedBlueprint} onClose={() => setSelectedBlueprint(null)} />}
    </div>
  );
};

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <AuthProvider>
      {showDashboard ? (
        <Dashboard onBack={() => setShowDashboard(false)} />
      ) : (
        <LandingPage onGetStarted={() => setShowDashboard(true)} />
      )}
    </AuthProvider>
  );
}
