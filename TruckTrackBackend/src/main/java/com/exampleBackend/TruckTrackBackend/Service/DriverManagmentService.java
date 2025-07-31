package com.exampleBackend.TruckTrackBackend.Service;



import org.springframework.stereotype.Service;

import com.exampleBackend.TruckTrackBackend.Request.Driver;
import com.exampleBackend.TruckTrackBackend.Response.DriverRepository;

import java.util.List;
import java.util.Optional;

@Service
public class DriverManagmentService {

    private DriverRepository repo = null;

    public void DriverService(DriverRepository repo) {
        this.repo = repo;
    }

    public List<Driver> getAll() {
        return repo.findAll();
    }

    public Optional<Driver> getById(Long id) {
        return repo.findById(id);
    }

    public Driver save(Driver driver) {
        // Check if truck is already assigned to another driver
        Optional<Driver> existing = repo.findByTruckId(driver.getId());
        if (driver.getId() != null && existing.isPresent() && !existing.get().getId().equals(driver.getId())) {
            throw new RuntimeException("Truck already assigned to another driver.");
        }
        return repo.save(driver);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
