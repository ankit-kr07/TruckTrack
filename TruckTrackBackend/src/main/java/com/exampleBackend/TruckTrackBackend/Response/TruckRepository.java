package com.exampleBackend.TruckTrackBackend.Response;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exampleBackend.TruckTrackBackend.Request.Driver;
import com.exampleBackend.TruckTrackBackend.Request.Truck;

public interface TruckRepository extends JpaRepository<Truck, Long> {
    Optional<Truck> findByAssignedDriver(Driver driver);
}
