package com.exampleBackend.TruckTrackBackend.Request;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class BreakSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    public boolean isOnBreak() {
        return startTime != null && endTime == null;
    }

    public long getElapsedSeconds() {
        if (startTime == null) return 0;
        LocalDateTime end = (endTime != null) ? endTime : LocalDateTime.now();
        return java.time.Duration.between(startTime, end).getSeconds();
    }

    public void setStartTime(LocalDateTime now) {
        
        throw new UnsupportedOperationException("Unimplemented method 'setStartTime'");
    }
}