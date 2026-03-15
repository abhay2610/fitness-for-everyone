package com.ffe.controller;

import com.ffe.dto.WorkoutExerciseDTO;
import com.ffe.dto.WorkoutSessionDTO;
import com.ffe.model.User;
import com.ffe.model.WorkoutExercise;
import com.ffe.model.WorkoutSession;
import com.ffe.model.WorkoutType;
import com.ffe.repository.UserRepository;
import com.ffe.service.WorkoutSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/demo")
public class DemoDataController {

    private static final String DEMO_EMAIL = "abhay@gmail.com";
    private static final String DEMO_PASSWORD = "123456";

    @Autowired
    private WorkoutSessionService workoutSessionService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/seed")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> seedDemoData(Authentication authentication) {
        User user = userRepository.findByEmail(DEMO_EMAIL).orElseGet(() -> {
            User u = new User();
            u.setEmail(DEMO_EMAIL);
            u.setPassword(passwordEncoder.encode(DEMO_PASSWORD));
            u.setName("Abhay Demo");
            return userRepository.save(u);
        });

        List<WorkoutSession> existing = workoutSessionService.getWorkoutsByUser(user);
        if (!existing.isEmpty()) {
            return ResponseEntity.ok("Demo data already present (" + existing.size() + " workouts)");
        }

        List<WorkoutSessionDTO> demos = buildDemoSessions();
        for (WorkoutSessionDTO dto : demos) {
            WorkoutSession session = new WorkoutSession();
            session.setUser(user);
            session.setWorkoutType(dto.getWorkoutType());
            session.setDate(dto.getDate());
            session.setDurationMinutes(dto.getDurationMinutes());
            session.setNotes(dto.getNotes());

            List<WorkoutExercise> exerciseEntities = new ArrayList<>();
            int orderIndex = 0;
            for (WorkoutExerciseDTO exDto : dto.getExercises()) {
                WorkoutExercise ex = new WorkoutExercise();
                ex.setWorkoutSession(session);
                ex.setExerciseName(exDto.getExerciseName());
                ex.setSets(exDto.getSets());
                ex.setMaxWeightKg(exDto.getMaxWeightKg());
                ex.setAverageReps(exDto.getAverageReps());
                ex.setOrderIndex(orderIndex++);
                exerciseEntities.add(ex);
            }
            session.setExercises(exerciseEntities);
            workoutSessionService.createWorkout(session);
        }

        return ResponseEntity.ok("Seeded " + demos.size() + " demo workouts for " + DEMO_EMAIL);
    }

    private List<WorkoutSessionDTO> buildDemoSessions() {
        LocalDate today = LocalDate.now();
        List<WorkoutSessionDTO> list = new ArrayList<>();

        // 12 months of history: 2-3 workouts per month
        WorkoutType[] cycle = new WorkoutType[]{
                WorkoutType.CHEST, WorkoutType.BACK, WorkoutType.SHOULDER,
                WorkoutType.LEG, WorkoutType.BICEP, WorkoutType.TRICEP,
                WorkoutType.CORE_ABS, WorkoutType.CARDIO
        };

        int typeIndex = 0;
        for (int m = 0; m < 12; m++) {
            LocalDate base = today.minusMonths(m).withDayOfMonth(15);
            list.add(session(base.minusDays(2), cycle[typeIndex++ % cycle.length], 45,
                    ex("Flat Barbell Bench Press", 3, 60.0, 10),
                    ex("Incline Dumbbell Press", 3, 30.0, 12),
                    ex("Cable Fly", 3, 20.0, 15)
            ));
            list.add(session(base.plusDays(4), cycle[typeIndex++ % cycle.length], 50,
                    ex("Deadlift", 4, 100.0, 8),
                    ex("Lat Pulldown", 3, 50.0, 12)
            ));
            list.add(session(base.plusDays(10), cycle[typeIndex++ % cycle.length], 40,
                    ex("Barbell Squat", 4, 90.0, 10),
                    ex("Leg Press", 3, 180.0, 12)
            ));
        }
        return list;
    }

    private WorkoutSessionDTO session(LocalDate date, WorkoutType type, Integer durationMinutes, WorkoutExerciseDTO... exercises) {
        WorkoutSessionDTO dto = new WorkoutSessionDTO();
        dto.setDate(date);
        dto.setWorkoutType(type);
        dto.setDurationMinutes(durationMinutes);
        dto.setExercises(Arrays.asList(exercises));
        dto.setNotes(null);
        return dto;
    }

    private WorkoutExerciseDTO ex(String name, int sets, double maxWeightKg, int reps) {
        WorkoutExerciseDTO dto = new WorkoutExerciseDTO();
        dto.setExerciseName(name);
        dto.setSets(sets);
        dto.setMaxWeightKg(maxWeightKg);
        dto.setAverageReps(reps);
        return dto;
    }
}
