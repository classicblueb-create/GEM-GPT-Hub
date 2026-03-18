import React, { useState, useRef } from 'react';
import { Sparkles, Download, FileText, Settings, BookOpen, Loader2, Upload, File as FileIcon, Copy, Check, Info } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';

const LoadingAnimation = () => (
  <div className="flex flex-col items-center justify-center gap-4 py-12">
    <div className="relative w-24 h-24">
      <div className="absolute inset-0 border-4 border-purple-200 dark:border-purple-900 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin"></div>
      <Sparkles className="absolute inset-0 m-auto text-pink-500 animate-pulse" size={32} />
    </div>
    <p className="text-purple-600 dark:text-purple-400 font-medium animate-pulse">กำลังเนรมิต GEM ให้คุณ...</p>
  </div>
);

export const GemMaker = () => {
  const [inputType, setInputType] = useState<'text' | 'file'>('text');
  const [inputPrompt, setInputPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{
    name: string;
    instruction: string;
    howto: string;
  } | null>(null);
  
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [fileResult, setFileResult] = useState<{
    gem: { name: string; description: string; instructions: string; };
    gpt: { name: string; description: string; instructions: string; conversation_starters: string[]; };
    knowledge_recommendations: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  const [error, setError] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith('.md')) {
      setError('Please upload a Markdown (.md) file / กรุณาอัปโหลดไฟล์ Markdown (.md)');
      return;
    }
    setUploadedFile(file);
    setError('');
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setFileContent(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleFileGenerate = async () => {
    if (!fileContent) return;
    
    setIsGenerating(true);
    setError('');
    setFileResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `You are an expert Prompt Engineer. The user has uploaded a skills/persona document (Markdown) to convert into optimized system instructions for Google Gemini GEMs and ChatGPT Custom GPTs.

CRITICAL RULE: You MUST NOT change, distort, or hallucinate the context of the original document. Your job is to format and optimize the existing content into the best possible system prompt structure without losing the original meaning.

When generating the "instructions" for both GEM and GPT, please analyze the original content and structure it using the following framework (use these headings if the original content fits them, to make the prompt highly effective):
1. Role (บทบาท): กำหนดให้ว่าเป็นใคร
2. Goal (เป้าหมาย): บอกว่าต้องทำอะไร
3. Context (บริบท): ขยายความรอบข้าง
4. Inquiry (การถามกลับ): สั่งให้ถามข้อมูลเพิ่ม (ถ้ามี)
5. Step (ขั้นตอน): วางลำดับการทำงาน 1-2-3
6. Tone (น้ำเสียง): ปรับอารมณ์ของภาษา
7. Rules/Constraints (กฏหลัก/ข้อห้าม)

Note: You don't have to force every single heading if the original text absolutely doesn't support it, but you should use this framework to organize the skills logically.

Here is the original document content:
---
${fileContent}
---

Return the result as a JSON object with the following structure:
{
  "gem": {
    "name": "A professional and catchy name for the Gemini GEM (Bilingual: Thai/English)",
    "description": "A short description of what this GEM does (Bilingual: Thai/English)",
    "instructions": "The structured Custom Instruction for Gemini GEM using the 7-part framework above. Keep the original context intact."
  },
  "gpt": {
    "name": "A professional and catchy name for the ChatGPT Custom GPT (Bilingual: Thai/English)",
    "description": "A short description of what this GPT does (Bilingual: Thai/English)",
    "instructions": "The structured Custom Instruction for ChatGPT Custom GPT using the 7-part framework above. Keep the original context intact.",
    "conversation_starters": ["Starter 1", "Starter 2", "Starter 3", "Starter 4"]
  },
  "knowledge_recommendations": "Detailed recommendations on what knowledge files (PDFs, CSVs, etc.) to add to make the GEM/GPT more effective. (Bilingual: Thai/English)"
}

Ensure the output is highly optimized for each specific platform (Gemini vs ChatGPT) while strictly preserving the original skills and context.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              gem: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  instructions: { type: Type.STRING }
                },
                required: ['name', 'description', 'instructions']
              },
              gpt: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  instructions: { type: Type.STRING },
                  conversation_starters: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                },
                required: ['name', 'description', 'instructions', 'conversation_starters']
              },
              knowledge_recommendations: { type: Type.STRING }
            },
            required: ['gem', 'gpt', 'knowledge_recommendations']
          }
        }
      });

      if (response.text) {
        const parsedResult = JSON.parse(response.text);
        setFileResult(parsedResult);
      } else {
        throw new Error('No response from AI');
      }
    } catch (err) {
      console.error('Generation error:', err);
      setError('เกิดข้อผิดพลาดในการสร้าง กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerate = async () => {
    if (!inputPrompt.trim()) return;
    
    setIsGenerating(true);
    setError('');
    setResult(null);

    try {
      // Initialize Gemini API
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `You are an expert Prompt Engineer and Business Logic Consultant. 
The user wants to create a custom AI system (GEM/GPTs) for the following task: "${inputPrompt}"

Please generate a complete package for this custom AI system.
Return the result as a JSON object with the following structure:
{
  "name": "A professional and catchy name for this GEM/GPTs",
  "instruction": "The complete, powerful Custom Instruction (System Prompt) that includes expert business logic, frameworks, and step-by-step processing rules.",
  "howto": "A step-by-step guide on how the end-user should use this GEM/GPTs effectively."
}

Ensure the output is in Thai language.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: 'Name of the GEM/GPTs' },
              instruction: { type: Type.STRING, description: 'Custom Instruction / System Prompt' },
              howto: { type: Type.STRING, description: 'How to use guide' }
            },
            required: ['name', 'instruction', 'howto']
          }
        }
      });

      if (response.text) {
        const parsedResult = JSON.parse(response.text);
        setResult(parsedResult);
      } else {
        throw new Error('No response from AI');
      }
    } catch (err) {
      console.error('Generation error:', err);
      setError('เกิดข้อผิดพลาดในการสร้าง GEM กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadDoc = () => {
    if (!result) return;

    // Create HTML content that MS Word can interpret
    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${result.name}</title>
        <style>
          body { font-family: 'Sarabun', 'Cordia New', sans-serif; line-height: 1.6; color: #333; }
          h1 { color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 10px; }
          h2 { color: #ec4899; margin-top: 20px; }
          .section { margin-bottom: 20px; padding: 15px; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; }
          .footer { margin-top: 40px; font-size: 12px; color: #6b7280; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 10px; }
          pre { white-space: pre-wrap; font-family: inherit; }
        </style>
      </head>
      <body>
        <h1>💎 ${result.name}</h1>
        
        <div class="section">
          <h2>⚙️ Custom Instruction (System Prompt)</h2>
          <pre>${result.instruction}</pre>
        </div>
        
        <div class="section">
          <h2>📖 วิธีใช้งาน (How-to)</h2>
          <pre>${result.howto}</pre>
        </div>
        
        <div class="footer">
          Generated by GEM Maker (Modgoscale Logic)
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/msword'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${result.name.replace(/[^a-z0-9ก-๙]/gi, '_')}_GEM.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto animate-[animationIn_0.4s_ease-out_both]">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-medium text-sm mb-6">
          <Sparkles size={16} />
          <span>Feature: GEM Maker</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          เปลี่ยนไอเดียในหัว ให้กลายเป็นระบบ AI<br className="hidden sm:block" /> พร้อมใช้ใน 30 วินาที
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          ไม่ต้องปวดหัวกับการเขียน Prompt ยาวๆ อีกต่อไป เพราะ GEM Maker จะทำหน้าที่เป็น Prompt Engineer ส่วนตัวที่ช่วยเนรมิตระบบ AI ให้คุณจากความว่างเปล่า ด้วย Business Logic ระดับผู้เชี่ยวชาญที่คุณวางใจได้ค่ะ
        </p>
      </div>

      {/* 3 Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center text-xl font-bold mb-4">1</div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Input: บอกโจทย์ที่คุณต้องการ ✍️</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">แค่กรอกความต้องการสั้นๆ ว่าอยากให้ AI ช่วยงานเรื่องอะไร (เช่น 'อยากได้ GEM ช่วยวิเคราะห์จุดคุ้มทุนของโปรเจกต์ใหม่')</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center text-xl font-bold mb-4">2</div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Process: ผสมผสาน Logic อัจฉริยะ 🧠</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">ระบบจะนำโครงสร้างทางความคิด (Framework) ที่ผ่านการกลั่นกรองมาแล้ว ไปประกอบร่างกับโจทย์ของคุณทันที</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-xl flex items-center justify-center text-xl font-bold mb-4">3</div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Instant Output: รับ Full Package 📄</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">รับชุดคำสั่งที่สมบูรณ์ที่สุด พร้อมชื่อ, Custom Instruction, วิธีใช้ และสามารถ Export เป็นไฟล์ Docs ได้ทันที</p>
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-200 dark:border-gray-800 mb-8">
        
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
          <button
            onClick={() => setInputType('text')}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${inputType === 'text' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            Quick GEM (Text)
          </button>
          <button
            onClick={() => setInputType('file')}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${inputType === 'file' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            Upload Skills File (.md)
          </button>
        </div>

        {inputType === 'text' ? (
          <>
            <label className="block text-lg font-medium text-gray-900 dark:text-white mb-4">
              คุณอยากให้ AI ช่วยงานเรื่องอะไร? / What do you want AI to help with?
            </label>
            <textarea
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="เช่น อยากได้ GPTs ช่วยร่างสคริปต์ปิดการขายทางโทรศัพท์... / e.g., I want a GPT to help draft a telesales script..."
              className="w-full h-32 px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none mb-4"
            />
            {isGenerating ? (
              <LoadingAnimation />
            ) : (
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !inputPrompt.trim()}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-xl font-medium shadow-lg shadow-purple-500/25 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                <Sparkles size={20} />
                สร้าง GEM ของฉันเลย! / Create my GEM!
              </button>
            )}
          </>
        ) : (
          <>
            <label className="block text-lg font-medium text-gray-900 dark:text-white mb-4">
              อัปโหลดไฟล์ Skills (.md) / Upload Skills File
            </label>
            
            <div 
              className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer mb-4"
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept=".md" 
                className="hidden" 
              />
              {uploadedFile ? (
                <div className="flex flex-col items-center gap-2">
                  <FileIcon className="text-purple-500" size={48} />
                  <p className="text-gray-900 dark:text-white font-medium">{uploadedFile.name}</p>
                  <p className="text-sm text-gray-500">คลิกเพื่อเปลี่ยนไฟล์ / Click to change file</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="text-gray-400" size={48} />
                  <p className="text-gray-900 dark:text-white font-medium">ลากไฟล์มาวาง หรือคลิกเพื่อเลือกไฟล์ / Drag and drop or click to select file</p>
                  <p className="text-sm text-gray-500">รองรับเฉพาะไฟล์ Markdown (.md) / Supports Markdown (.md) only</p>
                </div>
              )}
            </div>

            {isGenerating ? (
              <LoadingAnimation />
            ) : (
              <button
                onClick={handleFileGenerate}
                disabled={isGenerating || !fileContent}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-xl font-medium shadow-lg shadow-purple-500/25 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                <Sparkles size={20} />
                แปลงเป็น GEM & GPTs / Convert to GEM & GPTs
              </button>
            )}
          </>
        )}
        {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
      </div>

      {/* Output Section */}
      {result && (
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-purple-200 dark:border-purple-900/50 animate-[animationIn_0.5s_ease-out_both]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <span className="text-3xl">💎</span> {result.name}
            </h3>
            <button
              onClick={handleDownloadDoc}
              className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 flex items-center gap-2 whitespace-nowrap"
            >
              <Download size={18} />
              Download as Doc
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Settings className="text-purple-500" size={20} />
                ⚙️ Custom Instruction
              </h4>
              <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 dark:text-gray-200 leading-relaxed bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                {result.instruction}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <BookOpen className="text-pink-500" size={20} />
                📖 วิธีใช้งาน (How-to)
              </h4>
              <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 dark:text-gray-200 leading-relaxed bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                {result.howto}
              </pre>
            </div>
          </div>
        </div>
      )}
      {/* Output Section for File Upload */}
      {fileResult && inputType === 'file' && (
        <div className="space-y-6 animate-[animationIn_0.5s_ease-out_both]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* GEM Panel */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-blue-200 dark:border-blue-900/50 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span>Google Gemini GEM</span>
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-full border border-blue-100 dark:border-blue-800/50">Optimized for Gemini</span>
                  </h3>
                </div>
              </div>

              <div className="space-y-4 flex-grow">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                      Name <span className="text-xs text-gray-400 font-normal">(ชื่อ)</span>
                    </label>
                    <button onClick={() => handleCopy(fileResult.gem.name, 'gem-name')} className="text-gray-400 hover:text-blue-500 transition-colors">
                      {copiedField === 'gem-name' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium">
                    {fileResult.gem.name}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2 mt-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                      Description <span className="text-xs text-gray-400 font-normal">(คำอธิบาย)</span>
                    </label>
                    <button onClick={() => handleCopy(fileResult.gem.description, 'gem-desc')} className="text-gray-400 hover:text-blue-500 transition-colors">
                      {copiedField === 'gem-desc' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm">
                    {fileResult.gem.description}
                  </div>
                </div>

                <div className="flex-grow flex flex-col">
                  <div className="flex justify-between items-center mb-2 mt-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                      Instructions <span className="text-xs text-gray-400 font-normal">(คำสั่ง)</span>
                    </label>
                    <button onClick={() => handleCopy(fileResult.gem.instructions, 'gem-inst')} className="text-gray-400 hover:text-blue-500 transition-colors">
                      {copiedField === 'gem-inst' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                  </div>
                  <pre className="flex-grow p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 text-sm font-mono whitespace-pre-wrap overflow-y-auto max-h-96 custom-scrollbar">
                    {fileResult.gem.instructions}
                  </pre>
                </div>
              </div>
            </div>

            {/* GPT Panel */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-green-200 dark:border-green-900/50 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span>ChatGPT Custom GPT</span>
                    <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2.5 py-1 rounded-full border border-green-100 dark:border-green-800/50">Optimized for ChatGPT</span>
                  </h3>
                </div>
              </div>

              <div className="space-y-4 flex-grow">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                      Name <span className="text-xs text-gray-400 font-normal">(ชื่อ)</span>
                    </label>
                    <button onClick={() => handleCopy(fileResult.gpt.name, 'gpt-name')} className="text-gray-400 hover:text-green-500 transition-colors">
                      {copiedField === 'gpt-name' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium">
                    {fileResult.gpt.name}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2 mt-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                      Description <span className="text-xs text-gray-400 font-normal">(คำอธิบาย)</span>
                    </label>
                    <button onClick={() => handleCopy(fileResult.gpt.description, 'gpt-desc')} className="text-gray-400 hover:text-green-500 transition-colors">
                      {copiedField === 'gpt-desc' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm">
                    {fileResult.gpt.description}
                  </div>
                </div>

                <div className="flex-grow flex flex-col">
                  <div className="flex justify-between items-center mb-2 mt-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                      Instructions <span className="text-xs text-gray-400 font-normal">(คำสั่ง)</span>
                    </label>
                    <button onClick={() => handleCopy(fileResult.gpt.instructions, 'gpt-inst')} className="text-gray-400 hover:text-green-500 transition-colors">
                      {copiedField === 'gpt-inst' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                  </div>
                  <pre className="flex-grow p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 text-sm font-mono whitespace-pre-wrap overflow-y-auto max-h-96 custom-scrollbar">
                    {fileResult.gpt.instructions}
                  </pre>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2 mt-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                      Conversation Starters <span className="text-xs text-gray-400 font-normal">(ประโยคเริ่มต้น)</span>
                    </label>
                    <button onClick={() => handleCopy(fileResult.gpt.conversation_starters.join('\n'), 'gpt-starters')} className="text-gray-400 hover:text-green-500 transition-colors">
                      {copiedField === 'gpt-starters' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm">
                    <ul className="list-disc pl-5 space-y-1">
                      {fileResult.gpt.conversation_starters.map((starter, i) => (
                        <li key={i}>{starter}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          {/* Knowledge Recommendations */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-yellow-200 dark:border-yellow-900/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                <Info size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span>Knowledge Recommendations</span>
                <span className="hidden sm:inline text-gray-300 dark:text-gray-600">|</span>
                <span className="text-lg font-medium text-gray-500 dark:text-gray-400">คำแนะนำไฟล์อ้างอิง</span>
              </h3>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/10 p-5 rounded-2xl border border-yellow-100 dark:border-yellow-900/30">
              <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
                {fileResult.knowledge_recommendations}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
