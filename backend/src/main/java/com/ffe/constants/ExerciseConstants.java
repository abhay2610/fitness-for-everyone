package com.ffe.constants;

import com.ffe.model.WorkoutType;
import java.util.*;

public class ExerciseConstants {
    
    public static class Exercise {
        public final String name;
        public final String emoji;
        
        public Exercise(String name, String emoji) {
            this.name = name;
            this.emoji = emoji;
        }
    }
    
    private static final Map<WorkoutType, List<Exercise>> EXERCISES_BY_TYPE = new HashMap<>();
    
    static {
        // CHEST DAY
        EXERCISES_BY_TYPE.put(WorkoutType.CHEST, Arrays.asList(
            new Exercise("Flat Barbell Bench Press", "🏋️"),
            new Exercise("Incline Barbell Bench Press", "🏋️"),
            new Exercise("Decline Barbell Bench Press", "🏋️"),
            new Exercise("Flat Dumbbell Press", "💪"),
            new Exercise("Incline Dumbbell Press", "💪"),
            new Exercise("Decline Dumbbell Press", "💪"),
            new Exercise("Dumbbell Fly", "💪"),
            new Exercise("Incline Dumbbell Fly", "💪"),
            new Exercise("Cable Fly", "🔗"),
            new Exercise("Pec Deck Fly", "🤖"),
            new Exercise("Chest Press Machine", "🤖"),
            new Exercise("Push Ups", "🏃"),
            new Exercise("Weighted Push Ups", "🏃")
        ));
        
        // BACK DAY
        EXERCISES_BY_TYPE.put(WorkoutType.BACK, Arrays.asList(
            new Exercise("Deadlift", "🏋️"),
            new Exercise("Barbell Row", "🏋️"),
            new Exercise("Pendlay Row", "🏋️"),
            new Exercise("Seated Cable Row", "🔗"),
            new Exercise("Single Arm Dumbbell Row", "💪"),
            new Exercise("Lat Pulldown", "🔗"),
            new Exercise("Wide Grip Lat Pulldown", "🔗"),
            new Exercise("Close Grip Lat Pulldown", "🔗"),
            new Exercise("Pull Ups", "🏃"),
            new Exercise("Chin Ups", "🏃"),
            new Exercise("Assisted Pull Ups", "🤖"),
            new Exercise("T Bar Row", "🏋️"),
            new Exercise("Straight Arm Pulldown", "🔗"),
            new Exercise("Face Pull", "🔗")
        ));
        
        // SHOULDER DAY
        EXERCISES_BY_TYPE.put(WorkoutType.SHOULDER, Arrays.asList(
            new Exercise("Barbell Overhead Press", "🏋️"),
            new Exercise("Dumbbell Shoulder Press", "💪"),
            new Exercise("Arnold Press", "💪"),
            new Exercise("Dumbbell Lateral Raise", "💪"),
            new Exercise("Cable Lateral Raise", "🔗"),
            new Exercise("Front Raise", "💪"),
            new Exercise("Plate Front Raise", "🏋️"),
            new Exercise("Rear Delt Fly", "💪"),
            new Exercise("Reverse Pec Deck", "🤖"),
            new Exercise("Face Pull", "🔗"),
            new Exercise("Upright Row", "🏋️"),
            new Exercise("Dumbbell Shrugs", "💪"),
            new Exercise("Barbell Shrugs", "🏋️")
        ));
        
        // BICEP DAY
        EXERCISES_BY_TYPE.put(WorkoutType.BICEP, Arrays.asList(
            new Exercise("Barbell Curl", "🏋️"),
            new Exercise("EZ Bar Curl", "🏋️"),
            new Exercise("Dumbbell Curl", "💪"),
            new Exercise("Alternating Dumbbell Curl", "💪"),
            new Exercise("Hammer Curl", "💪"),
            new Exercise("Incline Dumbbell Curl", "💪"),
            new Exercise("Concentration Curl", "💪"),
            new Exercise("Spider Curl", "💪"),
            new Exercise("Cable Curl", "🔗"),
            new Exercise("Preacher Curl", "🤖"),
            new Exercise("Machine Curl", "🤖")
        ));
        
        // TRICEP DAY
        EXERCISES_BY_TYPE.put(WorkoutType.TRICEP, Arrays.asList(
            new Exercise("Close Grip Bench Press", "🏋️"),
            new Exercise("Tricep Pushdown", "🔗"),
            new Exercise("Rope Pushdown", "🔗"),
            new Exercise("Overhead Dumbbell Extension", "💪"),
            new Exercise("Overhead Cable Extension", "🔗"),
            new Exercise("Skull Crushers", "🏋️"),
            new Exercise("EZ Bar Skull Crushers", "🏋️"),
            new Exercise("Bench Dips", "🏃"),
            new Exercise("Weighted Dips", "🏃"),
            new Exercise("Single Arm Cable Extension", "🔗")
        ));
        
        // LEG DAY
        EXERCISES_BY_TYPE.put(WorkoutType.LEG, Arrays.asList(
            new Exercise("Barbell Squat", "🏋️"),
            new Exercise("Front Squat", "🏋️"),
            new Exercise("Hack Squat Machine", "🤖"),
            new Exercise("Leg Press", "🤖"),
            new Exercise("Leg Extension", "🤖"),
            new Exercise("Romanian Deadlift", "🏋️"),
            new Exercise("Stiff Leg Deadlift", "🏋️"),
            new Exercise("Lying Leg Curl", "🤖"),
            new Exercise("Seated Leg Curl", "🤖"),
            new Exercise("Walking Lunges", "🏃"),
            new Exercise("Dumbbell Lunges", "💪"),
            new Exercise("Bulgarian Split Squat", "💪"),
            new Exercise("Standing Calf Raise", "🤖"),
            new Exercise("Seated Calf Raise", "🤖")
        ));
        
        // CORE / ABS
        EXERCISES_BY_TYPE.put(WorkoutType.CORE_ABS, Arrays.asList(
            new Exercise("Crunches", "🏃"),
            new Exercise("Cable Crunch", "🔗"),
            new Exercise("Hanging Leg Raise", "🏃"),
            new Exercise("Lying Leg Raise", "🏃"),
            new Exercise("Ab Wheel Rollout", "🏃"),
            new Exercise("Russian Twist", "🏃"),
            new Exercise("Weighted Russian Twist", "💪"),
            new Exercise("Plank", "🏃"),
            new Exercise("Side Plank", "🏃"),
            new Exercise("Mountain Climbers", "🏃")
        ));
        
        // CARDIO
        EXERCISES_BY_TYPE.put(WorkoutType.CARDIO, Arrays.asList(
            new Exercise("Treadmill Running", "🏃"),
            new Exercise("Treadmill Walking", "🚶"),
            new Exercise("Stationary Bike", "🚴"),
            new Exercise("Outdoor Cycling", "🚴"),
            new Exercise("Rowing Machine", "🚣"),
            new Exercise("Stair Climber", "🪜"),
            new Exercise("Elliptical Trainer", "🤖"),
            new Exercise("Jump Rope", "🏃"),
            new Exercise("Outdoor Running", "🏃")
        ));
    }
    
    public static List<Exercise> getExercisesForWorkoutType(WorkoutType type) {
        return EXERCISES_BY_TYPE.getOrDefault(type, new ArrayList<>());
    }
    
    public static List<String> getExerciseNamesForWorkoutType(WorkoutType type) {
        List<Exercise> exercises = getExercisesForWorkoutType(type);
        List<String> names = new ArrayList<>();
        for (Exercise exercise : exercises) {
            names.add(exercise.name);
        }
        return names;
    }
}
