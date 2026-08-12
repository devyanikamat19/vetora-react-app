import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Sidebar from '../components/Sidebar';

const INITIAL_MESSAGES = [
  {
    id: 'm1',
    sender: 'ai',
    timestamp: '10:42 AM',
    text: `Hello Dr. Jane Doe 👋 I am **Vetora AI**, your clinical copilot trained on peer-reviewed veterinary literature, ACVIM guidelines, and diagnostic algorithms.

How can I assist with your patient diagnosis, differential list, or drug calculation today?`,
  },
  {
    id: 'm2',
    sender: 'user',
    timestamp: '10:43 AM',
    text: 'Can you review the bloodwork for Case #402-B? (BUN 52 mg/dL, CREA 2.8 mg/dL, PHOS 7.1 mg/dL, K+ 3.1 mmol/L)',
  },
  {
    id: 'm3',
    sender: 'ai',
    timestamp: '10:43 AM',
    text: `### 🩺 Diagnostic Assessment: Case #402-B

Based on the lab values provided, the patient exhibits **azotemia with hyperphosphatemia and hypokalemia**:

1. **Renal / Prerenal Azotemia**:
   - **BUN (52 mg/dL)** and **Creatinine (2.8 mg/dL)** are markedly elevated.
   - **PHOS (7.1 mg/dL)** confirms secondary retention due to decreased GFR.

2. **Electrolyte Imbalance**:
   - **K+ (3.1 mmol/L)** indicates mild-to-moderate hypokalemia, likely secondary to persistent GI loss (3 days of vomiting).

---

### 📋 Recommended Next Steps:
- **Urine Specific Gravity (USG)**: Obtain prior to starting IV fluids to differentiate **Prerenal Dehydration (USG > 1.030)** vs. **Intrinsic Acute Kidney Injury / AKI (USG 1.008–1.012)**.
- **Fluid Therapy**: Rehydrate with balanced crystalloids (LRS or Plasmalyte-A) at $2-3\times$ maintenance, with **KCl supplementation (20 mEq/L)** to correct hypokalemia.
- **Imaging**: Abdominal ultrasound to assess renal architecture and rule out ureteral obstruction.`,
  },
];

const SUGGESTED_PROMPTS = [
  'Differentiate canine ACVIM Stage B1 vs B2 mitral valve disease',
  'Calculate Constant Rate Infusion (CRI) for Lidocaine in a 25kg dog',
  'What are the key radiographic markers of feline asthma?',
  'List drug interactions for Ketoconazole and Cyclosporine',
];

const renderFormattedMessage = (text) => {
  if (!text) return null;
  const lines = text.split('\n');

  return lines.map((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) return <div key={idx} className="h-1"></div>;

    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={idx} className="font-display text-sm font-bold text-[#0d5c63] mt-2 mb-1 border-b border-gray-100 pb-1">
          {trimmed.replace('### ', '')}
        </h3>
      );
    }

    if (trimmed === '---') {
      return <hr key={idx} className="my-2 border-gray-200" />;
    }

    if (trimmed.startsWith('- ') || /^\d+\.\s/.test(trimmed)) {
      const isNumbered = /^\d+\.\s/.test(trimmed);
      const bulletText = trimmed.replace(/^-\s|\d+\.\s/, '');
      return (
        <div key={idx} className="flex items-start gap-2 ml-2 my-1">
          <span className="text-[#0d5c63] font-bold text-xs shrink-0">{isNumbered ? trimmed.match(/^\d+\./)[0] : '•'}</span>
          <p className="leading-relaxed text-xs">
            {formatBoldText(bulletText)}
          </p>
        </div>
      );
    }

    return (
      <p key={idx} className="leading-relaxed text-xs">
        {formatBoldText(trimmed)}
      </p>
    );
  });
};

