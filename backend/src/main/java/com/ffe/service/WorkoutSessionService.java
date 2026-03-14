package com.ffe.service;

import com.ffe.model.User;
import com.ffe.model.WorkoutSession;
import com.ffe.repository.WorkoutSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class WorkoutSessionService {
    
    @Autowired
    private WorkoutSessionRepository workoutSessionRepository;
    
    public List<WorkoutSession> getWorkoutsByUser(User user) {
        return workoutSessionRepository.findByUserOrderByDateDesc(user);
    }
    
    public List<WorkoutSession> getWorkoutsByUserAndDateRange(User user, LocalDate startDate, LocalDate endDate) {
        return workoutSessionRepository.findByUserAndDateBetweenOrderByDateDesc(user, startDate, endDate);
    }
    
    public long countWorkoutsByUserAndDateRange(User user, LocalDate startDate, LocalDate endDate) {
        return workoutSessionRepository.countByUserAndDateBetween(user, startDate, endDate);
    }
    
    public WorkoutSession createWorkout(WorkoutSession workout) {
        return workoutSessionRepository.save(workout);
    }
    
    public Optional<WorkoutSession> getWorkoutById(Long id) {
        return workoutSessionRepository.findById(id);
    }
    
    public WorkoutSession updateWorkout(WorkoutSession workout) {
        return workoutSessionRepository.save(workout);
    }
    
    public void deleteWorkout(Long id) {
        workoutSessionRepository.deleteById(id);
    }
}
