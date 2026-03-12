import React, { useState } from 'react';

export const DualCardsSection = () => {
  const [flipped1, setFlipped1] = useState(false);
  const [flipped2, setFlipped2] = useState(false);

  return (
    <section className="sm:px-6 overflow-hidden max-w-6xl mt-40 mr-auto ml-auto pr-4 pl-4 perspective-[2000px]">
      <div className="flex flex-col items-center justify-center text-center animate-[animationIn_0.4s_ease-out_both] mb-12 gap-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-medium text-gray-900 tracking-tight">ทุกสิ่งที่คุณต้องการเพื่อเชี่ยวชาญ AI</h2>
          <p className="text-lg font-normal text-gray-700 mt-4">
            ระบบที่ทำงานสอดประสานกัน สร้างความน่าเชื่อถือและลดภาระงานของคุณ
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12 lg:gap-16 gap-x-8 gap-y-8 items-start">
        {/* CARD 1 */}
        <div className="relative block w-full aspect-[4/3] sm:aspect-[4/3]" style={{ perspective: '2000px' }}>
          <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${flipped1 ? '[transform:rotateY(180deg)]' : ''}`}>
            {/* FRONT */}
            <div onClick={() => setFlipped1(true)} className="absolute inset-0 w-full h-full [backface-visibility:hidden] cursor-pointer group rounded-[2.5rem] overflow-hidden bg-white border border-gray-100 shadow-2xl shadow-gray-300/60 ring-1 ring-black/[0.03]">
              <div className="absolute inset-0 bg-[#FAFAFA] transition-colors duration-500 group-hover:bg-gray-50">
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]"></div>
              </div>
              <div className="sm:p-10 flex flex-col z-10 pt-8 pr-8 pb-8 pl-8 absolute top-0 right-0 bottom-0 left-0 justify-between">
                <div className="flex justify-between items-center z-20">
                  <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-normal text-gray-700 border border-white/40 shadow-sm uppercase tracking-wider">
                    ฟีเจอร์หลัก
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className="sm:text-4xl group-hover:text-purple-600 transition-all duration-300 text-3xl font-normal text-gray-900 tracking-tight mb-2">
                    The Vault: คลังแสง AI อัจฉริยะ
                  </h3>
                  <p className="text-lg font-light text-gray-800 drop-shadow-sm">
                    รวม 100+ Blueprints จากประสบการณ์ 9 ปี
                  </p>
                </div>
              </div>
            </div>
            {/* BACK */}
            <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[2.5rem] bg-white border border-gray-100 shadow-2xl shadow-gray-300/60 ring-1 ring-black/[0.03] p-6 sm:p-10 flex flex-col z-20">
              <div className="flex justify-between items-center mb-6 shrink-0 border-b border-gray-100 pb-4">
                <h3 className="text-2xl font-medium tracking-tight text-gray-900">The Vault</h3>
                <button onClick={() => setFlipped1(false)} className="p-2 -mr-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
                  <iconify-icon icon="lucide:x" width="20"></iconify-icon>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                <p className="text-sm leading-relaxed font-normal text-gray-700">
                  รวม 100+ Blueprints จากประสบการณ์ 9 ปี แยกหมวดหมู่ธุรกิจ พร้อมระบบค้นหาอัจฉริยะ
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="relative block w-full aspect-[4/3] sm:aspect-[4/3] md:mt-24" style={{ perspective: '2000px' }}>
          <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${flipped2 ? '[transform:rotateY(180deg)]' : ''}`}>
            {/* FRONT */}
            <div onClick={() => setFlipped2(true)} className="absolute inset-0 w-full h-full [backface-visibility:hidden] cursor-pointer group rounded-[2.5rem] overflow-hidden bg-white border border-gray-100 shadow-2xl shadow-gray-300/60 ring-1 ring-black/[0.03]">
              <div className="absolute inset-0 bg-[#FAFAFA] transition-colors duration-500 group-hover:bg-gray-50">
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              </div>
              <div className="sm:p-10 flex flex-col z-10 pt-8 pr-8 pb-8 pl-8 absolute top-0 right-0 bottom-0 left-0 justify-between">
                <div className="flex justify-between items-center relative z-10">
                  <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-normal text-gray-700 border border-white/40 shadow-sm uppercase tracking-wider">
                    ฟีเจอร์หลัก
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className="sm:text-4xl group-hover:text-pink-600 transition-colors text-3xl font-normal text-gray-900 tracking-tight mb-2">
                    Interactive Prompt Generator
                  </h3>
                  <p className="text-lg font-light text-gray-800 drop-shadow-sm">
                    ระบบเติมคำในช่องว่างที่รวม Business Logic
                  </p>
                </div>
              </div>
            </div>
            {/* BACK */}
            <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[2.5rem] bg-white border border-gray-100 shadow-2xl shadow-gray-300/60 ring-1 ring-black/[0.03] p-6 sm:p-10 flex flex-col z-20">
              <div className="flex justify-between items-center mb-6 shrink-0 border-b border-gray-100 pb-4">
                <h3 className="text-2xl font-medium tracking-tight text-gray-900">Prompt Generator</h3>
                <button onClick={() => setFlipped2(false)} className="p-2 -mr-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
                  <iconify-icon icon="lucide:x" width="20"></iconify-icon>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                <p className="text-sm leading-relaxed font-normal text-gray-700">
                  ระบบเติมคำในช่องว่างที่รวม Business Logic ให้คุณก๊อปปี้ไปใช้ได้ทันที
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
