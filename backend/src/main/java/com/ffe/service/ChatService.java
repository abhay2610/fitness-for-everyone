package com.ffe.service;

import com.ffe.model.User;
import com.ffe.model.WorkoutSession;
import com.ffe.repository.WorkoutSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {

    @Autowired
    private WorkoutSessionRepository workoutSessionRepository;

    public String buildReply(User user, String message) {
        // TODO: replace with real LLM call. For now, stitch a contextual reply.
        List<WorkoutSession> recent = user == null ? List.of() : workoutSessionRepository
                .findByUserAndDateBetweenOrderByDateDesc(user, LocalDate.now().minusDays(14), LocalDate.now());

        String recentSummary = recent.stream()
                .limit(5)
                .map(ws -> String.format("%s on %s (%s min)%s",
                        ws.getWorkoutType(),
                        ws.getDate(),
                        ws.getDurationMinutes() != null ? ws.getDurationMinutes() : "--",
                        ws.getNotes() != null ? ", notes: " + ws.getNotes() : ""))
                .collect(Collectors.joining("; "));

        String profile = user == null
                ? "anonymous user (no profile set)"
                : String.format("Age: %s, Height: %s cm, Weight: %s kg, Sex: %s",
                nullToDash(user.getAge()),
                nullToDash(user.getHeightCm()),
                nullToDash(user.getWeightKg()),
                user.getSex() == null ? "--" : user.getSex());

        StringBuilder sb = new StringBuilder();
        sb.append("Hey, I'm using your profile (" + profile + ") to answer.\n");
        if (!recent.isEmpty()) {
            sb.append("Recent workouts: ").append(recentSummary).append(".\n");
        } else {
            sb.append("I don't see recent workouts; log one to get tailored feedback.\n");
        }
        sb.append("You asked: \"").append(message).append("\".\n");
        sb.append("Quick guidance: stay consistent, hydrate, prioritize form. This is a stub reply until the LLM is wired.");
        return sb.toString();
    }

    private String nullToDash(Object val) {
        return val == null ? "--" : val.toString();
    }
}
