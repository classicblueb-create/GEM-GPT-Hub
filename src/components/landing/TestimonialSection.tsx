import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "คุณสมชาย",
    role: "เจ้าของธุรกิจ SME",
    content: "ตั้งแต่ใช้ GEM Hub การทำงานของทีมเร็วขึ้นมาก ไม่ต้องมานั่งคิด Prompt เองทุกครั้ง ประหยัดเวลาไปได้หลายชั่วโมงต่อสัปดาห์",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: 2,
    name: "คุณวิภาดา",
    role: "Marketing Manager",
    content: "ชอบฟีเจอร์ GEM Maker มากค่ะ แค่พิมพ์ว่าอยากได้อะไร ระบบก็สร้าง Custom Instruction ระดับโปรมาให้เลย เอาไปใช้ต่อได้ทันที",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 3,
    name: "คุณธนพล",
    role: "Content Creator",
    content: "Blueprint ที่มีให้เลือกใช้ครอบคลุมมาก โดยเฉพาะสาย Content ช่วยคิดไอเดียและเขียนโครงร่างได้ตรงจุดสุดๆ คุ้มค่ามากครับ",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=8"
  }
];

export const TestimonialSection = () => {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            เสียงตอบรับจากผู้ใช้งานจริง
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ส่วนหนึ่งของความประทับใจจากผู้ที่นำระบบของเราไปใช้จริงในธุรกิจ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white/60 backdrop-blur-xl border border-white/60 p-8 rounded-3xl shadow-xl shadow-gray-200/50 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#ff9146] text-[#ff9146]" />
                ))}
              </div>
              <p className="text-gray-700 mb-8 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
