package com.exampleBackend.TruckTrackBackend.Service;



import org.springframework.stereotype.Service;

import com.exampleBackend.TruckTrackBackend.Request.Driver;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class DriverDetailsService {
    private final List<Driver> drivers = Arrays.asList(
        new Driver(),
        new Driver()
    );

    public Optional<Driver> getDriverById(int id) {
        return drivers.stream().filter(driver -> driver.getId() == id).findFirst();
    }

    public List<Driver> getAllDrivers() {
        return drivers;
    }
}