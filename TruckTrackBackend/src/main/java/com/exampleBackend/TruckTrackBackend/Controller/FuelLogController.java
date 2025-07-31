package com.exampleBackend.TruckTrackBackend.Controller;


import org.springframework.web.bind.annotation.*;

import com.exampleBackend.TruckTrackBackend.Request.FuelLog;
import com.exampleBackend.TruckTrackBackend.Response.FuelLogRepository;

import java.util.List;

@RestController
@RequestMapping("/api/fuel")
@CrossOrigin(origins = "*") 
public class FuelLogController {

    private final FuelLogRepository repository;

    public FuelLogController(FuelLogRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<FuelLog> getAllLogs() {
        return repository.findAll();
    }

    @PostMapping
    public FuelLog createLog(@RequestBody FuelLog log) {
        return repository.save(log);
    }

    @PutMapping("/{id}")
    public FuelLog updateLog(@PathVariable Long id, @RequestBody FuelLog log) {
        log.setId(id);
        return repository.save(log);
    }

    @DeleteMapping("/{id}")
    public void deleteLog(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @PostMapping("/import")
    public List<FuelLog> importLogs(@RequestBody List<FuelLog> logs) {
        return repository.saveAll(logs);
    }
}
