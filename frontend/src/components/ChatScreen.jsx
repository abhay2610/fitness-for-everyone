import React, { useState, useRef, useEffect } from "react";

const INITIAL_MESSAGES = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hello! I'm Aura, your personal fitness trainer. I'm here to help you with workout plans, nutrition advice, form guidance, and anything fitness-related. What would you like to know?",
  },
];

export default function ChatScreen({ initialMessage, onBack }) {
  const [messages, setMessages] = useState(() => {
    if (initialMessage) {
      return [
        ...INITIAL_MESSAGES,
        { id: 2, role: "user", content: initialMessage },
        {
          id: 3,
          role: "assistant",
          content:
            "That's a great question! I'm not connected to a brain yet — the AI backend is coming soon. For now, you can see how the chat will look and feel!",
        },
      ];
    }
    return INITIAL_MESSAGES;
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulated response — will be replaced with real API call
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            "I'm a placeholder response! Once the FastAPI agent is connected, I'll give you real fitness advice tailored to your goals and progress.",
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 md:px-8 py-4 md:py-5 border-b border-[#1a2620]">
        <button
          onClick={onBack}
          className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#131a16] flex items-center justify-center text-[#8fbc8f] hover:bg-[#1a2620] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#3a5a3a] flex items-center justify-center">
          <span className="text-[#8fbc8f] font-bold text-sm md:text-base">
            A
          </span>
        </div>
        <div>
          <h2 className="text-white font-semibold text-base md:text-lg leading-tight">
            Aura
          </h2>
          <p className="text-[#5a7a5a] text-xs md:text-sm">
            Your Personal Trainer
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 md:px-8 py-4 md:py-6 space-y-4 md:space-y-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] md:max-w-[65%] rounded-2xl px-4 py-3 md:px-5 md:py-4 text-sm md:text-base leading-relaxed ${
                msg.role === "user"
                  ? "bg-[#3a5a3a] text-white rounded-br-sm"
                  : "bg-[#131a16] text-[#c8d8c8] rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#131a16] rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1.5">
                <div
                  className="w-2 h-2 rounded-full bg-[#5a8a5a] animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-[#5a8a5a] animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-[#5a8a5a] animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-5 md:px-8 py-4 md:py-5 border-t border-[#1a2620]">
        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 md:gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Aura anything..."
            className="flex-1 bg-[#131a16] border border-[#2a3a2a] rounded-full px-4 py-3 md:px-5 md:py-3.5 text-sm md:text-base text-white placeholder-[#4a5a4a] focus:outline-none focus:border-[#5a8a5a] transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#3a5a3a] flex items-center justify-center text-[#8fbc8f] hover:bg-[#4a6a4a] disabled:opacity-30 disabled:hover:bg-[#3a5a3a] transition-colors shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
