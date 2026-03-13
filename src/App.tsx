import React, { useState, lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { blueprints as staticBlueprints, Blueprint, Tier } from './data';
import { blueprintService } from './services/blueprintService';
import { BlueprintCard } from './components/BlueprintCard';
import { PromptGenerator } from './components/PromptGenerator';
import { LandingPage } from './components/LandingPage';
import { GemMaker } from './components/GemMaker';
import { LayoutDashboard, Zap, Crown, User, LogOut, Heart, Copy, Check } from 'lucide-react';
import { Layout } from './components/Layout';
import { ErrorBoundary } from './components/ErrorBoundary';

// Lazy load pages สำหรับ code splitting
const Resources = lazy(() => import('./pages/Resources').then(module => ({ default: module.Resources })));
const UserGuide = lazy(() => import('./pages/UserGuide').then(module => ({ default: module.UserGuide })));
const Blog = lazy(() => import('./pages/Blog').then(module => ({ default: module.Blog })));
const HelpCenter = lazy(() => import('./pages/HelpCenter').then(module => ({ default: module.HelpCenter })));
const ContactUs = lazy(() => import('./pages/ContactUs').then(module => ({ default: module.ContactUs })));
const Legal = lazy(() => import('./pages/Legal').then(module => ({ default: module.Legal })));
const TermsOfService = lazy(() => import('./pages/TermsOfService').then(module => ({ default: module.TermsOfService })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(module => ({ default: module.PrivacyPolicy })));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy').then(module => ({ default: module.CookiePolicy })));

// Loading component สำหรับ lazy loaded pages
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
  </div>
);

// ... (LoginModal, PromptDetailModal, ProfileModal, Dashboard components remain the same)

const LoginModal = ({ onClose, onLoginSuccess }: { onClose: () => void, onLoginSuccess: () => void }) => {
  const { signIn, signInWithGoogle, signUp, isLoading, error, clearError } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      if (isSignUp) {
        await signUp(email, password, displayName);
      } else {
        await signIn(email, password);
      }
      onLoginSuccess();
      onClose();
    } catch (error) {
      // Error is handled by AuthContext
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      clearError();
      await signInWithGoogle();
      onLoginSuccess();
      onClose();
    } catch (error) {
      // Error is handled by AuthContext
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-100 dark:border-gray-800">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          {isSignUp ? 'สร้างบัญชี' : 'เข้าสู่ระบบ'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ชื่อที่แสดง</label>
              <input
                type="text"
                required={isSignUp}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                placeholder="ชื่อของคุณ"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">อีเมล</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">รหัสผ่าน</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 mt-2 rounded-xl bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-900 font-medium transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'กำลังดำเนินการ...' : (isSignUp ? 'สร้างบัญชี' : 'เข้าสู่ระบบ')}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">หรือ</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="mt-4 w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            เข้าสู่ระบบด้วย Google
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
          >
            {isSignUp ? 'มีบัญชีอยู่แล้ว? เข้าสู่ระบบ' : 'ยังไม่มีบัญชี? สมัครสมาชิก'}
          </button>
        </div>

        <button onClick={onClose} className="mt-4 w-full py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm">
          ยกเลิก
        </button>
      </div>
    </div>
  );
};

