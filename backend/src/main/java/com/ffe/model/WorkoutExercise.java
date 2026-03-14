package com.ffe.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "workout_exercises")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutExercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workout_session_id", nullable = false)
    @JsonIgnore
    private WorkoutSession workoutSession;
    
    @Column(nullable = false)
    private String exerciseName;
    
    @Column(nullable = false)
    private Integer sets;
    
    @Column(nullable = false)
    private Double maxWeightKg;
    
    @Column(nullable = false)
    private Integer averageReps;
    
    @Column(nullable = false)
    private Integer orderIndex;
}
