package com.ffe.repository;

import com.ffe.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    List<Workout> findByDateBetweenOrderByDateDesc(LocalDate startDate, LocalDate endDate);
    List<Workout> findAllByOrderByDateDesc();
}
