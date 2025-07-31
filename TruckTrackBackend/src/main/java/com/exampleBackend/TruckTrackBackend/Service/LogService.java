package com.exampleBackend.TruckTrackBackend.Service;


import org.springframework.stereotype.Service;

import com.exampleBackend.TruckTrackBackend.Request.LogEntry;
import com.exampleBackend.TruckTrackBackend.Response.LogRepository;

import java.util.List;
import java.util.Optional;

@Service
public class LogService {

    private final LogRepository repository;

    public LogService(LogRepository repository) {
        this.repository = repository;
    }

    public List<LogEntry> getAllLogs() {
        return repository.findAll();
    }

    public List<LogEntry> searchByDriver(String driver) {
        return repository.findByDriverContainingIgnoreCase(driver);
    }

    public Optional<LogEntry> getLogById(Long id) {
        return repository.findById(id);
    }

    public LogEntry saveLog(LogEntry log) {
        return repository.save(log);
    }

    public void deleteLog(Long id) {
        repository.deleteById(id);
    }
}