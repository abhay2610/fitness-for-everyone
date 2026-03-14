package com.ffe.model;

public enum WorkoutType {
    CHEST("Chest Day", "💪"),
    BACK("Back Day", "🔙"),
    SHOULDER("Shoulder Day", "🦾"),
    BICEP("Bicep Day", "💪"),
    TRICEP("Tricep Day", "💪"),
    LEG("Leg Day", "🦵"),
    CORE_ABS("Core / Abs", "🔥"),
    CARDIO("Cardio", "🏃");
    
    private final String displayName;
    private final String emoji;
    
    WorkoutType(String displayName, String emoji) {
        this.displayName = displayName;
        this.emoji = emoji;
    }
    
    public String getDisplayName() {
        return displayName;
    }
    
    public String getEmoji() {
        return emoji;
    }
}
