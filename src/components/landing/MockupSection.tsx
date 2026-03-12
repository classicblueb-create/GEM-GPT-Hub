import React, { useEffect } from 'react';

export const MockupSection = () => {
  useEffect(() => {
    const flipCards = document.querySelectorAll('.scroll-flip-card');
    const cardsData = Array.from(flipCards).map((card: any, index) => ({
        el: card,
        targetP: 1,
        currentP: 1,
        direction: 1,
        index: index,
        absoluteCenterY: 0
    }));

    function calculateCenters() {
        cardsData.forEach(data => {
            const currentTransform = data.el.style.transform;
            const currentTransition = data.el.style.transition;
            data.el.style.transform = 'none';
            data.el.style.transition = 'none';
            const rect = data.el.getBoundingClientRect();
            data.absoluteCenterY = rect.top + window.scrollY + (rect.height / 2);
            data.el.style.transform = currentTransform;
            data.el.style.transition = currentTransition;
        });
    }

    window.addEventListener('resize', calculateCenters);
    window.addEventListener('load', calculateCenters);
    setTimeout(calculateCenters, 150);

    let animationFrameId: number;
    function render() {
        const windowHeight = window.innerHeight;
        const viewportCenter = windowHeight / 2;
        const scrollY = window.scrollY;
        const threshold = 0.05;
        const animRange = 0.15;

        cardsData.forEach(data => {
            const trueCenter = data.absoluteCenterY - scrollY;
            const distFromCenter = trueCenter - viewportCenter;
            let normalizedDist = distFromCenter / windowHeight;

            let targetP = 0;
            let dir = 1;

            if (normalizedDist > threshold) {
                targetP = (normalizedDist - threshold) / animRange;
                dir = 1;
            } else if (normalizedDist < -threshold) {
                targetP = (-normalizedDist - threshold) / animRange;
                dir = -1;
            }

            data.targetP = Math.min(1, Math.max(0, targetP));

            if (Math.abs(normalizedDist) > threshold) {
                data.direction = dir;
            }

            const lerpSpeed = 0.6;
            data.currentP += (data.targetP - data.currentP) * lerpSpeed;

            const p = data.currentP;
            const easeP = 1 - Math.pow(1 - p, 3);
            const opacity = 1 - (easeP * 0.85);

            const rotateX = data.direction * 40 * easeP;
            const rotateYDir = data.index % 2 === 0 ? 1 : -1;
            const rotateY = data.direction * rotateYDir * 10 * easeP;

            const translateY = data.direction * 150 * easeP;
            const translateZ = -250 * easeP;

            const blurAmount = 12 * Math.pow(easeP, 2);

            data.el.style.transformOrigin = 'center center';
            data.el.style.opacity = Math.min(1, Math.max(0, opacity)).toFixed(3);
            data.el.style.filter = blurAmount > 0.1 ? `blur(${blurAmount.toFixed(2)}px)` : 'blur(0px)';
            data.el.style.transform = `perspective(2000px) translate3d(0, ${translateY.toFixed(2)}px, ${translateZ.toFixed(2)}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
        });

        animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', calculateCenters);
      window.removeEventListener('load', calculateCenters);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="sm:px-6 max-w-6xl mt-16 mr-auto ml-auto pr-4 pl-4 perspective-[2000px]">
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-2xl shadow-gray-200/60 dark:shadow-black/20 overflow-hidden ring-1 ring-black/[0.04] dark:ring-white/[0.05] scroll-flip-card opacity-0 relative z-30">
        <div className="flex gap-4 bg-[#f9fafb] dark:bg-gray-900 border-gray-200/60 dark:border-gray-800 border-b pt-3 pr-4 pb-3 pl-4 items-center justify-between relative z-20">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex dark:text-gray-400 dark:bg-gray-800 dark:border-gray-700 gap-1.5 text-xs font-normal text-gray-500 bg-white w-full max-w-sm border-gray-200 border rounded-md pt-1.5 pr-4 pb-1.5 pl-4 shadow-sm gap-x-1.5 gap-y-1.5 items-center justify-center cursor-pointer">
              gpt-gem-hub.com/dashboard
            </div>
          </div>
          <div className="w-12"></div>
        </div>

        <div className="relative bg-[#EEF2F5] dark:bg-[#0B0F19] min-h-[700px] p-4 sm:p-6 lg:p-8 overflow-hidden font-sans">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-purple-500/10 dark:bg-purple-500/5 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="flex justify-center mb-8 relative z-10">
            <div className="flex items-center gap-3 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/40 dark:border-gray-700/50 shadow-sm ring-1 ring-black/5 dark:ring-white/5">
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Home</span>
              <span className="text-xs text-gray-300 dark:text-gray-700">/</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">Dashboard</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 max-w-6xl mx-auto w-full items-start">
            <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
              <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800/80 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <iconify-icon icon="lucide:brain" width="16"></iconify-icon>
                    </div>
                    <h3 className="text-base font-medium text-gray-900 dark:text-white tracking-tight">AI Generation</h3>
                  </div>
                  <div className="mb-6">
                    <div className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Credits Remaining</div>
                    <div className="text-4xl font-medium tracking-tight text-purple-600 dark:text-purple-400">1,250</div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <input type="text" placeholder="Generate a new prompt..." className="w-full bg-transparent border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600" />
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors shadow-sm shadow-purple-500/20">Generate</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1 lg:col-span-7 flex flex-col gap-6">
              <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800/80 hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-pink-50 dark:bg-pink-500/10 flex items-center justify-center text-pink-500">
                    <iconify-icon icon="lucide:zap" width="16"></iconify-icon>
                  </div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-white tracking-tight">Recent Blueprints</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto">
                  {['Sales Copy Framework', 'Marketing Strategy', 'Content Calendar', 'Vibe Coding Setup'].map((item, i) => (
                    <div key={i} className="border border-gray-100 dark:border-gray-800 rounded-xl p-3.5 bg-white dark:bg-[#111827] flex items-start gap-3 hover:border-gray-200 dark:hover:border-gray-700 transition-colors cursor-pointer shadow-sm">
                      <div className="w-2.5 h-2.5 rounded-full bg-pink-400 mt-1 shrink-0 shadow-[0_0_8px_rgba(244,114,182,0.4)]"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{item}</div>
                        <div className="text-xs font-normal text-gray-500 dark:text-gray-400 mb-2 mt-0.5">Used 2 mins ago</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