const PromptDetailModal = ({ blueprint, onClose }: { blueprint: Blueprint, onClose: () => void }) => {
  const { userProfile, toggleFavorite, incrementRequestCount, remainingRequests } = useAuth();
  const [copied, setCopied] = useState(false);

  const canFavorite = userProfile?.tier === 'premium' || userProfile?.tier === 'vip';
  const isFavorite = userProfile?.favorites.includes(blueprint.id) || false;

  const handleCopy = () => {
    navigator.clipboard.writeText(blueprint.logic_template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFavorite = () => {
    if (!canFavorite) {
      alert('ฟีเจอร์นี้สำหรับ Lifetime Member (1,990.-) และ VIP เท่านั้น');
      return;
    }
    toggleFavorite(blueprint.id);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-6 sm:p-10 max-w-3xl w-full shadow-2xl border border-gray-100 dark:border-gray-800 relative max-h-[90vh] flex flex-col">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-700 transition-colors">
          <iconify-icon icon="lucide:x" width="24"></iconify-icon>
        </button>
        
        <div className="flex justify-between items-start mb-6 pr-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">ชื่อ: {blueprint.title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">รายละเอียด: {blueprint.description}</p>
          </div>
          <button 
            onClick={handleFavorite}
            className={`p-3 rounded-full transition-colors ${isFavorite ? 'bg-pink-100 text-pink-500 dark:bg-pink-900/30' : 'bg-gray-100 text-gray-400 hover:text-pink-500 dark:bg-gray-800'}`}
            title={canFavorite ? "Add to Favorites" : "Favorites available for Lifetime/VIP"}
          >
            <Heart className={isFavorite ? "fill-current" : ""} size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-t-2xl">
            <span className="font-medium text-gray-700 dark:text-gray-300">คำสั่ง (Prompt)</span>
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors text-sm shadow-md shadow-purple-500/20"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy Prompt'}
            </button>
          </div>
          <div className="p-6 overflow-y-auto flex-1">
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
              {blueprint.logic_template}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileModal = ({ onClose }: { onClose: () => void }) => {
  const { userTier, name, setName, occupation, setOccupation, favorites } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editOccupation, setEditOccupation] = useState(occupation);

  const handleSave = () => {
    setName(editName);
    setOccupation(editOccupation);
    setIsEditing(false);
  };

  const favoriteBlueprints = blueprints.filter(b => favorites.includes(b.id));

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-6 sm:p-10 max-w-2xl w-full shadow-2xl border border-gray-100 dark:border-gray-800 relative max-h-[90vh] flex flex-col">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-700 transition-colors">
          <iconify-icon icon="lucide:x" width="24"></iconify-icon>
        </button>
        
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">โปรไฟล์ของคุณ</h2>
        
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {/* Profile Info */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">ข้อมูลส่วนตัว</h3>
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className="text-sm text-purple-600 hover:text-purple-700 font-medium">แก้ไข</button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => setIsEditing(false)} className="text-sm text-gray-500 hover:text-gray-700 font-medium">ยกเลิก</button>
                  <button onClick={handleSave} className="text-sm text-purple-600 hover:text-purple-700 font-medium">บันทึก</button>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">ชื่อ</label>
                {isEditing ? (
                  <input type="text" value={editName} onChange={e => setEditName(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500" />
                ) : (
                  <div className="text-gray-900 dark:text-white font-medium">{name}</div>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">อาชีพของคุณ</label>
                {isEditing ? (
                  <input type="text" value={editOccupation} onChange={e => setEditOccupation(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500" />
                ) : (
                  <div className="text-gray-900 dark:text-white font-medium">{occupation}</div>
                )}
              </div>
            </div>
          </div>

          {/* Package Info */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">แพคเกจปัจจุบัน</h3>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl ${userTier === 'vip' ? 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400' : userTier === 'premium' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}`}>
                  <Crown size={28} />
                </div>
                <div>
                  <div className="font-bold text-lg text-gray-900 dark:text-white capitalize">{userTier === 'premium' ? 'Lifetime Member' : userTier === 'vip' ? 'VIP Member' : 'Free Tier'}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {userTier === 'free' ? 'เข้าถึงคลังได้ 4 เรื่องหลัก' : userTier === 'premium' ? 'ปลดล็อกคลัง 100+ เรื่อง' : 'สิทธิ์ Interactive Builder (20 ครั้ง/เดือน)'}
                  </div>
                </div>
              </div>
              {userTier !== 'vip' && (
                <button className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 whitespace-nowrap">
                  Upgrade
                </button>
              )}
            </div>
          </div>

          {/* Favorites */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Favorite (รายการโปรด)</h3>
            {favoriteBlueprints.length > 0 ? (
              <div className="space-y-3">
                {favoriteBlueprints.map(bp => (
                  <div key={bp.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{bp.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{bp.category}</div>
                    </div>
                    <Heart size={20} className="text-pink-500 fill-current" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Heart size={32} className="mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                ยังไม่มีรายการโปรด
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ onBack }: { onBack: () => void }) => {
  const { userTier, logout, remainingRequests } = useAuth();
  const [selectedBlueprint, setSelectedBlueprint] = useState<Blueprint | null>(null);
  const [category, setCategory] = useState('All');
  const [showProfile, setShowProfile] = useState(false);
  const [activeTab, setActiveTab] = useState<'hub' | 'gem-maker'>('hub');
  const [blueprints, setBlueprints] = useState<Blueprint[]>(staticBlueprints);
  const [loading, setLoading] = useState(true);

  // Load blueprints from Firebase on component mount
  useEffect(() => {
    const loadBlueprints = async () => {
      try {
        setLoading(true);
        const firebaseBlueprints = await blueprintService.getAllBlueprints();
        if (firebaseBlueprints.length > 0) {
          setBlueprints(firebaseBlueprints);
        }
      } catch (error) {
        console.error('Error loading blueprints:', error);
        // Fallback to static blueprints if Firebase fails
        setBlueprints(staticBlueprints);
      } finally {
        setLoading(false);
      }
    };

    loadBlueprints();
  }, []);

  const filteredBlueprints = category === 'All' ? blueprints : blueprints.filter(b => b.category === category);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-gray-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] opacity-40">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-50"></div>
          <div className="absolute top-24 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-50"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl p-4 sm:p-6 rounded-3xl border border-white/20 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-black/20">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors">
              <iconify-icon icon="lucide:arrow-left" width="24"></iconify-icon>
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">GPTs & GEM Hub</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">ศูนย์กลางการสั่งการ AI ส่วนตัวของคุณ</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowProfile(true)} className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <User size={16} className={userTier === 'vip' ? 'text-pink-500' : userTier === 'premium' ? 'text-purple-500' : 'text-gray-500'} />
              <span className="capitalize">สมาชิก {userTier === 'premium' ? 'Lifetime' : userTier}</span>
            </button>
            <button onClick={() => { logout(); onBack(); }} className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors" title="Logout">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Main Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md p-1.5 rounded-2xl border border-gray-200 dark:border-gray-800 inline-flex">
            <button
              onClick={() => setActiveTab('hub')}
              className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'hub' 
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <LayoutDashboard className="inline-block w-4 h-4 mr-2" />
              Blueprint Hub
            </button>
            <button
              onClick={() => setActiveTab('gem-maker')}
              className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'gem-maker' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <Zap className="inline-block w-4 h-4 mr-2" />
              GEM Maker
            </button>
          </div>
        </div>

        {/* Content Area */}
        {activeTab === 'hub' ? (
          <>
            {/* Top Tags */}
            <div className="mb-10 flex flex-wrap justify-center gap-3">
              {['All', 'Sales', 'Marketing', 'Content', 'Vibe Coding'].map(cat => (
                <button 
                  key={cat} 
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
                    category === cat 
                      ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 scale-105' 
                      : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800 hover:scale-105'
                  }`} 
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid */}
            <main>
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">กำลังโหลด Blueprints...</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {filteredBlueprints.map(b => (
                    <BlueprintCard key={b.id} blueprint={b} onBlueprintClick={(b) => setSelectedBlueprint(b)} />
                  ))}
                </div>
              )}
            </main>
          </>
        ) : (
          <GemMaker />
        )}
      </div>

      {selectedBlueprint && <PromptDetailModal blueprint={selectedBlueprint} onClose={() => setSelectedBlueprint(null)} />}
      {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/resources" element={<Layout><Resources /></Layout>} />
              <Route path="/user-guide" element={<Layout><UserGuide /></Layout>} />
              <Route path="/blog" element={<Layout><Blog /></Layout>} />
              <Route path="/help-center" element={<Layout><HelpCenter /></Layout>} />
              <Route path="/contact-us" element={<Layout><ContactUs /></Layout>} />
              <Route path="/legal" element={<Layout><Legal /></Layout>} />
              <Route path="/terms-of-service" element={<Layout><TermsOfService /></Layout>} />
              <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
              <Route path="/cookie-policy" element={<Layout><CookiePolicy /></Layout>} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

const MainContent = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showDashboard ? (
        <Dashboard onBack={() => setShowDashboard(false)} />
      ) : (
        <>
          <LandingPage onGetStarted={() => setShowLogin(true)} />
          {showLogin && (
            <LoginModal 
              onClose={() => setShowLogin(false)} 
              onLoginSuccess={() => setShowDashboard(true)}
            />
          )}
        </>
      )}
    </>
  );
}
