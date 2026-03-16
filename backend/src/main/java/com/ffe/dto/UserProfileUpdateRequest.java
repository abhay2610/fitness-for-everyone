package com.ffe.dto;

import lombok.Data;

@Data
public class UserProfileUpdateRequest {
    private String name;
    private Integer age;
    private Double heightCm;
    private Double weightKg;
    private String sex;
}
