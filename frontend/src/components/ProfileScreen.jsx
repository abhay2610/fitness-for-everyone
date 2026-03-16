import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";

const numberOrEmpty = (val) => (val === null || val === undefined ? "" : val);

const computeBmi = (weightKg, heightCm) => {
  if (!weightKg || !heightCm || heightCm === 0) return null;
  const hMeters = heightCm / 100;
  return weightKg / (hMeters * hMeters);
};

const computeBmr = (sex, weightKg, heightCm, age) => {
  if (!weightKg || !heightCm || !age) return null;
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (sex === "female") return base - 161;
  if (sex === "male") return base + 5;
  // neutral fallback
  return base - 78;
};

const bmiCategory = (bmi) => {
  if (bmi === null) return "Unknown";
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Healthy";
  if (bmi < 30) return "Overweight";
  return "Obese";
};

export default function ProfileScreen() {
  const { user, fetchProfile, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: "",
    age: "",
    heightCm: "",
    weightKg: "",
    sex: "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile().catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setForm({
      name: user?.name || "",
      age: numberOrEmpty(user?.age),
      heightCm: numberOrEmpty(user?.heightCm),
      weightKg: numberOrEmpty(user?.weightKg),
      sex: user?.sex || "",
    });
  }, [user]);

  const bmi = useMemo(
    () => computeBmi(Number(form.weightKg), Number(form.heightCm)),
    [form.heightCm, form.weightKg]
  );
  const bmr = useMemo(
    () => computeBmr(form.sex, Number(form.weightKg), Number(form.heightCm), Number(form.age)),
    [form.sex, form.heightCm, form.weightKg, form.age]
  );

  const handleChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    try {
      await updateProfile({
        name: form.name || undefined,
        age: form.age ? Number(form.age) : undefined,
        heightCm: form.heightCm ? Number(form.heightCm) : undefined,
        weightKg: form.weightKg ? Number(form.weightKg) : undefined,
        sex: form.sex || undefined,
      });
      setMessage("Profile updated");
    } catch (err) {
      setError("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="px-5 md:px-8 lg:px-12 pt-6 md:pt-12 pb-24 space-y-6">
      <div>
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">Profile</h1>
        <p className="text-[#6b8b6b] text-sm">Update your basics to get better recommendations.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        {message && <div className="text-green-400 text-sm">{message}</div>}
        {error && <div className="text-red-400 text-sm">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#8fbc8f] text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={handleChange("name")}
              className="w-full bg-[#131a16] border border-[#2a3a2a] rounded-lg px-4 py-3 text-white placeholder-[#4a5a4a] focus:outline-none focus:border-[#5a8a5a] transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-[#8fbc8f] text-sm font-medium mb-2">Age</label>
            <input
              type="number"
              value={form.age}
              onChange={handleChange("age")}
              className="w-full bg-[#131a16] border border-[#2a3a2a] rounded-lg px-4 py-3 text-white placeholder-[#4a5a4a] focus:outline-none focus:border-[#5a8a5a] transition-colors"
              placeholder="28"
              min="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[#8fbc8f] text-sm font-medium mb-2">Sex</label>
            <select
              value={form.sex}
              onChange={handleChange("sex")}
              className="w-full bg-[#131a16] border border-[#2a3a2a] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#5a8a5a] transition-colors"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-[#8fbc8f] text-sm font-medium mb-2">Height (cm)</label>
            <input
              type="number"
              value={form.heightCm}
              onChange={handleChange("heightCm")}
              className="w-full bg-[#131a16] border border-[#2a3a2a] rounded-lg px-4 py-3 text-white placeholder-[#4a5a4a] focus:outline-none focus:border-[#5a8a5a] transition-colors"
              placeholder="175"
              min="0"
            />
          </div>
          <div>
            <label className="block text-[#8fbc8f] text-sm font-medium mb-2">Weight (kg)</label>
            <input
              type="number"
              value={form.weightKg}
              onChange={handleChange("weightKg")}
              className="w-full bg-[#131a16] border border-[#2a3a2a] rounded-lg px-4 py-3 text-white placeholder-[#4a5a4a] focus:outline-none focus:border-[#5a8a5a] transition-colors"
              placeholder="70"
              min="0"
              step="0.1"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-[#3a5a3a] hover:bg-[#4a6a4a] disabled:bg-[#2a3a2a] text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#0f1511] border border-[#2a3a2a] rounded-lg p-4">
          <div className="text-[#6b8b6b] text-sm mb-1">BMI</div>
          <div className="text-white text-2xl font-bold">{bmi ? bmi.toFixed(1) : "--"}</div>
          <div className="text-[#8fbc8f] text-sm">{bmiCategory(bmi)}</div>
        </div>
        <div className="bg-[#0f1511] border border-[#2a3a2a] rounded-lg p-4">
          <div className="text-[#6b8b6b] text-sm mb-1">BMR (kcal/day)</div>
          <div className="text-white text-2xl font-bold">{bmr ? Math.round(bmr) : "--"}</div>
          <div className="text-[#8fbc8f] text-sm">Estimated resting energy</div>
        </div>
      </div>
    </div>
  );
}
