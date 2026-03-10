import React from 'react';
import { Zap, Brain, Target, Play, Check, ChevronRight } from 'lucide-react';
import { motion } from "motion/react";

export const LandingPage = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
    <div className="min-h-screen bg-[#fdfaf6] text-zinc-900 font-sans relative overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-200/50 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-pink-200/50 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] bg-orange-100/50 rounded-full blur-[120px] -z-10" />
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-center justify-between px-6 py-6 max-w-7xl mx-auto"
      >
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent tracking-tighter mb-4 md:mb-0">GPTs & GEM Hub</div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
          <a href="#product" className="hover:text-zinc-900 transition">Product</a>
          <a href="#use-cases" className="hover:text-zinc-900 transition">Use Cases</a>
          <a href="#pricing" className="hover:text-zinc-900 transition">Pricing</a>
          <a href="#about" className="hover:text-zinc-900 transition">About</a>
        </div>
        <button onClick={onGetStarted} className="w-full md:w-auto bg-zinc-900 text-white px-6 py-4 rounded-full text-sm font-semibold hover:bg-zinc-700 transition">Get Started</button>
      </motion.nav>

      {/* 1. Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pt-32 pb-24 md:pt-48 md:pb-32 px-6 text-center max-w-5xl mx-auto relative"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-white/40 backdrop-blur-sm text-xs font-semibold tracking-widest uppercase text-zinc-600 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-pink-500"></span>
          BUSINESS & SOLUTION
        </motion.div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-zinc-900 mb-8 tracking-tight leading-[1.1]">
          Turn AI from a Chatbot into your <br className="hidden md:block" />
          <span className="text-zinc-900">Most Valuable Employee.</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-500 mb-12 max-w-3xl mx-auto leading-relaxed">
          Frameworks that turn AI into a business asset. Tested, proven, and ready to deploy in one click.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button onClick={onGetStarted} className="w-full md:w-auto bg-zinc-900 text-white px-8 py-4 rounded-xl font-medium text-base hover:bg-zinc-800 transition shadow-lg shadow-zinc-900/20">
            Get Started
          </button>
          <button className="w-full md:w-auto bg-white/50 backdrop-blur-sm border border-white/40 text-zinc-900 px-8 py-4 rounded-xl font-medium text-base hover:bg-white/80 transition">
            Book a Demo
          </button>
        </div>

        {/* Hero Mockup Graphic */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-24 relative max-w-4xl mx-auto"
        >
          <div className="aspect-[16/9] rounded-3xl bg-white/40 border border-white/50 backdrop-blur-md shadow-2xl overflow-hidden relative p-8 flex flex-col justify-end">
            {/* Abstract 3D shape placeholder */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl rotate-12 opacity-80 blur-[2px] animate-pulse" />
            
            {/* Chat bubbles */}
            <div className="space-y-4 max-w-md ml-auto relative z-10">
              <div className="bg-white p-4 rounded-2xl rounded-tr-sm shadow-sm text-sm text-zinc-700">
                Hey, I need help sending out a campaign to all new subscribers. Can you set that up?
              </div>
              <div className="bg-zinc-900 text-white p-4 rounded-2xl rounded-tl-sm shadow-sm text-sm">
                Of course! I'll prepare a personalized campaign for your new subscribers. Would you like me to schedule it now or review it first?
              </div>
            </div>
            
            {/* Input bar */}
            <div className="mt-8 bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4 relative z-10">
              <div className="flex-1 text-zinc-400 text-sm">Ask anything...</div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                <ChevronRight size={16} />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Social Proof */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-24 px-6 relative"
      >
        <div className="max-w-7xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 text-center">
             {[
               { label: 'Professionals', value: '1,000+' },
               { label: 'Hours Saved', value: '50k+' },
               { label: 'Blueprints', value: '50+' },
               { label: 'Avg. Rating', value: '4.9/5' },
             ].map((stat, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
               >
                 <div className="text-4xl md:text-5xl font-medium text-zinc-900 mb-2">{stat.value}</div>
                 <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">{stat.label}</div>
               </motion.div>
             ))}
          </div>

          {/* Logos */}
          <div className="hidden md:flex flex-wrap justify-center gap-16 text-zinc-400 font-bold text-xl mb-32 opacity-50">
            <span>ACME</span> <span>TECHFLOW</span> <span>INNOVATEX</span> <span>GROWTHCO</span>
          </div>

          {/* Testimonials */}
          <div className="flex justify-center mb-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-white/40 backdrop-blur-sm text-xs font-semibold tracking-widest uppercase text-zinc-600"
            >
              WALL OF LOVE
            </motion.div>
          </div>
          <h2 className="text-4xl md:text-6xl font-medium text-center mb-16 tracking-tight text-zinc-900">What they're Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { quote: "The frameworks are practical and immediately applicable to my daily workflow.", author: "Sarah J., Agency Owner" },
              { quote: "Finally, a tool that focuses on business logic rather than just generating text.", author: "Mark T., Product Manager" },
              { quote: "A game-changer for scaling our content production without losing quality.", author: "Elena R., Content Lead" },
            ].map((t, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2rem] border border-white/60 bg-white/40 backdrop-blur-md shadow-lg shadow-zinc-200/10"
              >
                <p className="text-lg text-zinc-700 mb-8 leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-200 to-pink-200" />
                  <p className="font-medium text-zinc-900">{t.author}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 3. Problem/Solution */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-32 md:py-48 px-6 bg-[#1a0b2e] text-white relative overflow-hidden"
      >
        {/* Dark section background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-xs font-semibold tracking-widest uppercase text-zinc-300"
            >
              ABOUT
            </motion.div>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium mb-20 tracking-tight text-white leading-tight">
            AI should be your greatest asset, but it feels like a full-time job just to manage it.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              "You’re drowning in generic, unhelpful responses.",
              "You spend more time prompting than actually building.",
              "You know AI can do more, but you don't know how to bridge the gap."
            ].map((frustration, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-md"
              >
                <p className="text-zinc-300 font-medium leading-relaxed">{frustration}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-white/10 backdrop-blur-md p-12 rounded-[2rem] text-white text-center"
          >
            <h3 className="text-3xl font-medium mb-6">The framework is the missing link.</h3>
            <p className="text-xl text-purple-200/80 leading-relaxed max-w-2xl mx-auto">
              We turn complex AI capabilities into structured, repeatable frameworks that work for your business, not against it.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* 4. Feature Cards */}
      <motion.div 
        id="product" 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-32 md:py-48 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-white/40 backdrop-blur-sm text-xs font-semibold tracking-widest uppercase text-zinc-600"
            >
              PRODUCT OVERVIEW
            </motion.div>
          </div>
          <h2 className="text-4xl md:text-6xl font-medium text-center mb-20 tracking-tight text-zinc-900">Frameworks that drive outcomes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'Stop Guessing, Start Scaling',
                problem: 'Generic AI responses that don’t fit your business.',
                change: 'You get structured, expert-level frameworks.',
                why: 'Because you need results, not just conversation.'
              },
              {
                icon: Zap,
                title: 'Turn AI into a Business Asset',
                problem: 'AI feels like a toy, not a tool.',
                change: 'Your AI becomes a reliable, 24/7 employee.',
                why: 'Because your time is better spent building, not prompting.'
              },
              {
                icon: Target,
                title: 'Master the Logic, Not Just the Prompt',
                problem: 'You get stuck when AI updates or changes.',
                change: 'You understand the "Why" behind every interaction.',
                why: 'Because you remain in control, no matter how fast tech evolves.'
              }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/60 backdrop-blur-xl p-10 rounded-[2rem] border border-white/60 shadow-xl shadow-zinc-200/20 hover:shadow-2xl hover:shadow-zinc-200/40 transition duration-500 flex flex-col group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <item.icon className="text-purple-600" size={28} />
                </div>
                <h3 className="text-2xl font-medium mb-6 text-zinc-900">{item.title}</h3>
                <div className="space-y-4 text-zinc-500 text-sm leading-relaxed">
                  <p><strong className="text-zinc-900 font-medium">Problem:</strong> {item.problem}</p>
                  <p><strong className="text-zinc-900 font-medium">Change:</strong> {item.change}</p>
                  <p><strong className="text-zinc-900 font-medium">Why it matters:</strong> {item.why}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 5. Main Features (The What) */}
      <motion.div 
        id="use-cases" 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-32 md:py-48 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-white/40 backdrop-blur-sm text-xs font-semibold tracking-widest uppercase text-zinc-600"
            >
              HOW IT WORKS
            </motion.div>
          </div>
          <h2 className="text-4xl md:text-6xl font-medium text-center mb-20 tracking-tight text-zinc-900">Everything you need to master AI</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'The Vault: คลังแสง AI อัจฉริยะ', desc: 'รวม 100+ Blueprints จากประสบการณ์ 9 ปี แยกหมวดหมู่ธุรกิจ พร้อมระบบค้นหาอัจฉริยะ' },
              { title: 'Interactive Prompt Generator', desc: 'ระบบเติมคำในช่องว่างที่รวม Business Logic ให้คุณก๊อปปี้ไปใช้ได้ทันที' },
              { title: 'Logic Masterclass', desc: 'วิดีโอสอนตรรกะ "The Why" และคู่มือการตั้งค่า GEM/GPTs แบบมืออาชีพ' },
              { title: 'VIP Request System', desc: 'สิทธิ์ขอออกแบบ Blueprint เฉพาะทาง พร้อมหน้า Board ติดตามสถานะและอัปเดตรายเดือน' },
              { title: 'Multi-Platform Support', desc: 'รองรับทั้ง ChatGPT Plus และวิธีสร้าง GEM ส่วนตัวบน Google Gemini' },
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[2rem] border border-white/60 bg-white/40 backdrop-blur-md shadow-lg shadow-zinc-200/10 hover:bg-white/60 transition duration-300"
              >
                <h3 className="text-xl font-medium mb-4 text-zinc-900">{feature.title}</h3>
                <p className="text-zinc-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 6. Demo */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="py-32 md:py-48 px-6 text-center"
      >
        <div className="flex justify-center mb-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-white/40 backdrop-blur-sm text-xs font-semibold tracking-widest uppercase text-zinc-600"
          >
            DEMO
          </motion.div>
        </div>
        <h2 className="text-4xl md:text-6xl font-medium mb-20 tracking-tight text-zinc-900">See it in action</h2>
        <div className="max-w-5xl mx-auto bg-zinc-900 aspect-video rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-zinc-900/20 relative overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-pink-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 z-10">
            <Play size={32} className="text-white ml-2" />
          </div>
        </div>
      </motion.div>

      {/* 7. Membership Plans */}
      <motion.div 
        id="pricing" 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-32 md:py-48 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-white/40 backdrop-blur-sm text-xs font-semibold tracking-widest uppercase text-zinc-600"
            >
              PRICING
            </motion.div>
          </div>
          <h2 className="text-4xl md:text-6xl font-medium text-center mb-20 tracking-tight text-zinc-900">Simple, Flexible Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Free User',
                price: '0.-',
                desc: 'Get started with the basics.',
                features: ['Access to Dashboard', '5 Free Gems (limited)']
              },
              {
                title: 'Premium Member',
                price: '1,990.-',
                desc: 'Lifetime access to everything.',
                features: ['Unlock 100+ GPTs & GEMs', 'Logic Masterclass (Lifetime)', 'Interactive Builder (All)'],
                popular: true
              },
              {
                title: 'VIP Member',
                price: '+199.- /Month',
                desc: 'For those who want more.',
                features: ['Everything in Premium', '10 Custom Requests/Month', '4 New Exclusive Gems/Month']
              }
            ].map((plan, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white/80 backdrop-blur-xl p-10 rounded-[2rem] border ${plan.popular ? 'border-purple-200 shadow-2xl shadow-purple-500/10 scale-105 z-10' : 'border-white/60 shadow-xl shadow-zinc-200/20'} flex flex-col relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-lg">
                    Popular
                  </div>
                )}
                <h3 className="text-xl font-medium mb-2 text-zinc-900">{plan.title}</h3>
                <div className="text-4xl font-semibold mb-6 text-zinc-900">{plan.price}</div>
                <p className="text-zinc-500 mb-8 text-sm">{plan.desc}</p>
                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-zinc-700">
                      <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                        <Check size={12} className="text-purple-600" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={onGetStarted} className={`w-full py-4 rounded-xl font-medium transition ${plan.popular ? 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-lg shadow-zinc-900/20' : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'}`}>
                  {i === 0 ? 'Start Free' : 'Get Access'}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 8. Why Use Us */}
      <motion.div 
        id="about" 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-32 md:py-48 px-6 bg-[#1a0b2e] text-white relative overflow-hidden"
      >
        {/* Dark section background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex justify-center mb-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-xs font-semibold tracking-widest uppercase text-zinc-300"
            >
              KEY BENEFITS
            </motion.div>
          </div>
          <h2 className="text-4xl md:text-6xl font-medium mb-12 tracking-tight text-center">ทำไม GPTs & GEM Blueprint ถึง "ต่าง" และ "คุ้มค่า"</h2>
          <p className="text-xl md:text-2xl text-zinc-400 text-center mb-24 max-w-4xl mx-auto leading-relaxed">
            "เพราะเราไม่ได้สร้างมาเพื่อให้คุณแค่ใช้งาน AI แต่เราสร้างมาเพื่อให้คุณ 'คุมระบบ' ธุรกิจได้จริง"
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Brain, title: 'พลังของ Business Logic จากประสบการณ์จริง', desc: 'ทุก Blueprint กลั่นกรองจากประสบการณ์ AI Consultant, Sales & Business Development เกือบ 9 ปี ออกแบบมาเพื่อหวังผลลัพธ์ทางธุรกิจโดยเฉพาะ' },
              { icon: Play, title: '"คุมเกม" ได้เหนือกว่าด้วยการเข้าใจแนวคิด (The Why Video)', desc: 'เราสอนให้คุณเข้าใจ "Why" หรือตรรกะเบื้องหลังผ่านวิดีโอ เมื่อเข้าใจ Logic นี้แล้ว ต่อให้ AI อัปเดตไปกี่รุ่น คุณก็ยังเป็นผู้คุมเกมได้เอง' },
              { icon: Target, title: 'คัดสรรเพื่อรองรับหลากหลายธุรกิจ (Multi-Industry Solutions)', desc: '100+ รายการที่ครอบคลุมความต้องการของหลายอุตสาหกรรม ไม่ว่าอสังหาฯ, คอร์สออนไลน์, E-commerce หรือบริการเฉพาะทาง พร้อมหยิบไปใช้จริง' },
              { icon: Zap, title: 'พลิกแพลงไอเดียให้ "ฉลาดสุดๆ"', desc: 'เน้นการสอนวิธี Implementation ที่ล้ำกว่าเดิม เช่น การเปลี่ยนรีวิวด้านลบของคู่แข่งให้เป็นโอกาส หรือสร้าง AI ติวเตอร์เฉพาะธุรกิจ' },
              { icon: Check, title: 'ระบบ Support & Update ที่เติบโตไปพร้อมคุณ', desc: 'อัปเดตใหม่ทุกเดือนเพื่อให้ก้าวทันเทคโนโลยี และสิทธิ์ในการ "ขอเทมเพลตเฉพาะทาง" เปรียบเสมือนมี Prompt Engineer ส่วนตัว' },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-md p-10 rounded-[2rem] border border-white/10 hover:bg-white/10 transition duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                  <item.icon className="text-purple-400" size={24} />
                </div>
                <h3 className="text-xl font-medium mb-4 text-white">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 9. Final CTA */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-32 md:py-48 px-6 bg-gradient-to-b from-[#1a0b2e] to-black text-white text-center relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex justify-center mb-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-xs font-semibold tracking-widest uppercase text-zinc-300"
            >
              JOIN THE AI REVOLUTION
            </motion.div>
          </div>
          <h2 className="text-5xl md:text-7xl font-medium mb-8 tracking-tight">
            Ready to start your AI <br className="hidden md:block" /> journey with us?
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 mb-12 leading-relaxed max-w-2xl mx-auto">
            Join 1,000+ professionals using proven frameworks to scale faster.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <button onClick={onGetStarted} className="w-full md:w-auto bg-white text-zinc-900 px-8 py-4 rounded-xl font-medium text-base hover:bg-zinc-200 transition shadow-lg shadow-white/10">
              Get Started
            </button>
            <button className="w-full md:w-auto bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-medium text-base hover:bg-white/20 transition">
              Book a Demo
            </button>
          </div>
          <p className="text-sm text-zinc-500">No credit card required. Cancel anytime.</p>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="py-20 px-8 text-center text-zinc-500 text-sm border-t border-zinc-100">
        &copy; 2026 GPTs & GEM Hub. All rights reserved.
      </footer>
    </div>
  );
};
