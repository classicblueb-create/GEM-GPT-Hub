import React, { useState } from 'react';
import { Blueprint } from '../data';
import { Copy } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { addBreadcrumb, captureError } from '../lib/sentry';

interface PromptGeneratorProps {
  blueprint: Blueprint;
  onClose: () => void;
}

export const PromptGenerator = ({ blueprint, onClose }: PromptGeneratorProps) => {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { incrementRequestCount, remainingRequests, userProfile } = useAuth();

  const handleInputChange = (name: string, value: string) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const generatePrompt = async () => {
    // Check if user has remaining requests
    if (remainingRequests <= 0) {
      alert('คุณใช้สิทธิ์การสร้าง Prompt ครบแล้ว กรุณาอัปเกรดเป็น Premium หรือ VIP');
      return;
    }

    setLoading(true);
    try {
      // Increment request count before generating
      const canProceed = await incrementRequestCount();
      if (!canProceed) {
        alert('คุณใช้สิทธิ์การสร้าง Prompt ครบแล้ว กรุณาอัปเกรดเป็น Premium หรือ VIP');
        return;
      }

      addBreadcrumb('Starting prompt generation', 'ai-usage', 'info');

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 800));

      let template = blueprint.logic_template;
      Object.keys(inputs).forEach((key) => {
        template = template.replace(`{{${key}}}`, inputs[key]);
      });
      setResult(template);
      addBreadcrumb('Prompt generated successfully', 'ai-usage', 'info');
    } catch (error) {
      console.error('Error generating prompt:', error);
      captureError(error as Error, {
        component: 'PromptGenerator',
        action: 'generate',
        blueprintId: blueprint.id,
        inputCount: Object.keys(inputs).length,
      });
      addBreadcrumb('Prompt generation failed', 'error', 'error');
      alert('เกิดข้อผิดพลาดในการสร้าง Prompt กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-900">{blueprint.title}</h2>
          <div className="text-sm text-gray-600">
            คงเหลือ: {remainingRequests} ครั้ง
            {remainingRequests === 0 && (
              <span className="text-red-500 ml-2">ใช้ครบแล้ว</span>
            )}
          </div>
        </div>

        {blueprint.input_fields.map((field) => (
          <div key={field.name} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                className="w-full p-3 border border-gray-300 rounded-xl"
                placeholder={field.placeholder}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
              />
            ) : (
              <input
                type={field.type}
                className="w-full p-3 border border-gray-300 rounded-xl"
                placeholder={field.placeholder}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
              />
            )}
          </div>
        ))}

        <div className="flex gap-3 mb-4">
          <button
            className={`flex-1 text-white py-3 rounded-xl ${
              loading || remainingRequests === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-purple-900 hover:bg-purple-800'
            }`}
            onClick={generatePrompt}
            disabled={loading || remainingRequests === 0}
          >
            {loading ? 'กำลังสร้าง...' : 'สร้าง Prompt'}
          </button>

          {remainingRequests === 0 && (
            <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl text-sm font-medium">
              อัปเกรด
            </button>
          )}
        </div>

        {result && (
          <div className="bg-gray-100 p-4 rounded-xl relative">
            <p className="text-gray-800 whitespace-pre-wrap">{result}</p>
            <button
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-50"
              onClick={copyToClipboard}
              title="คัดลอก"
            >
              <Copy size={16} />
            </button>
          </div>
        )}

        <button className="w-full text-gray-500 py-2 mt-4" onClick={onClose}>ปิด</button>
      </div>
    </div>
  );
};
