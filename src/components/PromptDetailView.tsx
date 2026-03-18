import React, { useState } from 'react';
import { Blueprint, blueprints } from '../data';
import { useAuth } from '../context/AuthContext';
import { Bookmark, ThumbsUp, ThumbsDown, Link as LinkIcon, Share2, Linkedin, Download, ChevronLeft, Trophy, Send, Home, Copy, Check } from 'lucide-react';
import { BlueprintCard } from './BlueprintCard';

interface PromptDetailViewProps {
  blueprint: Blueprint;
  onBack: () => void;
  onSelectBlueprint: (blueprint: Blueprint) => void;
}

export const PromptDetailView: React.FC<PromptDetailViewProps> = ({ blueprint, onBack, onSelectBlueprint }) => {
  const { userTier, favorites, toggleFavorite } = useAuth();
  const [copied, setCopied] = useState(false);

  const isFavorite = favorites.includes(blueprint.id);

  const handleCopy = () => {
    navigator.clipboard.writeText(blueprint.logic_template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFavorite = () => {
    toggleFavorite(blueprint.id);
  };

  // Get related prompts (same category)
  const relatedPrompts = blueprints
    .filter(b => b.category === blueprint.category && b.id !== blueprint.id)
    .slice(0, 3);

  // Get "You Might Also Like" prompts (different category or random)
  const mightLikePrompts = blueprints
    .filter(b => b.category !== blueprint.category && b.id !== blueprint.id)
    .slice(0, 3);

  const categories = [
    'Career & Personal Development',
    'Health & Wellness',
    'Parenting & Family',
    'Software Engineering',
    'Communication & Email',
    'Sales & Outreach',
    'Writing & Content',
    'Legal & Compliance'
  ];

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] dark:bg-gray-950 font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-[#FAFAFA] dark:bg-gray-950 hidden md:flex flex-col h-screen sticky top-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
            {/* Placeholder for AIOpenLibrary logo */}
            <span className="text-xl font-bold text-gray-600">🏛️</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">GPTs & GEM Hub</h1>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-4 mb-8">
            <li>
              <button onClick={onBack} className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                <Home size={20} />
                <span className="font-medium">Home</span>
              </button>
            </li>
          </ul>

          <div className="px-8 mb-2">
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Categories</h3>
          </div>
          <ul className="space-y-1 px-4">
            {categories.map((cat, idx) => (
              <li key={idx}>
                <button className={`w-full flex items-center gap-3 px-4 py-2 text-sm rounded-xl transition-colors ${cat === blueprint.category ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                  <span className="w-5 text-center">{/* Icon placeholder */}🎯</span>
                  <span className="truncate">{cat}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-10 sm:px-10 sm:py-12">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
            <button onClick={onBack} className="hover:text-gray-900 dark:hover:text-white transition-colors">Home</button>
            <span className="mx-2">/</span>
            <button className="hover:text-gray-900 dark:hover:text-white transition-colors">{blueprint.category}</button>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-white font-medium">{blueprint.title}</span>
          </div>

          {/* Back Button */}
          <button onClick={onBack} className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8 font-medium">
            <ChevronLeft size={18} />
            Back to {blueprint.category}
          </button>

          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">{blueprint.title}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {blueprint.description}
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
                Updated Mar 11, 2026
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg text-sm flex items-center gap-1.5 border border-gray-200 dark:border-gray-700">
                  <span className="w-2 h-2 rounded-full bg-gray-400"></span> Any
                </span>
                {['salary-negotiation', 'compensation', 'career-growth', 'job-offer', 'type:text'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg text-sm flex items-center gap-1.5 border border-gray-200 dark:border-gray-700">
                    <span className="text-gray-400">🏷️</span> {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium shadow-sm">
                  <LinkIcon size={16} />
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium shadow-sm">
                  <Share2 size={16} />
                  Share
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium shadow-sm">
                  <Download size={16} />
                  ดาวน์โหลดไฟล์ (docs)
                </button>
              </div>
            </div>

            {/* Right side buttons (Save, Like, Dislike) */}
            <div className="flex items-center gap-3">
              <button 
                onClick={handleFavorite}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-colors font-medium shadow-sm ${isFavorite ? 'bg-purple-50 border-purple-200 text-purple-600 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-400' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              >
                <Bookmark size={18} className={isFavorite ? "fill-current" : ""} />
                {isFavorite ? '1 saves' : '0 saves'}
              </button>
              <div className="flex items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden">
                <button className="flex items-center gap-2 px-4 py-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-r border-gray-200 dark:border-gray-700">
                  <ThumbsUp size={18} />
                  <span className="font-medium">0</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <ThumbsDown size={18} />
                  <span className="font-medium">0</span>
                </button>
              </div>
            </div>
          </div>

          {/* Prompt Display Section */}
          <div className="mb-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <span className="font-semibold text-gray-900 dark:text-white">Prompt Template</span>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors text-sm shadow-md shadow-purple-500/20"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy Prompt'}
              </button>
            </div>
            <div className="p-6">
              <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                {blueprint.logic_template}
              </pre>
            </div>
          </div>

          <div className="h-px bg-gray-200 dark:bg-gray-800 w-full my-12"></div>

          {/* More Prompts Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">More {blueprint.category} Prompts</h2>
            {relatedPrompts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPrompts.map(b => (
                  <BlueprintCard key={b.id} blueprint={b} onBlueprintClick={onSelectBlueprint} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No more prompts in this category.</p>
            )}
          </div>

          {/* You Might Also Like Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">You Might Also Like</h2>
            {mightLikePrompts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mightLikePrompts.map(b => (
                  <BlueprintCard key={b.id} blueprint={b} onBlueprintClick={onSelectBlueprint} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No recommendations available.</p>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};
