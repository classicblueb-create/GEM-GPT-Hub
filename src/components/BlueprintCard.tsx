import React from 'react';
import { Blueprint } from '../data';
import { useAuth } from '../context/AuthContext';
import { Lock, Unlock, Sparkles } from 'lucide-react';

interface BlueprintCardProps {
  blueprint: Blueprint;
  onBlueprintClick: (blueprint: Blueprint | null) => void;
}

export const BlueprintCard: React.FC<BlueprintCardProps> = ({ blueprint, onBlueprintClick }) => {
  const { userTier } = useAuth();
  const isAccessible = userTier === 'vip' || (userTier === 'premium' && blueprint.tier !== 'vip') || (userTier === 'free' && blueprint.tier === 'free');

  return (
    <div
      className={`relative group p-6 bg-white dark:bg-gray-900 rounded-[2rem] shadow-xl border transition-all duration-300 ${isAccessible ? 'border-gray-100 dark:border-gray-800 hover:border-purple-500/50 hover:shadow-purple-500/10 hover:-translate-y-1 cursor-pointer' : 'border-gray-100 dark:border-gray-800 opacity-60 grayscale-[50%]'}`}
      onClick={() => isAccessible && onBlueprintClick(blueprint)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-600 dark:text-purple-400">
              <Sparkles size={20} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">{blueprint.title}</h3>
          </div>
          {isAccessible ? <Unlock size={18} className="text-emerald-500" /> : <Lock size={18} className="text-gray-400" />}
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-2">{blueprint.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase ${blueprint.tier === 'vip' ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400' : blueprint.tier === 'premium' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}>
            {blueprint.tier}
          </span>
          
          {isAccessible && (
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              ดู Prompt <iconify-icon icon="lucide:arrow-right"></iconify-icon>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
