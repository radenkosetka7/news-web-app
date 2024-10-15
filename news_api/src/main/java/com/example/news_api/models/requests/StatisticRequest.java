package com.example.news_api.models.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class StatisticRequest {

    @NotBlank(message = "Ip address cannot be blank")
    private String ipAddress;
    @NotBlank(message = "Browser name cannot be blank")
    private String browserName;
    @NotBlank(message = "Operating system cannot be blank")
    private String osName;
    @NotBlank(message = "Country cannot be blank")
    private String country;
    @NotBlank(message = "City cannot be blank")
    private String city;
    @NotBlank(message = "Section name cannot be blank")
    private String sectionName;
    @NotBlank(message = "Subsection name cannot be blank")
    private String subsectionName;
    private String newsTitle;
}
