import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const qaMap: Record<string, string> = {
  'GEM กับ GPTs ต่างกันยังไง?': '<b>GPTs</b> คือระบบของ OpenAI ส่วน <b>GEM</b> (Google AI Studio) คือระบบของ Google ครับ ทั้งคู่ทำงานคล้ายกันคือให้เราสร้าง AI ส่วนตัวที่รู้ข้อมูลเฉพาะของเรา แต่ GEM จะเชื่อมต่อกับ Ecosystem ของ Google ได้ดีกว่าครับ 🚀',
  'ระบบ RAG คืออะไร?': '<b>RAG (Retrieval-Augmented Generation)</b> คือเทคนิคที่ทำให้ AI ดึงข้อมูลจากเอกสารของเราเองมาตอบคำถาม แทนที่จะเดาจากความจำของมัน ทำให้คำตอบแม่นยำ 100% และไม่มั่วข้อมูลครับ 📚',
  'จะป้องกันไม่ให้ AI ตอบมั่วได้ยังไง?': 'เราสามารถเขียน <b>"Custom Instructions"</b> หรือคำสั่งควบคุมที่ชัดเจน เช่น "ห้ามตอบเรื่องอื่นนอกเหนือจากเอกสาร" หรือ "ถ้าไม่รู้ให้ตอบว่าไม่ทราบ" ระบบของเรามีเครื่องมือช่วยเขียนคำสั่งเหล่านี้ให้เป๊ะที่สุดครับ 🛡️',
  'สอนวิธีตั้งกฎและข้อห้ามให้ AI หน่อย': 'ง่ายมากครับ! ใน <b>GEM Maker</b> เรามี Template สำหรับตั้งกฎ เช่น การกำหนด Persona (บทบาท), Tone of voice (น้ำเสียง), และ Constraints (ข้อห้าม) แค่กรอกข้อมูล ระบบจะแปลงเป็น Prompt ระดับโปรให้ทันที 🎯',
  'ต้องเตรียมข้อมูลอะไรบ้างก่อนสร้าง?': 'เตรียมแค่ 2 อย่างครับ:<br>1. <b>เป้าหมาย</b> ว่าอยากให้ AI ทำอะไร (เช่น ตอบแชทลูกค้า, สรุปเอกสาร)<br>2. <b>ข้อมูลความรู้ (Knowledge Base)</b> เช่น ไฟล์ PDF, เว็บไซต์ หรือคู่มือของบริษัทครับ 📝',
  'GEM Maker ช่วยสร้าง Prompt ได้จริงไหม?': 'จริงแท้แน่นอนครับ! <b>GEM Maker</b> ถูกออกแบบมาเพื่อแก้ปัญหาคนเขียน Prompt ไม่เก่ง แค่คุณบอกความต้องการสั้นๆ ระบบจะขยายผลเป็น Prompt โครงสร้างสมบูรณ์แบบที่พร้อมใช้งานทันที ✨',
  'ถ้าไม่มีความรู้โค้ดดิ้ง สร้างได้ไหม?': '<b>สร้างได้ 100% ครับ!</b> แพลตฟอร์มของเราออกแบบมาแบบ No-Code แค่พิมพ์สิ่งที่คุณต้องการด้วยภาษาคนปกติ ระบบจะจัดการแปลงเป็นโครงสร้าง AI ให้ทั้งหมดครับ 👨‍💻❌',
  'เอาไปใช้กับธุรกิจแนวไหนได้บ้าง?': 'ใช้ได้ทุกธุรกิจเลยครับ! ตั้งแต่ AI ตอบแชทลูกค้า (E-commerce), AI ช่วยตรวจสัญญา (กฎหมาย), AI ช่วยคิดคอนเทนต์ (Marketing), ไปจนถึง AI ช่วยวิเคราะห์ข้อมูล (Finance) ปรับแต่งได้ไร้ขีดจำกัด 🏢',
  'ข้อมูลความลับบริษัทจะปลอดภัยไหม?': 'ปลอดภัยสูงสุดครับ ข้อมูลที่คุณอัปโหลดเพื่อทำ RAG จะถูกเก็บแยกไว้ในฐานข้อมูลส่วนตัว และจะไม่ถูกนำไปฝึกฝน (Train) โมเดล AI หลักของระบบ คุณจึงมั่นใจได้ 100% 🔒',
  'อยากเริ่มสร้าง GEM ตัวแรก ต้องทำไง?': 'เริ่มต้นง่ายๆ แค่คลิกปุ่ม <b>"ลองใช้ GEM Maker เลย!"</b> ด้านล่างนี้ครับ ระบบจะพาคุณไปทีละขั้นตอน ตั้งแต่ตั้งชื่อ ไปจนถึงการเขียนคำสั่งแรก ใช้เวลาไม่ถึง 3 นาทีก็เสร็จแล้ว! 🎉'
};

const allQuestions = Object.keys(qaMap);

