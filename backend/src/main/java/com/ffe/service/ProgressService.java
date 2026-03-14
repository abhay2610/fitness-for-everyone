package com.ffe.service;

import com.ffe.model.Progress;
import com.ffe.model.User;
import com.ffe.repository.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProgressService {
    
    @Autowired
    private ProgressRepository progressRepository;
    
    public List<Progress> getAllProgress() {
        return progressRepository.findAllByOrderByDateDesc();
    }
    
    public List<Progress> getProgressByUser(User user) {
        return progressRepository.findByUserOrderByDateDesc(user);
    }
    
    public Optional<Progress> getProgressById(Long id) {
        return progressRepository.findById(id);
    }
    
    public Progress createProgress(Progress progress) {
        return progressRepository.save(progress);
    }
    
    public void deleteProgress(Long id) {
        progressRepository.deleteById(id);
    }
}
