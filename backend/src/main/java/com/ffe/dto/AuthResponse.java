package com.ffe.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String email;
    private String name;
    private Integer age;
    private Double heightCm;
    private Double weightKg;
    private String sex;
}
