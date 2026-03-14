package com.ffe.controller;

import com.ffe.constants.ExerciseConstants;
import com.ffe.dto.WorkoutExerciseDTO;
import com.ffe.dto.WorkoutSessionDTO;
import com.ffe.model.User;
import com.ffe.model.WorkoutExercise;
import com.ffe.model.WorkoutSession;
import com.ffe.model.WorkoutType;
import com.ffe.repository.UserRepository;
import com.ffe.service.WorkoutSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/workout-sessions")
@CrossOrigin(origins = "*")
public class WorkoutSessionController {
    
    @Autowired
    private WorkoutSessionService workoutSessionService;
    
    @Autowired
    private UserRepository userRepository;
    
    @GetMapping
    public ResponseEntity<List<WorkoutSession>> getAllWorkouts(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<WorkoutSession> workouts = workoutSessionService.getWorkoutsByUser(user);
        return ResponseEntity.ok(workouts);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<WorkoutSession> getWorkoutById(@PathVariable("id") Long id, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        WorkoutSession workout = workoutSessionService.getWorkoutById(id)
            .orElseThrow(() -> new RuntimeException("Workout not found"));
        
        if (!workout.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).build();
        }
        
        return ResponseEntity.ok(workout);
    }
    
    @PostMapping
    public ResponseEntity<WorkoutSession> createWorkout(
            @RequestBody WorkoutSessionDTO workoutDTO,
            Authentication authentication) {
        
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        WorkoutSession workout = new WorkoutSession();
        workout.setUser(user);
        workout.setWorkoutType(workoutDTO.getWorkoutType());
        workout.setDate(workoutDTO.getDate());
        workout.setDurationMinutes(workoutDTO.getDurationMinutes());
        workout.setNotes(workoutDTO.getNotes());
        
        List<WorkoutExercise> exercises = new ArrayList<>();
        int orderIndex = 0;
        for (WorkoutExerciseDTO exerciseDTO : workoutDTO.getExercises()) {
            WorkoutExercise exercise = new WorkoutExercise();
            exercise.setWorkoutSession(workout);
            exercise.setExerciseName(exerciseDTO.getExerciseName());
            exercise.setSets(exerciseDTO.getSets());
            exercise.setMaxWeightKg(exerciseDTO.getMaxWeightKg());
            exercise.setAverageReps(exerciseDTO.getAverageReps());
            exercise.setOrderIndex(orderIndex++);
            exercises.add(exercise);
        }
        workout.setExercises(exercises);
        
        WorkoutSession savedWorkout = workoutSessionService.createWorkout(workout);
        return ResponseEntity.ok(savedWorkout);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkout(@PathVariable("id") Long id, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        WorkoutSession workout = workoutSessionService.getWorkoutById(id)
            .orElseThrow(() -> new RuntimeException("Workout not found"));
        
        if (!workout.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).build();
        }
        
        workoutSessionService.deleteWorkout(id);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/exercises/{workoutType}")
    @CrossOrigin(origins = "*")
    public ResponseEntity<Map<String, Object>> getExercisesForWorkoutType(@PathVariable("workoutType") WorkoutType workoutType) {
        List<ExerciseConstants.Exercise> exercises = ExerciseConstants.getExercisesForWorkoutType(workoutType);
        
        List<Map<String, String>> exerciseList = new ArrayList<>();
        for (ExerciseConstants.Exercise exercise : exercises) {
            Map<String, String> exerciseMap = new HashMap<>();
            exerciseMap.put("name", exercise.name);
            exerciseMap.put("emoji", exercise.emoji);
            exerciseList.add(exerciseMap);
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("workoutType", workoutType);
        response.put("exercises", exerciseList);
        
        return ResponseEntity.ok(response);
    }
}
