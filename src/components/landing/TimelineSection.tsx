import React, { useEffect, useRef } from 'react';

export const TimelineSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateBeam = () => {
      const section = sectionRef.current;
      const beam = beamRef.current;
      if (!section || !beam) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionTop = rect.top;
      
      let fillHeight = (viewportHeight / 2) - sectionTop;
      fillHeight = Math.max(0, Math.min(fillHeight, rect.height));
      beam.style.height = `${fillHeight}px`;

      const steps = section.querySelectorAll('.timeline-step');
      steps.forEach((step: any) => {
        const node = step.querySelector('.timeline-node');
        if (!node) return;
        const nodeTop = step.offsetTop;
        if (fillHeight >= nodeTop) {
          node.classList.add('node-active');
        } else {
          node.classList.remove('node-active');
        }
      });
    };

    window.addEventListener('scroll', updateBeam);
    window.addEventListener('resize', updateBeam);
    setTimeout(updateBeam, 100);

    const observerOptions = { threshold: 0.2, rootMargin: '0px' };
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const left = entry.target.querySelector('.reveal-left');
          const right = entry.target.querySelector('.reveal-right');
          if (left) left.classList.add('reveal-visible');
          if (right) right.classList.add('reveal-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const steps = sectionRef.current?.querySelectorAll('.timeline-step');
    steps?.forEach(step => revealObserver.observe(step));

    const focusObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.filter = 'blur(0px)';
        } else {
          (entry.target as HTMLElement).style.opacity = '0.5';
          (entry.target as HTMLElement).style.filter = 'blur(1px)';
        }
      });
    }, {
      rootMargin: '-10% 0px -10% 0px', 
      threshold: 0.1
    });

    steps?.forEach(step => {
      (step as HTMLElement).style.transition = 'opacity 0.3s ease-out, filter 0.3s ease-out';
      focusObserver.observe(step);
    });

    return () => {
      window.removeEventListener('scroll', updateBeam);
      window.removeEventListener('resize', updateBeam);
      revealObserver.disconnect();
      focusObserver.disconnect();
    };
  }, []);

  return (
    <section className="sm:px-6 max-w-6xl mt-40 mr-auto ml-auto pr-4 pl-4 perspective-[2000px]">
      <div className="sm:py-32 overflow-hidden dark:bg-[#0b0f19]/50 bg-white/50 w-full rounded-3xl pt-20 pb-20 relative">
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob dark:mix-blend-normal dark:opacity-10 dark:blur-[100px]"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob animation-delay-2000 dark:mix-blend-normal dark:opacity-10 dark:blur-[100px]"></div>
        </div>

        <div ref={sectionRef} className="sm:px-6 z-10 max-w-7xl mr-auto ml-auto pr-4 pl-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-32 transition-all duration-1000">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-medium uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
              Process Architecture
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium text-gray-900 dark:text-white tracking-tight mb-6">
              ระบบนิเวศ <span className="text-purple-600">ของเรา</span>
            </h2>
          </div>

          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800 transform lg:-translate-x-1/2 h-full z-0">
            <div ref={beamRef} className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-500 via-pink-500 to-transparent shadow-[0_0_15px_rgba(168,85,247,0.6)] w-[3px] -ml-[1px] h-0 transition-all duration-100 ease-out will-change-[height]"></div>
          </div>

          <div className="z-10 lg:space-y-32 relative space-y-24" id="timeline-steps">
            {/* Step 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 timeline-step relative gap-x-12 gap-y-12 items-center">
              <svg className="timeline-noodle absolute inset-0 w-full h-full pointer-events-none hidden lg:block" style={{ zIndex: 1 }}>
                <path d="M 50% 50% C 60% 50% 80% 50% 100% 50%" stroke="currentColor" className="text-gray-200 dark:text-gray-800" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke"></path>
                <path d="M 50% 50% C 60% 50% 80% 50% 100% 50%" className="noodle-beam stroke-purple-500" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke"></path>
              </svg>
              <div className="absolute left-8 lg:left-1/2 w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 transform -translate-x-1/2 z-20 transition-all duration-300 timeline-node shadow-[0_0_0_4px_rgba(255,255,255,1)] dark:shadow-[0_0_0_4px_rgba(11,15,25,1)] top-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 hover:bg-purple-500 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:z-30"></div>

              <div className="pl-16 lg:pl-0 lg:pr-12 lg:text-right order-1 reveal-left">
                <div className="inline-block mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-500">Phase 01</span>
                </div>
                <h3 className="text-3xl font-medium text-gray-900 dark:text-white mb-4 tracking-tight">Logic Masterclass</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  วิดีโอสอนตรรกะ "The Why" และคู่มือการตั้งค่า GEM/GPTs แบบมืออาชีพ
                </p>
              </div>

              <div className="pl-16 lg:pl-12 order-2 reveal-right">
                <div className="relative group rounded-2xl overflow-hidden bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/60 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1 p-8">
                  <iconify-icon icon="lucide:play-circle" width="48" class="text-purple-500 mb-4"></iconify-icon>
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 timeline-step relative gap-x-12 gap-y-12 items-center">
              <div className="absolute left-8 lg:left-1/2 w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 transform -translate-x-1/2 z-20 transition-all duration-300 timeline-node shadow-[0_0_0_4px_rgba(255,255,255,1)] dark:shadow-[0_0_0_4px_rgba(11,15,25,1)] top-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 hover:bg-pink-500 hover:border-pink-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.6)] hover:z-30"></div>
              <svg className="timeline-noodle absolute inset-0 w-full h-full pointer-events-none hidden lg:block" style={{ zIndex: 1 }}>
                <path d="M 50% 50% C 40% 50% 20% 50% 0% 50%" stroke="currentColor" className="text-gray-200 dark:text-gray-800" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke"></path>
                <path d="M 50% 50% C 40% 50% 20% 50% 0% 50%" className="noodle-beam stroke-pink-500" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke"></path>
              </svg>

              <div className="pl-16 lg:pl-0 lg:pr-12 order-2 lg:order-1 reveal-left">
                <div className="relative group rounded-2xl overflow-hidden bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/60 shadow-2xl hover:shadow-pink-500/10 transition-all duration-500 hover:-translate-y-1 p-8">
                  <iconify-icon icon="lucide:star" width="48" class="text-pink-500 mb-4"></iconify-icon>
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>

              <div className="pl-16 lg:pl-12 lg:order-2 reveal-right">
                <div className="inline-block mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-500">Phase 02</span>
                </div>
                <h3 className="text-3xl font-medium text-gray-900 dark:text-white mb-4 tracking-tight">VIP Request System</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  สิทธิ์ขอออกแบบ Blueprint เฉพาะทาง พร้อมหน้า Board ติดตามสถานะและอัปเดตรายเดือน
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 timeline-step relative gap-x-12 gap-y-12 items-center">
              <svg className="timeline-noodle absolute inset-0 w-full h-full pointer-events-none hidden lg:block" style={{ zIndex: 1 }}>
                <path d="M 50% 50% C 60% 50% 80% 50% 100% 50%" stroke="currentColor" className="text-gray-200 dark:text-gray-800" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke"></path>
                <path d="M 50% 50% C 60% 50% 80% 50% 100% 50%" className="noodle-beam stroke-purple-500" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke"></path>
              </svg>
              <div className="absolute left-8 lg:left-1/2 w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 transform -translate-x-1/2 z-20 transition-all duration-300 timeline-node shadow-[0_0_0_4px_rgba(255,255,255,1)] dark:shadow-[0_0_0_4px_rgba(11,15,25,1)] top-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 hover:bg-purple-500 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:z-30"></div>

              <div className="pl-16 lg:pl-0 lg:pr-12 lg:text-right order-1 reveal-left">
                <div className="inline-block mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-500">Phase 03</span>
                </div>
                <h3 className="text-3xl font-medium text-gray-900 dark:text-white mb-4 tracking-tight">Multi-Platform Support</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  รองรับทั้ง ChatGPT Plus และวิธีสร้าง GEM ส่วนตัวบน Google Gemini
                </p>
              </div>

              <div className="pl-16 lg:pl-12 order-2 reveal-right">
                <div className="relative group rounded-2xl overflow-hidden bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/60 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1 p-8">
                  <iconify-icon icon="lucide:layers" width="48" class="text-purple-500 mb-4"></iconify-icon>
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 timeline-step relative gap-x-12 gap-y-12 items-center">
              <div className="absolute left-8 lg:left-1/2 w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 transform -translate-x-1/2 z-20 transition-all duration-300 timeline-node shadow-[0_0_0_4px_rgba(255,255,255,1)] dark:shadow-[0_0_0_4px_rgba(11,15,25,1)] top-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 hover:bg-pink-500 hover:border-pink-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.6)] hover:z-30"></div>
              <svg className="timeline-noodle absolute inset-0 w-full h-full pointer-events-none hidden lg:block" style={{ zIndex: 1 }}>
                <path d="M 50% 50% C 40% 50% 20% 50% 0% 50%" stroke="currentColor" className="text-gray-200 dark:text-gray-800" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke"></path>
                <path d="M 50% 50% C 40% 50% 20% 50% 0% 50%" className="noodle-beam stroke-pink-500" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke"></path>
              </svg>

              <div className="pl-16 lg:pl-0 lg:pr-12 order-2 lg:order-1 reveal-left">
                <div className="relative group rounded-2xl overflow-hidden bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/60 shadow-2xl hover:shadow-pink-500/10 transition-all duration-500 hover:-translate-y-1 p-8">
                  <iconify-icon icon="lucide:refresh-cw" width="48" class="text-pink-500 mb-4"></iconify-icon>
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>

              <div className="pl-16 lg:pl-12 lg:order-2 reveal-right">
                <div className="inline-block mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-500">Phase 04</span>
                </div>
                <h3 className="text-3xl font-medium text-gray-900 dark:text-white mb-4 tracking-tight">System Support & Update</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  อัปเดตใหม่ทุกเดือนเพื่อให้ก้าวทันเทคโนโลยี และสิทธิ์ในการ "ขอเทมเพลตเฉพาะทาง"
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
