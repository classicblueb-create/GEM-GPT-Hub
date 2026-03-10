import React, { useState } from 'react';
import { Blueprint } from '../data';
import { Copy } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface PromptGeneratorProps {
  blueprint: Blueprint;
  onClose: () => void;
}

export const PromptGenerator = ({ blueprint, onClose }: PromptGeneratorProps) => {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { decrementRequests, userTier } = useAuth();

  const handleInputChange = (name: string, value: string) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const generatePrompt = async () => {
    setLoading(true);
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 800));

    let template = blueprint.logic_template;
    Object.keys(inputs).forEach((key) => {
      template = template.replace(`{{${key}}}`, inputs[key]);
    });
    setResult(template);
    if (userTier === 'vip') {
      decrementRequests();
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-purple-900 mb-6">{blueprint.title}</h2>
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
        <button
          className={`w-full text-white py-3 rounded-xl mb-4 ${loading ? 'bg-purple-700 cursor-not-allowed' : 'bg-purple-900'}`}
          onClick={generatePrompt}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
        {result && (
          <div className="bg-gray-100 p-4 rounded-xl relative">
            <p className="text-gray-800">{result}</p>
            <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow" onClick={copyToClipboard}>
              <Copy size={16} />
            </button>
          </div>
        )}
        <button className="w-full text-gray-500 py-2" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
