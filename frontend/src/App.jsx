import React, { useState } from "react";
import HomeScreen from "./components/HomeScreen";
import ChatScreen from "./components/ChatScreen";
import BottomNav from "./components/BottomNav";

export default function App() {
  const [activeView, setActiveView] = useState("home");
  const [chatOpen, setChatOpen] = useState(false);
  const [initialChatMessage, setInitialChatMessage] = useState("");

  const handleOpenChat = (message) => {
    setInitialChatMessage(message);
    setChatOpen(true);
  };

  const handleCloseChat = () => {
    setChatOpen(false);
    setInitialChatMessage("");
  };

  return (
    <div className="min-h-screen bg-[#0a0f0c]">
      <div className="max-w-6xl mx-auto relative min-h-screen">
        {chatOpen ? (
          <ChatScreen
            initialMessage={initialChatMessage}
            onBack={handleCloseChat}
          />
        ) : (
          <>
            {activeView === "home" && (
              <HomeScreen onOpenChat={handleOpenChat} />
            )}
            {activeView === "activity" && (
              <div className="px-5 md:px-8 lg:px-12 pt-6 md:pt-24 pb-24">
                <h1 className="text-white text-2xl md:text-3xl font-bold mb-4">
                  Activity
                </h1>
                <p className="text-[#6b8b6b] text-sm md:text-base">
                  Activity tracking coming soon...
                </p>
              </div>
            )}
            {activeView === "settings" && (
              <div className="px-5 md:px-8 lg:px-12 pt-6 md:pt-24 pb-24">
                <h1 className="text-white text-2xl md:text-3xl font-bold mb-4">
                  Settings
                </h1>
                <p className="text-[#6b8b6b] text-sm md:text-base">
                  Settings coming soon...
                </p>
              </div>
            )}
            <BottomNav activeView={activeView} onNavigate={setActiveView} />
          </>
        )}
      </div>
    </div>
  );
}
