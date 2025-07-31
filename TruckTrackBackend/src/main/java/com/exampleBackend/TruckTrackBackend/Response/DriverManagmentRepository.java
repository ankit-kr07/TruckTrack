package com.exampleBackend.TruckTrackBackend.Response;


import org.springframework.data.jpa.repository.JpaRepository;

import com.exampleBackend.TruckTrackBackend.Request.Driver;

import java.util.Optional;

public interface DriverManagmentRepository extends JpaRepository<Driver, Long> {
    Optional<Driver> findByTruckId(String truckId);
}