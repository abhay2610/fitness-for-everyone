package com.ffe.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ffe.model.User;
import com.ffe.model.WorkoutSession;
import com.ffe.repository.WorkoutSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChatService {

    @Autowired
    private WorkoutSessionRepository workoutSessionRepository;

    @Value("${llm.service.url:http://localhost:8000}")
    private String llmServiceUrl;

    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String buildReply(User user, String message) {
        List<WorkoutSession> recent = user == null ? List.of() : workoutSessionRepository
                .findByUserAndDateBetweenOrderByDateDesc(user, LocalDate.now().minusDays(14), LocalDate.now());

        try {
            Map<String, Object> payload = new HashMap<>();
            payload.put("message", message);
            payload.put("lang", "en");

            if (user != null) {
                Map<String, Object> profile = new HashMap<>();
                profile.put("name", user.getName());
                profile.put("age", user.getAge());
                profile.put("heightCm", user.getHeightCm());
                profile.put("weightKg", user.getWeightKg());
                profile.put("sex", user.getSex());
                if (user.getHeightCm() != null && user.getWeightKg() != null && user.getHeightCm() > 0) {
                    double hm = user.getHeightCm() / 100.0;
                    profile.put("bmi", Math.round(user.getWeightKg() / (hm * hm) * 10.0) / 10.0);
                }
                payload.put("profile", profile);
            }

            List<Map<String, Object>> workoutList = new ArrayList<>();
            for (WorkoutSession ws : recent.subList(0, Math.min(5, recent.size()))) {
                Map<String, Object> w = new HashMap<>();
                w.put("workoutType", ws.getWorkoutType() != null ? ws.getWorkoutType().name() : null);
                w.put("date", ws.getDate() != null ? ws.getDate().toString() : null);
                w.put("durationMinutes", ws.getDurationMinutes());
                w.put("notes", ws.getNotes());
                workoutList.add(w);
            }
            payload.put("recentWorkouts", workoutList);

            String json = objectMapper.writeValueAsString(payload);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(llmServiceUrl + "/chat"))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(json))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                JsonNode node = objectMapper.readTree(response.body());
                return node.get("reply").asText();
            } else {
                return "LLM service returned status " + response.statusCode() + ". Please try again.";
            }

        } catch (Exception e) {
            return fallbackReply(user, message, recent);
        }
    }

    private String fallbackReply(User user, String message, List<WorkoutSession> recent) {
        String profile = user == null
                ? "anonymous user"
                : String.format("Age: %s, Height: %s cm, Weight: %s kg, Sex: %s",
                nullToDash(user.getAge()), nullToDash(user.getHeightCm()),
                nullToDash(user.getWeightKg()), user.getSex() == null ? "--" : user.getSex());

        StringBuilder sb = new StringBuilder();
        sb.append("Hey! I'm using your profile (").append(profile).append(") to answer.\n");
        if (!recent.isEmpty()) {
            sb.append("You have ").append(recent.size()).append(" recent workout(s).\n");
        } else {
            sb.append("No recent workouts found; log one for tailored feedback.\n");
        }
        sb.append("You asked: \"").append(message).append("\".\n");
        sb.append("The AI agent is currently unavailable. Please try again shortly.");
        return sb.toString();
    }

    private String nullToDash(Object val) {
        return val == null ? "--" : val.toString();
    }
}
