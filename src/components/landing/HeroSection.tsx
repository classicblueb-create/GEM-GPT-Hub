import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export const HeroSection = ({ onGetStarted }: { onGetStarted: () => void }) => {
  const [botMode, setBotMode] = useState<'ai' | 'human'>('ai');
  const [chatHistory, setChatHistory] = useState<{role: 'bot'|'user', text: string}[]>([
    { role: 'bot', text: "สวัสดี! ฉันคือ AI Architect ของคุณ 🤖<br><br>ฉันสามารถช่วยคุณสร้างกลยุทธ์การเติบโตสำหรับธุรกิจของคุณได้ เพื่อเริ่มต้น คุณกำลังจะ<b>เปิดธุรกิจใหม่</b> หรือต้องการ<b>ขยายธุรกิจเดิม</b>?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState(['ฉันเพิ่งเริ่มธุรกิจใหม่', 'ฉันต้องการขยายธุรกิจ', 'AMP Center คืออะไร?', 'AMP Program คืออะไร?']);
  const historyRef = useRef<HTMLDivElement>(null);

  const handleAsk = (text: string) => {
    setInputValue(text);
    handleSubmit(null, text);
  };

  const handleSubmit = (e: React.FormEvent | null, overrideText?: string) => {
    if (e) e.preventDefault();
    const val = overrideText || inputValue.trim();
    if (!val) return;

    setIsExpanded(true);
    setChatHistory(prev => [...prev, { role: 'user', text: val }]);
    setInputValue('');
    setSuggestions([]);

    setTimeout(() => {
      setChatHistory(prev => [...prev, { role: 'bot', text: "ฉันสามารถช่วยเรื่องนั้นได้ มาสร้างแผนงานที่เหมาะกับคุณกันเถอะ พร้อมที่จะเห็นอนาคตของการจัดการธุรกิจหรือยัง?" }]);
      setSuggestions(["พร้อมแล้ว ลุยเลย", "บอกรายละเอียดเพิ่มเติมหน่อย"]);
    }, 800);
  };

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <section className="z-30 text-center max-w-4xl mr-auto ml-auto pr-6 pl-6 relative">
      <h1 className="sm:text-6xl md:text-7xl leading-[1.1] text-5xl font-medium text-gray-900 tracking-tight mb-8 animate-[animationIn_0.4s_ease-out_both] mt-12">
        เปลี่ยน AI จากแชทบอท <br className="hidden md:block" />
        <span className="text-gray-900 font-bold">ให้เป็นระบบของคุณ</span>
      </h1>
      <p className="sm:text-2xl leading-relaxed animate-[animationIn_0.4s_ease-out_both] text-xl font-normal text-gray-700 max-w-2xl mr-auto ml-auto mb-10">
        ระบบที่เปลี่ยน AI ให้เป็นสินทรัพย์ของธุรกิจ ผ่านการทดสอบ พิสูจน์แล้ว และพร้อมใช้งานในคลิกเดียว
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-[animationIn_0.5s_ease-out_both]">
        <button 
          onClick={onGetStarted}
          className="group relative px-8 py-4 bg-gray-900 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="relative flex items-center gap-2">
            <Sparkles size={20} className="text-yellow-400" />
            ลองใช้ GEM Maker ฟรี
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
        <button 
          onClick={() => {
            const pricingSection = document.getElementById('pricing');
            if (pricingSection) pricingSection.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-8 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 rounded-full font-bold text-lg hover:bg-white transition-all"
        >
          ดูแพ็กเกจสมาชิก
        </button>
      </div>

      <div className="animate-[animationIn_0.4s_ease-out_both] z-40 text-left mt-12 mr-auto mb-4 ml-auto relative max-w-3xl">
        <div className={`shadow-gray-400/30 overflow-hidden transition-all duration-500 ease-in-out flex flex-col group hover:bg-white/90 bg-white/70 border-white/60 border ${isExpanded ? 'rounded-2xl' : 'rounded-full'} shadow-2xl backdrop-blur-2xl max-w-xl mx-auto`}>
          
          {isExpanded && (
            <div className="bg-white/50 border-gray-100 border-b pt-4 pr-5 pb-4 pl-5 flex items-center justify-between">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="flex text-white bg-gray-900 w-8 h-8 bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/65f31962-c0e3-4e58-a4a8-9b6355e0a37d_320w.png)] bg-cover bg-center rounded-full relative shadow-md items-center justify-center">
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#46d4c6] border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 tracking-tight leading-tight">AI Architect</h3>
                    <p className="text-[10px] uppercase tracking-widest text-[#46d4c6] font-medium leading-tight">GPTs & GEM Hub</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-gray-100/80 rounded-full p-0.5 border border-gray-200/50 backdrop-blur-sm">
                    <button onClick={() => setBotMode('ai')} className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${botMode === 'ai' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>AI</button>
                    <button onClick={() => setBotMode('human')} className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${botMode === 'human' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>Team</button>
                  </div>
                  <button onClick={() => setIsExpanded(false)} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/50 active:bg-gray-200/50 transition-all rounded-full w-8 h-8 flex items-center justify-center z-10">
                    <iconify-icon icon="lucide:x-circle" width="20"></iconify-icon>
                  </button>
                </div>
              </div>
            </div>
          )}

          {isExpanded && botMode === 'ai' && (
            <div ref={historyRef} className="overflow-y-auto flex flex-col gap-4 custom-scrollbar bg-gray-50/50 max-h-[320px] pt-5 pr-5 pb-5 pl-5">
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''} animate-[animationIn_0.3s_ease-out_both]`}>
                  {msg.role === 'bot' && (
                    <div className="shrink-0 w-8 h-8 rounded-full bg-gray-900 bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/65f31962-c0e3-4e58-a4a8-9b6355e0a37d_320w.png)] bg-cover bg-center shadow-md"></div>
                  )}
                  <div className={`${msg.role === 'user' ? 'bg-gray-900 border-gray-800 text-white rounded-tr-sm' : 'bg-white border-gray-100 text-gray-700 rounded-tl-sm'} border px-4 py-3 rounded-2xl text-sm font-normal leading-relaxed shadow-sm`} dangerouslySetInnerHTML={{__html: msg.text}}></div>
                </div>
              ))}
              {suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 pl-11 mt-1 animate-[animationIn_0.4s_ease-out_both]">
                  {suggestions.map((sug, i) => (
                    <button key={i} onClick={() => handleAsk(sug)} className="bg-white border border-gray-200 hover:border-[#ff9146] hover:text-[#ff9146] text-xs font-medium text-gray-600 px-3 py-1.5 rounded-full shadow-sm transition-all hover:-translate-y-0.5">{sug}</button>
                  ))}
                </div>
              )}
            </div>
          )}

          {isExpanded && botMode === 'human' && (
            <div className="flex flex-col h-[320px] items-center justify-center p-6 text-center animate-[animationIn_0.3s_ease-out_both]">
              <div className="w-16 h-16 rounded-full bg-white p-1 shadow-lg mb-4 relative mx-auto">
                <img src="https://cdn.commoninja.com/asset/6ada5091-b3d5-4d5b-9920-80bf3411de3f.png" className="w-full h-full rounded-full object-cover" alt="Team" />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <h3 className="text-gray-900 font-medium text-lg mb-1">ทีมซัพพอร์ต</h3>
              <p className="text-xs text-gray-500 mb-6">มักจะตอบกลับอย่างรวดเร็ว</p>
              <div className="bg-white p-4 rounded-2xl rounded-tr-sm shadow-sm border border-gray-100 text-sm text-gray-700 mb-6 max-w-[260px] mx-auto text-left relative">
                <div className="absolute -right-2 top-0 w-4 h-4 bg-white transform rotate-45 border-t border-r border-gray-100"></div>
                สวัสดี! มีอะไรให้เราช่วยขยายธุรกิจของคุณไหม? 🫡
              </div>
            </div>
          )}

          {botMode === 'ai' && (
            <form onSubmit={handleSubmit} className="flex w-full pt-1.5 pr-1.5 pb-1.5 pl-1.5 relative items-center">
              <div className="pl-4 pr-2 text-[#ff9146] transition-transform duration-300 group-hover:scale-110">
                <iconify-icon icon="solar:magic-stick-3-linear" width="20"></iconify-icon>
              </div>
              <input 
                type="text" 
                className="border-none focus:ring-0 placeholder-gray-500 sm:text-base outline-none text-sm text-gray-800 bg-transparent w-full pt-3 pr-2 pb-3 pl-2" 
                placeholder="ถามเกี่ยวกับการเริ่มต้นธุรกิจ, Niche ของคุณ, หรือ AMP..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsExpanded(true)}
              />
              <button type="submit" className="hover:bg-[#ff9146] flex transition-all duration-300 shrink-0 transform active:scale-95 text-white bg-gray-900 w-10 h-10 rounded-full mr-1 shadow-md items-center justify-center">
                <iconify-icon icon="lucide:arrow-right" width="18"></iconify-icon>
              </button>
            </form>
          )}
        </div>

        {!isExpanded && (
          <div className="flex flex-wrap gap-2 transition-all duration-500 transform opacity-100 mt-4 translate-y-0 gap-x-2 gap-y-2 items-center justify-center">
            {suggestions.map((sug, i) => (
              <button key={i} onClick={() => handleAsk(sug)} className="bg-white/60 hover:bg-white backdrop-blur-md border border-white/80 text-xs font-medium text-gray-600 px-3 py-1.5 rounded-full shadow-sm hover:shadow transition-all hover:-translate-y-0.5 whitespace-nowrap">
                {sug}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