export const HeroSection = ({ onGetStarted }: { onGetStarted: () => void }) => {
  const [botMode, setBotMode] = useState<'ask' | 'start'>('ask');
  const [chatHistory, setChatHistory] = useState<{role: 'bot'|'user', text: string}[]>([
    { role: 'bot', text: "สวัสดี! ฉันคือ AI Architect ของคุณ 🤖<br><br>ฉันพร้อมช่วยคุณสร้าง <b>GEM</b> และ <b>GPTs</b> ส่วนตัว! การใช้งาน GEM/GPTs ก็เหมือนเราสร้างระบบ RAG ที่เก็บข้อมูลเฉพาะของเราไว้ ทำให้ AI ตอบตรงประเด็น ไม่มั่วข้อมูล และทำงานตามกฎหรือข้อห้ามที่เรากำหนดไว้เป๊ะๆ ✨<br><br>อยากรู้เรื่องไหนเกี่ยวกับการสร้าง AI ส่วนตัว ลองเลือกคำถามด้านล่างได้เลยครับ!" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState(allQuestions);
  const historyRef = useRef<HTMLDivElement>(null);

  const handleAsk = (text: string) => {
    if (text === "ลองใช้ GEM Maker เลย!") {
      onGetStarted();
      return;
    }
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
      const answer = qaMap[val] || "คำถามยอดเยี่ยมมากครับ! 💡 การควบคุม AI ให้ตอบเฉพาะสิ่งที่เราต้องการคือหัวใจสำคัญของ GEM/GPTs ระบบของเราออกแบบมาให้คุณกำหนด 'Custom Instruction' ได้อย่างละเอียด เพื่อให้ AI ทำงานตามกรอบที่คุณวางไว้ 100%<br><br>พร้อมที่จะลองสร้าง AI ผู้ช่วยที่รู้ใจคุณที่สุดหรือยัง? ไปลุยกันที่ <b>GEM Maker</b> ได้เลย!";
      
      setChatHistory(prev => [...prev, { role: 'bot', text: answer }]);
      
      const remainingQs = allQuestions.filter(q => q !== val);
      const shuffled = remainingQs.sort(() => 0.5 - Math.random());
      const nextSuggestions = shuffled.slice(0, 2);
      nextSuggestions.push("ลองใช้ GEM Maker เลย!");
      
      setSuggestions(nextSuggestions);
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
        เปลี่ยนคำถามซ้ำๆ <br className="hidden md:block" />
        <span className="text-gray-900 font-bold">ให้เป็นระบบของคุณ</span>
      </h1>
      <p className="sm:text-2xl leading-relaxed animate-[animationIn_0.4s_ease-out_both] text-xl font-normal text-gray-700 max-w-2xl mr-auto ml-auto mb-10">
        ระบบที่เปลี่ยน AI ให้เป็นผู้ช่วยส่วนตัวที่รู้ลึก รู้จริง เรื่องธุรกิจของคุณ ผ่านการทดสอบ พิสูจน์แล้ว และพร้อมใช้งานในคลิกเดียว
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
                    <button onClick={() => setBotMode('ask')} className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${botMode === 'ask' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>ถามเลย</button>
                    <button onClick={() => setBotMode('start')} className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${botMode === 'start' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>เริ่มใช้งาน&gt;&gt;</button>
                  </div>
                  <button onClick={() => setIsExpanded(false)} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/50 active:bg-gray-200/50 transition-all rounded-full w-8 h-8 flex items-center justify-center z-10">
                    <iconify-icon icon="lucide:x-circle" width="20"></iconify-icon>
                  </button>
                </div>
              </div>
            </div>
          )}

          {isExpanded && botMode === 'ask' && (
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

          {isExpanded && botMode === 'start' && (
            <div className="flex flex-col h-[320px] items-center justify-center p-6 text-center animate-[animationIn_0.3s_ease-out_both] bg-gradient-to-b from-white to-gray-50/80">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1 shadow-lg shadow-pink-500/20 mb-6 mx-auto flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-gray-900 font-bold text-2xl mb-3">พร้อมสร้าง GEM ของคุณหรือยัง?</h3>
              <p className="text-sm text-gray-600 mb-8 max-w-[280px] mx-auto leading-relaxed">
                ปลดล็อกขีดจำกัดการทำงานด้วย AI ส่วนตัวที่รู้ใจคุณที่สุด เลือกแพ็กเกจที่ใช่ แล้วเริ่มสร้างได้ทันที!
              </p>
              <button 
                onClick={() => {
                  const pricingSection = document.getElementById('pricing');
                  if (pricingSection) pricingSection.scrollIntoView({ behavior: 'smooth' });
                  setIsExpanded(false);
                }}
                className="group relative px-8 py-3 bg-gray-900 text-white rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 overflow-hidden flex items-center gap-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative flex items-center gap-2">
                  ดูแพ็กเกจและราคา
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          )}

          {botMode === 'ask' && (
            <form onSubmit={handleSubmit} className="flex w-full pt-1.5 pr-1.5 pb-1.5 pl-1.5 relative items-center">
              <div className="pl-4 pr-2 text-[#ff9146] transition-transform duration-300 group-hover:scale-110">
                <iconify-icon icon="solar:magic-stick-3-linear" width="20"></iconify-icon>
              </div>
              <input 
                type="text" 
                className="border-none focus:ring-0 placeholder-gray-500 sm:text-base outline-none text-sm text-gray-800 bg-transparent w-full pt-3 pr-2 pb-3 pl-2" 
                placeholder="ถามเกี่ยวกับการสร้าง GEM, GPTs, หรือระบบ RAG..." 
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
