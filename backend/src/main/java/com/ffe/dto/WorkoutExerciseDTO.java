package com.ffe.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutExerciseDTO {
    private String exerciseName;
    private Integer sets;
    private Double maxWeightKg;
    private Integer averageReps;
}
