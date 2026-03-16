import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import HomeScreen from "./components/HomeScreen";
import ChatScreen from "./components/ChatScreen";
import BottomNav from "./components/BottomNav";
import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import ActivityScreen from "./components/ActivityScreen";
import ProfileScreen from "./components/ProfileScreen";

function AuthenticatedApp() {
  const [activeView, setActiveView] = useState("home");
  const [chatOpen, setChatOpen] = useState(false);
  const [initialChatMessage, setInitialChatMessage] = useState("");
  const { logout } = useAuth();
  const { toggleLanguage, lang } = useLanguage();

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
            <div className="flex items-center justify-end px-5 md:px-8 pt-4">
              <button
                onClick={toggleLanguage}
                className="text-xs px-3 py-2 rounded-full border border-[#2a3a2a] text-[#8fbc8f] hover:border-[#5a8a5a] hover:text-[#a0ccb0] transition-colors"
              >
                {lang === "en" ? "हिंदी" : "English"}
              </button>
            </div>
            {activeView === "home" && (
              <HomeScreen onOpenChat={handleOpenChat} />
            )}
            {activeView === "activity" && <ActivityScreen />}
            {activeView === "settings" && (
              <>
                <ProfileScreen />
                <div className="px-5 md:px-8 lg:px-12 pb-24">
                  <button
                    onClick={logout}
                    className="mt-4 bg-red-900/20 border border-red-800 text-red-400 px-6 py-2 rounded-lg hover:bg-red-900/30 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            )}
            <BottomNav activeView={activeView} onNavigate={setActiveView} />
          </>
        )}
      </div>
    </div>
  );
}

function UnauthenticatedApp() {
  const [showLogin, setShowLogin] = useState(true);

  return showLogin ? (
    <LoginScreen onSwitchToSignup={() => setShowLogin(false)} />
  ) : (
    <SignupScreen onSwitchToLogin={() => setShowLogin(true)} />
  );
}

function AppContent() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
