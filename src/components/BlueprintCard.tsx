import React from 'react';
import { Blueprint } from '../data';
import { useAuth } from '../context/AuthContext';
import { Lock, Unlock } from 'lucide-react';

interface BlueprintCardProps {
  blueprint: Blueprint;
  onBlueprintClick: (blueprint: Blueprint | null) => void;
}

export const BlueprintCard: React.FC<BlueprintCardProps> = ({ blueprint, onBlueprintClick }) => {
  const { userTier } = useAuth();
  const isAccessible = userTier === 'vip' || (userTier === 'premium' && blueprint.tier !== 'vip') || (userTier === 'free' && blueprint.tier === 'free');

  return (
    <div
      className={`p-6 bg-white rounded-2xl shadow-md border ${isAccessible ? 'border-gray-200 hover:border-purple-500 cursor-pointer' : 'border-gray-100 opacity-70'}`}
      onClick={() => isAccessible && onBlueprintClick(blueprint)}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-purple-900">{blueprint.title}</h3>
        {isAccessible ? <Unlock size={16} className="text-green-500" /> : <Lock size={16} className="text-gray-400" />}
      </div>
      <p className="text-sm text-gray-600 mb-4">{blueprint.description}</p>
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${blueprint.tier === 'vip' ? 'bg-purple-100 text-purple-800' : blueprint.tier === 'premium' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800'}`}>
        {blueprint.tier.toUpperCase()}
      </span>
    </div>
  );
};
