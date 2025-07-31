package com.exampleBackend.TruckTrackBackend.Controller;


import org.springframework.web.bind.annotation.*;

import com.exampleBackend.TruckTrackBackend.Request.Driver;
import com.exampleBackend.TruckTrackBackend.Service.DriverService;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
@CrossOrigin(origins = "http://localhost:3000")
public class DriverManagmentController {

    private final DriverService service;

    public DriverManagmentController(DriverService service) {
        this.service = service;
    }

    @GetMapping
    public List<Driver> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Driver create(@RequestBody Driver driver) {
        return service.save(driver);
    }

    @PutMapping("/{id}")
    public Driver update(@PathVariable Long id, @RequestBody Driver driver) {
        driver.setId(id);
        return service.save(driver);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteDriver(id);
    }
}