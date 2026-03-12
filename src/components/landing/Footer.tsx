import React from 'react';
import { LayoutDashboard, Twitter, Github, Linkedin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-400 py-16 relative z-20 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
                <LayoutDashboard size={18} />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">GPTs & GEM Hub</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              ศูนย์กลางการสั่งการ AI ส่วนตัวของคุณ เปลี่ยนไอเดียให้กลายเป็นระบบ AI พร้อมใช้ใน 30 วินาที
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">ฟีเจอร์หลัก</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Blueprint Hub</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GEM Maker</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Custom Instructions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Export to Docs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">ทรัพยากร</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">คู่มือการใช้งาน</a></li>
              <li><a href="#" className="hover:text-white transition-colors">บล็อก</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ศูนย์ช่วยเหลือ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ติดต่อเรา</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">กฎหมาย</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">เงื่อนไขการให้บริการ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว</a></li>
              <li><a href="#" className="hover:text-white transition-colors">นโยบายคุกกี้</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            &copy; {currentYear} GPTs & GEM Hub (Modgoscale Logic). All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span>Made with</span>
            <span className="text-pink-500">♥</span>
            <span>for AI Builders</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
