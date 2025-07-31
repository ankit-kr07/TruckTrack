package com.exampleBackend.TruckTrackBackend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exampleBackend.TruckTrackBackend.Request.Driver;
import com.exampleBackend.TruckTrackBackend.Response.DriverRepository;

@RestController
@RequestMapping("/api/drivers")
@CrossOrigin

    public class DriverTruckController{

    @Autowired private DriverRepository driverRepo;

    @GetMapping
    public List<Driver> getAllDrivers() {
        return driverRepo.findAll();
    }

    @PostMapping
    public Driver addDriver(@RequestBody Driver driver) {
        return driverRepo.save(driver);
    }
}