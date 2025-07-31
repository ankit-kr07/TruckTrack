package com.exampleBackend.TruckTrackBackend.Response;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exampleBackend.TruckTrackBackend.Request.LogEntry;

import java.util.List;

public interface LogRepository extends JpaRepository<LogEntry, Long> {
    List<LogEntry> findByDriverContainingIgnoreCase(String driver);
}