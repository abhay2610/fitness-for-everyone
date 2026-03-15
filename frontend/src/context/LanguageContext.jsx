import React, { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

const translations = {
  en: {
    activity: "Activity",
    logWorkout: "Log Workout",
    loadingWorkouts: "Loading workouts...",
    recentWorkouts: "Recent Workouts",
    noWorkoutsTitle: "No workouts logged yet",
    noWorkoutsHint: "Tap \"Log Workout\" to get started",
    show: "Show",
    hide: "Hide",
    exercisesLabel: "exercises",
    addExercise: "+ Add Exercise",
    durationLabel: "Duration (minutes)",
    saveWorkout: "Save Workout",
    saving: "Saving...",
    back: "Back",
    edit: "Edit",
    delete: "Delete",
    confirmDelete: "Delete this workout?",
    useDemo: "Use demo data",
    useMyData: "Use my data",
    showingDemo: "Showing demo workouts",
    showingYour: "Showing your workouts",
    selectDate: "Workout date",
    selectTypeTitle: "Select workout type",
  },
  hi: {
    activity: "गतिविधि",
    logWorkout: "कसरत दर्ज करें",
    loadingWorkouts: "वर्कआउट लोड हो रहा है...",
    recentWorkouts: "हाल के वर्कआउट",
    noWorkoutsTitle: "अभी तक कोई वर्कआउट नहीं",
    noWorkoutsHint: "शुरू करने के लिए \"कसरत दर्ज करें\" टैप करें",
    show: "दिखाएँ",
    hide: "छुपाएँ",
    exercisesLabel: "व्यायाम",
    addExercise: "+ व्यायाम जोड़ें",
    durationLabel: "अवधि (मिनट)",
    saveWorkout: "वर्कआउट सहेजें",
    saving: "सहेजा जा रहा है...",
    back: "वापस",
    edit: "संपादित करें",
    delete: "हटाएँ",
    confirmDelete: "क्या आप इस वर्कआउट को हटाना चाहते हैं?",
    useDemo: "डेमो डेटा दिखाएँ",
    useMyData: "मेरा डेटा दिखाएँ",
    showingDemo: "डेमो वर्कआउट दिखाए जा रहे हैं",
    showingYour: "आपके वर्कआउट दिखाए जा रहे हैं",
    selectDate: "वर्कआउट की तारीख",
    selectTypeTitle: "वर्कआउट प्रकार चुनें",
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored === "hi" || stored === "en") {
      setLang(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "hi" : "en"));
  };

  const t = (key) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
