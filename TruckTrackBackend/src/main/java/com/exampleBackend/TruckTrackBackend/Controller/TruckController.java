package com.exampleBackend.TruckTrackBackend.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exampleBackend.TruckTrackBackend.Request.Truck;
import com.exampleBackend.TruckTrackBackend.Response.DriverRepository;
import com.exampleBackend.TruckTrackBackend.Response.TruckRepository;

@RestController
@RequestMapping("/api/trucks")
@CrossOrigin
public class TruckController {
    @Autowired private TruckRepository truckRepo;
    @Autowired private DriverRepository driverRepo;

    @GetMapping
    public List<Truck> getAllTrucks() {
        return truckRepo.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createOrUpdateTruck(@RequestBody Truck truck) {
        if (truck.getTruckId() == null || truck.getLicensePlate() == null) {
            return ResponseEntity.badRequest().body("Truck ID and License Plate are required.");
        }

        if (truck.getAssignedDriver() != null && truck.getAssignedDriver().getId() != null) {
            Optional<Truck> existing = truckRepo.findByAssignedDriver(truck.getAssignedDriver());
            if (existing.isPresent() && !existing.get().getId().equals(truck.getId())) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Driver already assigned.");
            }
        }

        return ResponseEntity.ok(truckRepo.save(truck));
    }

    @DeleteMapping("/{id}")
    public void deleteTruck(@PathVariable Long id) {
        truckRepo.deleteById(id);
    }
}
