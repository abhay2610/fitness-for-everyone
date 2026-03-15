package com.ffe.repository;

import com.ffe.model.User;
import com.ffe.model.WorkoutSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface WorkoutSessionRepository extends JpaRepository<WorkoutSession, Long> {
    List<WorkoutSession> findByUserOrderByDateDesc(User user);
    List<WorkoutSession> findByUserAndDateBetweenOrderByDateDesc(User user, LocalDate startDate, LocalDate endDate);
    long countByUserAndDateBetween(User user, LocalDate startDate, LocalDate endDate);
    void deleteByUser(User user);
}
