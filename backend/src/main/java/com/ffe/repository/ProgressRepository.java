package com.ffe.repository;

import com.ffe.model.Progress;
import com.ffe.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgressRepository extends JpaRepository<Progress, Long> {
    List<Progress> findAllByOrderByDateDesc();
    List<Progress> findByUserOrderByDateDesc(User user);
}
