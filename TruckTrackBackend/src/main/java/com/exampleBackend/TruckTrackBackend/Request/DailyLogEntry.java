package com.exampleBackend.TruckTrackBackend.Request;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class DailyLogEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date;
    private String driver;
    private String startTime;
    private String endTime;
    private Integer distance;
    
    @Column(length = 1000)
    private String notes;
}