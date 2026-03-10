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
    description: 'Generate persuasive sales emails.',
    logic_template: 'Write a sales email for {{product}} targeting {{target_audience}} with a {{tone}} tone.',
    input_fields: [
      { label: 'Product', type: 'text', placeholder: 'e.g., SaaS Tool', name: 'product' },
      { label: 'Target Audience', type: 'text', placeholder: 'e.g., Small business owners', name: 'target_audience' },
      { label: 'Tone', type: 'text', placeholder: 'e.g., Professional', name: 'tone' },
    ],
    tier: 'free',
  },
  {
    id: '2',
    title: 'Marketing Ad Copy',
    category: 'Marketing',
    description: 'Create catchy ad copy for social media.',
    logic_template: 'Create a social media ad for {{product}} focusing on {{benefit}}.',
    input_fields: [
      { label: 'Product', type: 'text', placeholder: 'e.g., Sneakers', name: 'product' },
      { label: 'Benefit', type: 'text', placeholder: 'e.g., Comfort', name: 'benefit' },
    ],
    tier: 'free',
  },
  {
    id: '3',
    title: 'Blog Post Outline',
    category: 'Content',
    description: 'Create a structured outline for your blog post.',
    logic_template: 'Create a blog post outline about {{topic}} for {{target_audience}}.',
    input_fields: [
      { label: 'Topic', type: 'text', placeholder: 'e.g., AI Trends', name: 'topic' },
      { label: 'Target Audience', type: 'text', placeholder: 'e.g., Developers', name: 'target_audience' },
    ],
    tier: 'free',
  },
  {
    id: '4',
    title: 'Code Refactoring',
    category: 'Vibe Coding',
    description: 'Refactor your code for better performance.',
    logic_template: 'Refactor the following code to improve {{improvement_type}}: {{code}}',
    input_fields: [
      { label: 'Improvement Type', type: 'text', placeholder: 'e.g., readability', name: 'improvement_type' },
      { label: 'Code', type: 'textarea', placeholder: 'Paste your code here', name: 'code' },
    ],
    tier: 'free',
  },
  {
    id: '5',
    title: 'Product Description',
    category: 'Marketing',
    description: 'Write compelling product descriptions.',
    logic_template: 'Write a product description for {{product_name}} highlighting {{key_feature}}.',
    input_fields: [
      { label: 'Product Name', type: 'text', placeholder: 'e.g., Smart Watch', name: 'product_name' },
      { label: 'Key Feature', type: 'text', placeholder: 'e.g., Battery life', name: 'key_feature' },
    ],
    tier: 'free',
  },
  {
    id: '6',
    title: 'Premium SEO Strategy',
    category: 'Marketing',
    description: 'Advanced SEO strategy generator.',
    logic_template: 'Create an SEO strategy for {{website_url}} focusing on {{keyword}}.',
    input_fields: [
      { label: 'Website URL', type: 'text', placeholder: 'e.g., example.com', name: 'website_url' },
      { label: 'Keyword', type: 'text', placeholder: 'e.g., AI tools', name: 'keyword' },
    ],
    tier: 'premium',
  },
  {
    id: '7',
    title: 'VIP Exclusive Prompt',
    category: 'Content',
    description: 'Highly exclusive prompt for VIPs.',
    logic_template: 'Generate a creative story about {{topic}} with a {{style}} style.',
    input_fields: [
      { label: 'Topic', type: 'text', placeholder: 'e.g., Space', name: 'topic' },
      { label: 'Style', type: 'text', placeholder: 'e.g., Sci-fi', name: 'style' },
    ],
    tier: 'vip',
  },
];
