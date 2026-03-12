import React from 'react';

export const PricingSection = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
    <section className="sm:px-6 max-w-6xl mt-40 mr-auto mb-24 ml-auto pr-4 pl-4" id="pricing">
      <div className="text-center mb-16">
        <h2 className="sm:text-4xl dark:text-white text-3xl font-medium text-gray-900 tracking-tight mb-4 animate-[animationIn_0.4s_ease-out_both]">
          แพ็กเกจที่คุ้มค่าและโปร่งใส
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-[animationIn_0.4s_ease-out_both]">
          เลือกแพ็กเกจที่เหมาะกับความต้องการของคุณ
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-stretch">
        {/* Free Tier */}
        <div className="relative flex flex-col w-full rounded-[2.5rem] overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl shadow-gray-200/50 dark:shadow-black/20 ring-1 ring-black/[0.03] p-8 sm:p-10 transition-transform hover:-translate-y-2 duration-300">
          <div className="flex-1 text-left">
            <h3 className="text-2xl font-medium text-gray-900 dark:text-white tracking-tight mb-2">
              Free Tier
            </h3>
            <div className="text-4xl font-semibold mb-4 text-gray-900 dark:text-white">0.-</div>
            <p className="text-gray-700 dark:text-gray-300 font-normal text-sm mb-6">
              ลองเข้าถึงคลังได้ 4 เรื่องหลัก พร้อมอ่านโครงสร้าง Prompt และคัดลอกไปใช้ได้ทันที
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                <iconify-icon icon="lucide:check" class="text-purple-500"></iconify-icon>
                เข้าถึงคลังได้ 4 เรื่องหลัก
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                <iconify-icon icon="lucide:check" class="text-purple-500"></iconify-icon>
                คัดลอก Prompt ไปใช้ได้ทันที
              </li>
            </ul>
          </div>
          <button onClick={onGetStarted} className="w-full py-3 mt-auto rounded-xl font-medium transition bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
            เริ่มต้นใช้งานฟรี
          </button>
        </div>

        {/* Lifetime Member */}
        <div className="relative flex flex-col w-full rounded-[2.5rem] overflow-hidden bg-white dark:bg-gray-900 border-2 border-purple-500 shadow-2xl shadow-purple-500/20 ring-1 ring-black/[0.03] p-8 sm:p-10 transition-transform hover:-translate-y-2 duration-300 md:-mt-4 md:mb-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-1 rounded-b-xl text-xs font-bold tracking-wider uppercase shadow-lg z-20">
            ยอดนิยม
          </div>
          <div className="flex-1 text-left mt-4">
            <h3 className="text-2xl font-medium text-gray-900 dark:text-white tracking-tight mb-2">
              Lifetime Member
            </h3>
            <div className="text-4xl font-semibold mb-4 text-gray-900 dark:text-white">1,990.-</div>
            <p className="text-gray-700 dark:text-gray-300 font-normal text-sm mb-6">
              จ่ายครั้งเดียวจบ ปลดล็อกคลัง 100+ เรื่อง พร้อมระบบบันทึกประวัติและ Masterclass จัดเต็ม
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                <iconify-icon icon="lucide:check" class="text-purple-500"></iconify-icon>
                ปลดล็อกคลัง 100+ เรื่อง
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                <iconify-icon icon="lucide:check" class="text-purple-500"></iconify-icon>
                รับ Blueprint ใหม่ทุกเดือน
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                <iconify-icon icon="lucide:check" class="text-purple-500"></iconify-icon>
                AI Generation (2 Credits)
              </li>
            </ul>
          </div>
          <button onClick={onGetStarted} className="w-full py-3 mt-auto rounded-xl font-medium transition bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-900/20 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
            สมัครสมาชิก
          </button>
        </div>

        {/* VIP Member */}
        <div className="relative flex flex-col w-full rounded-[2.5rem] overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl shadow-gray-200/50 dark:shadow-black/20 ring-1 ring-black/[0.03] p-8 sm:p-10 transition-transform hover:-translate-y-2 duration-300">
          <div className="flex-1 text-left">
            <h3 className="text-2xl font-medium text-gray-900 dark:text-white tracking-tight mb-2">
              VIP Member
            </h3>
            <div className="text-4xl font-semibold mb-4 text-gray-900 dark:text-white">299.- <span className="text-lg text-gray-500">/เดือน</span></div>
            <p className="text-gray-700 dark:text-gray-300 font-normal text-sm mb-6">
              The Growth Partner สำหรับคนที่ต้องการสร้างระบบหลายแผนก พร้อมสิทธิ์ปรึกษาแบบตัวต่อตัว
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                <iconify-icon icon="lucide:check" class="text-pink-500"></iconify-icon>
                สิทธิ์ Interactive Builder (20 ครั้ง/เดือน)
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                <iconify-icon icon="lucide:check" class="text-pink-500"></iconify-icon>
                ปรึกษาตัวต่อตัว 30 นาที/เดือน
              </li>
            </ul>
          </div>
          <button onClick={onGetStarted} className="w-full py-3 mt-auto rounded-xl font-medium transition bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
            สมัครสมาชิก
          </button>
        </div>
      </div>
    </section>
  );
};
