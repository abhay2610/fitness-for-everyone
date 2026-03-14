package com.ffe.service;

import com.ffe.model.User;
import com.ffe.model.Workout;
import com.ffe.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class WorkoutService {
    
    @Autowired
    private WorkoutRepository workoutRepository;
    
    public List<Workout> getAllWorkouts() {
        return workoutRepository.findAllByOrderByDateDesc();
    }
    
    public List<Workout> getWorkoutsByUser(User user) {
        return workoutRepository.findByUserOrderByDateDesc(user);
    }
    
    public Optional<Workout> getWorkoutById(Long id) {
        return workoutRepository.findById(id);
    }
    
    public Workout createWorkout(Workout workout) {
        return workoutRepository.save(workout);
    }
    
    public void deleteWorkout(Long id) {
        workoutRepository.deleteById(id);
    }
    
    public List<Workout> getWorkoutsByDateRange(LocalDate startDate, LocalDate endDate) {
        return workoutRepository.findByDateBetweenOrderByDateDesc(startDate, endDate);
    }
}
