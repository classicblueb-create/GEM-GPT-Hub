import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { blueprints, Blueprint, Tier } from './data';
import { BlueprintCard } from './components/BlueprintCard';
import { PromptGenerator } from './components/PromptGenerator';
import { LandingPage } from './components/LandingPage';
import { GemMaker } from './components/GemMaker';
import { PromptDetailView } from './components/PromptDetailView';
import { LayoutDashboard, Zap, Crown, User, LogOut, Heart, Copy, Check, Search, Filter, TrendingUp, Megaphone, PenTool, Code, ChevronLeft } from 'lucide-react';
import { Layout } from './components/Layout';
import { Footer } from './components/Footer';
import { Resources } from './pages/Resources';
import { UserGuide } from './pages/UserGuide';
import { Blog } from './pages/Blog';
import { HelpCenter } from './pages/HelpCenter';
import { ContactUs } from './pages/ContactUs';
import { Legal } from './pages/Legal';
import { TermsOfService } from './pages/TermsOfService';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { CookiePolicy } from './pages/CookiePolicy';

// ... (LoginModal, PromptDetailModal, ProfileModal, Dashboard components remain the same)

const LoginModal = ({ onClose, onLoginSuccess }: { onClose: () => void, onLoginSuccess: () => void }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // จำลองระบบหลังบ้าน: ตรวจสอบสิทธิ์จากอีเมล
    let tier: Tier = 'free';
    if (email.toLowerCase().includes('vip')) {
      tier = 'vip';
    } else if (email.toLowerCase().includes('premium') || email.toLowerCase().includes('lifetime')) {
      tier = 'premium';
    }
    
    login(tier);
    onLoginSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-100 dark:border-gray-800">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">เข้าสู่ระบบ</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button type="submit" className="w-full py-3 px-4 mt-2 rounded-xl bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-900 font-medium transition-colors shadow-lg">
            เข้าสู่ระบบ
          </button>
          <p className="text-xs text-center text-gray-500 mt-4">
            *สำหรับทดสอบ: พิมพ์ "vip" หรือ "premium" ในอีเมลเพื่อจำลองสิทธิ์
          </p>
        </form>
        <button onClick={onClose} className="mt-4 w-full py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm">ยกเลิก</button>
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

import Joyride, { Step, CallBackProps, STATUS } from 'react-joyride';

const Dashboard = ({ onBack }: { onBack: () => void }) => {
  const { userTier, logout, remainingRequests } = useAuth();
  const [selectedBlueprint, setSelectedBlueprint] = useState<Blueprint | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<'All' | 'free' | 'premium' | 'vip'>('All');
  const [showProfile, setShowProfile] = useState(false);
  const [activeTab, setActiveTab] = useState<'hub' | 'gem-maker'>('hub');
  const [runTour, setRunTour] = useState(false);

  React.useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      setRunTour(true);
    }
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setRunTour(false);
      localStorage.setItem('hasSeenTour', 'true');
    }
  };

  const tourSteps: Step[] = [
    {
      target: '.tour-step-hub',
      content: 'ยินดีต้อนรับสู่ Blueprint Hub! ที่นี่คุณสามารถค้นหา Prompt สำเร็จรูปที่พร้อมใช้งานได้ทันที',
      disableBeacon: true,
    },
    {
      target: '.tour-step-gem-maker',
      content: 'คลิกที่นี่เพื่อสลับไปยัง GEM Maker ซึ่งคุณสามารถสร้าง Prompt ของคุณเอง หรือแปลงทักษะเป็น GEM/GPT ได้',
    },
    {
      target: '.tour-step-search',
      content: 'ใช้ช่องค้นหาและตัวกรองเพื่อค้นหา Prompt ที่คุณต้องการได้อย่างรวดเร็ว',
    },
    {
      target: '.tour-step-categories',
      content: 'เลือกดู Prompt ตามหมวดหมู่เพื่อสำรวจการใช้งานในรูปแบบต่างๆ',
    }
  ];

  const filteredBlueprints = blueprints.filter(b => {
    const matchesCategory = category ? b.category === category : true;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = selectedTier === 'All' ? true : b.tier === selectedTier;
    return matchesCategory && matchesSearch && matchesTier;
  });

  const categories = [
    { id: 'Sales', name: 'Sales', icon: <TrendingUp size={24} />, description: 'Prompts for sales and outreach', count: blueprints.filter(b => b.category === 'Sales').length, color: 'from-blue-500 to-cyan-400' },
    { id: 'Marketing', name: 'Marketing', icon: <Megaphone size={24} />, description: 'Marketing and advertising prompts', count: blueprints.filter(b => b.category === 'Marketing').length, color: 'from-pink-500 to-rose-400' },
    { id: 'Content', name: 'Content', icon: <PenTool size={24} />, description: 'Content creation and writing', count: blueprints.filter(b => b.category === 'Content').length, color: 'from-purple-500 to-indigo-400' },
    { id: 'Vibe Coding', name: 'Vibe Coding', icon: <Code size={24} />, description: 'Coding and technical prompts', count: blueprints.filter(b => b.category === 'Vibe Coding').length, color: 'from-emerald-500 to-teal-400' },
  ];

  if (selectedBlueprint) {
    return (
      <PromptDetailView 
        blueprint={selectedBlueprint} 
        onBack={() => setSelectedBlueprint(null)} 
        onSelectBlueprint={(b) => setSelectedBlueprint(b)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-gray-950 relative overflow-hidden">
      <Joyride
        steps={tourSteps}
        run={runTour}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: '#9333ea',
            zIndex: 1000,
          },
        }}
      />
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
              className={`tour-step-hub px-6 py-2.5 rounded-xl font-medium text-sm transition-all ${
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
              className={`tour-step-gem-maker px-6 py-2.5 rounded-xl font-medium text-sm transition-all ${
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
            {/* Search and Filter Bar */}
            <div className="tour-step-search mb-8 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search prompts by keyword..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all shadow-sm"
                />
              </div>
              <div className="flex gap-4">
                <div className="relative">
                  <select 
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value as any)}
                    className="appearance-none pl-10 pr-10 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all shadow-sm cursor-pointer"
                  >
                    <option value="All">All Tiers</option>
                    <option value="free">Free</option>
                    <option value="premium">Premium</option>
                    <option value="vip">VIP</option>
                  </select>
                  <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>
            </div>

            {/* Category Navigation (if inside a category) */}
            {category && (
              <div className="mb-6 flex items-center gap-4">
                <button 
                  onClick={() => setCategory(null)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
                >
                  <ChevronLeft size={18} />
                  Back to Categories
                </button>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{category} Prompts</h2>
              </div>
            )}

            {/* Grid */}
            <main>
              {!category && searchQuery === '' && selectedTier === 'All' ? (
                <div className="tour-step-categories grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {categories.map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 text-left transition-all hover:shadow-xl hover:-translate-y-1"
                    >
                      <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${cat.color} text-white mb-4 shadow-lg`}>
                        {cat.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{cat.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{cat.description}</p>
                      <div className="flex items-center justify-between text-sm font-medium">
                        <span className="text-purple-600 dark:text-purple-400">{cat.count} Prompts</span>
                        <span className="text-gray-400 group-hover:text-purple-500 transition-colors">Explore →</span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <>
                  {filteredBlueprints.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                      {filteredBlueprints.map(b => (
                        <BlueprintCard key={b.id} blueprint={b} onBlueprintClick={(b) => setSelectedBlueprint(b)} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <div className="inline-flex p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                        <Search size={32} className="text-gray-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No prompts found</h3>
                      <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters to find what you're looking for.</p>
                      <button 
                        onClick={() => { setSearchQuery(''); setSelectedTier('All'); setCategory(null); }}
                        className="mt-6 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors"
                      >
                        Clear Filters
                      </button>
                    </div>
                  )}
                </>
              )}
            </main>
          </>
        ) : (
          <GemMaker />
        )}
      </div>

      {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </AuthProvider>
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
