export type Tier = 'free' | 'premium' | 'vip';

export interface InputField {
  label: string;
  type: string;
  placeholder: string;
  name: string;
}

export interface Blueprint {
  id: string;
  title: string;
  category: string;
  description: string;
  logic_template: string;
  input_fields: InputField[];
  tier: Tier;
}

export const blueprints: Blueprint[] = [
  {
    id: '1',
    title: 'Sales Email Generator',
    category: 'Sales',
    description: 'สร้างอีเมลขายสินค้าที่น่าสนใจและดึงดูดลูกค้า',
    logic_template: 'Write a sales email for {{product}} targeting {{target_audience}} with a {{tone}} tone.',
    input_fields: [
      { label: 'สินค้า/บริการ', type: 'text', placeholder: 'เช่น ซอฟต์แวร์จัดการร้านอาหาร', name: 'product' },
      { label: 'กลุ่มเป้าหมาย', type: 'text', placeholder: 'เช่น เจ้าของธุรกิจขนาดเล็ก', name: 'target_audience' },
      { label: 'โทนเสียง', type: 'text', placeholder: 'เช่น เป็นมืออาชีพและน่าเชื่อถือ', name: 'tone' },
    ],
    tier: 'free',
  },
  {
    id: '2',
    title: 'Marketing Ad Copy',
    category: 'Marketing',
    description: 'สร้างคำโฆษณาที่ดึงดูดสำหรับโซเชียลมีเดีย',
    logic_template: 'Create a social media ad for {{product}} focusing on {{benefit}}.',
    input_fields: [
      { label: 'สินค้า', type: 'text', placeholder: 'เช่น รองเท้าวิ่ง', name: 'product' },
      { label: 'จุดเด่น/ประโยชน์', type: 'text', placeholder: 'เช่น ความนุ่มสบาย', name: 'benefit' },
    ],
    tier: 'free',
  },
  {
    id: '3',
    title: 'Blog Post Outline',
    category: 'Content',
    description: 'สร้างโครงร่างบทความบล็อกที่เป็นระบบ',
    logic_template: 'Create a blog post outline about {{topic}} for {{target_audience}}.',
    input_fields: [
      { label: 'หัวข้อ', type: 'text', placeholder: 'เช่น เทรนด์ AI ปี 2024', name: 'topic' },
      { label: 'กลุ่มเป้าหมาย', type: 'text', placeholder: 'เช่น นักการตลาด', name: 'target_audience' },
    ],
    tier: 'free',
  },
  {
    id: '4',
    title: 'Code Refactoring',
    category: 'Vibe Coding',
    description: 'ปรับปรุงโค้ดของคุณให้มีประสิทธิภาพมากขึ้น',
    logic_template: 'Refactor the following code to improve {{improvement_type}}: {{code}}',
    input_fields: [
      { label: 'สิ่งที่ต้องการปรับปรุง', type: 'text', placeholder: 'เช่น อ่านง่ายขึ้น, ทำงานเร็วขึ้น', name: 'improvement_type' },
      { label: 'โค้ดของคุณ', type: 'textarea', placeholder: 'วางโค้ดของคุณที่นี่', name: 'code' },
    ],
    tier: 'free',
  },
  {
    id: '5',
    title: 'Product Description',
    category: 'Marketing',
    description: 'เขียนรายละเอียดสินค้าให้น่าสนใจ',
    logic_template: 'Write a product description for {{product_name}} highlighting {{key_feature}}.',
    input_fields: [
      { label: 'ชื่อสินค้า', type: 'text', placeholder: 'เช่น นาฬิกาสมาร์ทวอทช์', name: 'product_name' },
      { label: 'ฟีเจอร์เด่น', type: 'text', placeholder: 'เช่น แบตเตอรี่อยู่ได้ 7 วัน', name: 'key_feature' },
    ],
    tier: 'free',
  },
  {
    id: '6',
    title: 'Premium SEO Strategy',
    category: 'Marketing',
    description: 'สร้างกลยุทธ์ SEO ขั้นสูง',
    logic_template: 'Create an SEO strategy for {{website_url}} focusing on {{keyword}}.',
    input_fields: [
      { label: 'URL เว็บไซต์', type: 'text', placeholder: 'เช่น example.com', name: 'website_url' },
      { label: 'คีย์เวิร์ดหลัก', type: 'text', placeholder: 'เช่น เครื่องมือ AI', name: 'keyword' },
    ],
    tier: 'premium',
  },
  {
    id: '7',
    title: 'VIP Exclusive Prompt',
    category: 'Content',
    description: 'Prompt พิเศษเฉพาะสมาชิก VIP',
    logic_template: 'Generate a creative story about {{topic}} with a {{style}} style.',
    input_fields: [
      { label: 'หัวข้อเรื่อง', type: 'text', placeholder: 'เช่น การเดินทางในอวกาศ', name: 'topic' },
      { label: 'สไตล์การเขียน', type: 'text', placeholder: 'เช่น ไซไฟ, ลึกลับ', name: 'style' },
    ],
    tier: 'vip',
  },
];