const formatBoldText = (str) => {
  const parts = str.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const VetoraAI = () => {
  const { user, showToast } = useApp();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: query,
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Simulate AI response after 1.2s
    setTimeout(() => {
      const aiReply = {
        id: `msg_${Date.now() + 1}`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `### 💡 Clinical Guidelines for: "${query}"\n\n- **Primary Diagnostic Paradigm**: Evaluate physical exam parameters and vitals.\n- **Recommended Testing**: Complete CBC/CMP panel, urinalysis, and baseline imaging.\n- **Treatment Protocol**: Refer to ACVIM/AAHA consensus recommendations for dosage and fluid rate calculations.\n\n--- \n*Note: Vetora AI predictions should be validated against patient clinical presentation.*`,
      };
      setMessages(prev => [...prev, aiReply]);
      setIsTyping(false);
      showToast('Vetora AI response generated.', 'success');
    }, 1200);
  };

  return (
    <div className="bg-[#f4f7f6] text-gray-900 font-sans antialiased min-h-screen flex">
      <Sidebar />

      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-white">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200/80 px-6 py-3.5 flex items-center justify-between shrink-0 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0d5c63] text-white flex items-center justify-center font-bold shadow-2xs">
              <span className="material-symbols-outlined text-[20px]">smart_toy</span>
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-gray-900 flex items-center gap-2">
                Vetora AI Clinical Copilot
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-100 text-cyan-800">
                  Medical LLM v4.2
                </span>
              </h1>
              <p className="font-sans text-xs text-gray-500 font-medium">
                Trained on ACVIM, AAHA, and RACE accredited clinical guidelines.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setMessages(INITIAL_MESSAGES.slice(0, 1));
              showToast('Chat history cleared.', 'info');
            }}
            className="px-3.5 py-1.5 rounded-xl border border-gray-200 text-gray-600 font-sans text-xs font-semibold hover:bg-gray-50 transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">refresh</span> New Chat
          </button>
        </header>

        {/* Chat Messages Canvas */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {/* Quick Prompts Container */}
          <div className="max-w-3xl mx-auto mb-6">
            <span className="font-sans text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2.5">
              SUGGESTED CLINICAL PROMPTS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SUGGESTED_PROMPTS.map(prompt => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="p-3 bg-gray-50 hover:bg-[#0d5c63]/5 hover:border-[#0d5c63]/30 border border-gray-200/80 rounded-xl text-left font-sans text-xs font-semibold text-gray-700 hover:text-[#0d5c63] transition-all duration-200 flex items-center justify-between group shadow-2xs"
                >
                  <span className="line-clamp-1">{prompt}</span>
                  <span className="material-symbols-outlined text-[16px] text-gray-400 group-hover:text-[#0d5c63] group-hover:translate-x-0.5 transition-all">
                    arrow_forward
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Messages Stream */}
          <div className="w-full max-w-3xl mx-auto space-y-6 pb-24">
            {messages.map(msg => (
              <div
                key={msg.id}
                className="w-full flex items-start gap-3.5"
              >
                {/* AI Avatar */}
                {msg.sender === 'ai' && (
                  <div className="w-9 h-9 rounded-xl bg-[#0d5c63] text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                  </div>
                )}

                {/* Bubble Content Box */}
                <div
                  className={`w-full max-w-2xl p-5 rounded-2xl font-sans text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#0d5c63] text-white rounded-tr-none shadow-xs ml-auto'
                      : 'bg-white border border-gray-200/80 text-gray-800 rounded-tl-none shadow-2xs space-y-2'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1.5 text-[10px] opacity-75 gap-4">
                    <span className="font-bold">{msg.sender === 'ai' ? 'Vetora AI' : user?.name || 'You'}</span>
                    <span className="shrink-0">{msg.timestamp}</span>
                  </div>
                  <div className="text-xs leading-relaxed space-y-1">
                    {renderFormattedMessage(msg.text)}
                  </div>
                </div>

                {/* User Avatar */}
                {msg.sender === 'user' && (
                  <div className="w-9 h-9 rounded-xl bg-gray-200 text-gray-700 flex items-center justify-center shrink-0 shadow-2xs">
                    <span className="material-symbols-outlined text-[20px]">person</span>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-3 max-w-3xl mx-auto">
                <div className="w-9 h-9 rounded-xl bg-[#0d5c63] text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                </div>
                <div className="bg-white border border-gray-200/80 px-4 py-3 rounded-2xl text-xs font-sans text-gray-500 flex items-center gap-2 shadow-2xs">
                  <span className="w-2 h-2 bg-[#0d5c63] rounded-full animate-ping"></span>
                  Vetora AI is analyzing clinical literature...
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Sticky Input Bar */}
        <div className="p-4 bg-white border-t border-gray-200 shrink-0">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="max-w-3xl mx-auto flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl p-2 focus-within:border-[#0d5c63] transition-all"
          >
            <button
              type="button"
              onClick={() => showToast('File attachment opened.', 'info')}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-200/60"
            >
              <span className="material-symbols-outlined text-[20px]">attach_file</span>
            </button>

            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Ask Vetora AI about diagnosis, treatment protocols, or drug dosages..."
              className="flex-1 bg-transparent border-none font-sans text-xs text-gray-900 focus:outline-none px-2"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-5 py-2.5 bg-[#0d5c63] hover:bg-[#09474d] disabled:opacity-40 text-white rounded-xl font-sans text-xs font-bold transition-all flex items-center gap-1 shadow-xs"
            >
              Send <span className="material-symbols-outlined text-[16px]">send</span>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default VetoraAI;
