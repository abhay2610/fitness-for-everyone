package com.ffe.dto;

import com.ffe.model.WorkoutType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutSessionDTO {
    private WorkoutType workoutType;
    private LocalDate date;
    private Integer durationMinutes;
    private String notes;
    private List<WorkoutExerciseDTO> exercises;
}
