import React, { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import verses from "./verse.json";

const FALLBACK_VERSE = {
  chapter: 1,
  verse: 1,
  slok: "धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय।।",
  en: "On the field of Dharma, at Kurukshetra, gathered and eager for battle, what did my sons and the sons of Pandu do, O Sanjay?",
  hi: "धर्मभूमि कुरुक्षेत्र में युद्ध की इच्छा से एकत्र हुए मेरे और पाण्डु के पुत्रों ने क्या किया, हे संजय?",
};

function normalizeVerse(v) {
  return {
    chapter: v.chapter_number,
    verse: v.verse_number,
    slok: v.text?.trim() || "",
    en: v.word_meanings || v.transliteration || "",
    hi: v.word_meanings || v.transliteration || "", // dataset lacks Hindi; fallback to English
  };
}

function pickRandomVerse(excludeKey) {
  const pool = verses || [];
  if (pool.length === 0) return null;
  const excludeIdx = excludeKey
    ? pool.findIndex(
        (v) => `${v.chapter_number}-${v.verse_number}` === excludeKey,
      )
    : -1;
  let idx = Math.floor(Math.random() * pool.length);
  if (idx === excludeIdx) {
    idx = (idx + 1) % pool.length;
  }
  return normalizeVerse(pool[idx]);
}

function extractTranslations(data) {
  // The API varies; try a few shapes.
  let en =
    data?.meaning?.en ||
    data?.translation ||
    data?.translations?.find?.(
      (t) => t?.language?.toLowerCase?.() === "english",
    )?.description ||
    null;
  let hi =
    data?.meaning?.hi ||
    data?.translations?.find?.((t) => t?.language?.toLowerCase?.() === "hindi")
      ?.description ||
    null;
  return { en, hi };
}

export default function GitaVerseCard() {
  const { lang } = useLanguage();
  const [verse, setVerse] = useState(FALLBACK_VERSE);
  const [loading, setLoading] = useState(false);
  const [lastKey, setLastKey] = useState("");

  const isHindi = lang === "hi";

  const loadVerse = async () => {
    // pick a local verse candidate (different from last if possible)
    let candidate = pickRandomVerse(lastKey);
    const candidateKey = `${candidate.chapter}-${candidate.verse}`;

    const { chapter, verse } = candidate;
    setLoading(true);
    // Using local pool only to avoid CORS from the public API
    setVerse({
      chapter,
      verse,
      slok: candidate.slok || FALLBACK_VERSE.slok,
      en: candidate.en || FALLBACK_VERSE.en,
      hi: candidate.hi || FALLBACK_VERSE.hi,
    });
    setLastKey(candidateKey);
    setLoading(false);
  };

  useEffect(() => {
    loadVerse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayTranslation = useMemo(() => {
    return isHindi ? verse.hi : verse.en;
  }, [isHindi, verse.en, verse.hi]);

  return (
    <div className="bg-[#131a16] rounded-2xl p-5 md:p-6 border border-[#1f2a23] space-y-3 shadow-lg shadow-black/10">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[#8fbc8f] text-xs uppercase tracking-wide">
            Bhagavad Gita
          </p>
          <h3 className="text-white font-semibold text-lg">
            Chapter {verse.chapter}, Verse {verse.verse}
          </h3>
        </div>
        <button
          onClick={loadVerse}
          disabled={loading}
          className="text-xs px-3 py-1 rounded-full border border-[#2a3a2a] text-[#8fbc8f] hover:border-[#5a8a5a] disabled:opacity-60"
        >
          {loading ? "Loading" : "New"}
        </button>
      </div>
      <div className="space-y-2">
        <p className="text-[#c8dccc] text-sm leading-relaxed whitespace-pre-line">
          {verse.slok}
        </p>
        <p className="text-[#6b8b6b] text-xs">Sanskrit</p>
      </div>
      <div className="space-y-2">
        <p className="text-white text-sm leading-relaxed">
          {displayTranslation}
        </p>
        <p className="text-[#6b8b6b] text-xs">
          {isHindi ? "हिंदी" : "English"}
        </p>
      </div>
    </div>
  );
}
