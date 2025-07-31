package com.exampleBackend.TruckTrackBackend.Controller;



import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.exampleBackend.TruckTrackBackend.Request.LogEntry;
import com.exampleBackend.TruckTrackBackend.Service.LogService;

import java.util.List;

@RestController
@RequestMapping("/api/logs")
@CrossOrigin(origins = "*") // Adjust for security in production
public class LogController {

    private final LogService service;

    public LogController(LogService service) {
        this.service = service;
    }

    @GetMapping
    public List<LogEntry> getAllLogs(@RequestParam(required = false) String driver) {
        return (driver != null && !driver.isEmpty())
                ? service.searchByDriver(driver)
                : service.getAllLogs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LogEntry> getLog(@PathVariable Long id) {
        return service.getLogById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public LogEntry addLog(@RequestBody LogEntry log) {
        return service.saveLog(log);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LogEntry> updateLog(@PathVariable Long id, @RequestBody LogEntry log) {
        return service.getLogById(id)
                .map(existing -> {
                    log.setId(id);
                    return ResponseEntity.ok(service.saveLog(log));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLog(@PathVariable Long id) {
        service.deleteLog(id);
        return ResponseEntity.noContent().build();
    }
}
