package com.ffe.controller;

import com.ffe.constants.ExerciseConstants;
import com.ffe.model.WorkoutType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/exercises")
@CrossOrigin(origins = "*")
public class ExerciseController {
    
    @GetMapping("/test")
    @PreAuthorize("permitAll()")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Exercise controller is working!");
    }
    
    @GetMapping("/{workoutType}")
    @PreAuthorize("permitAll()")
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
