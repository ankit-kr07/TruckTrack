package com.exampleBackend.TruckTrackBackend.Response;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exampleBackend.TruckTrackBackend.Request.Driver;

public interface TDriverRepository extends JpaRepository<Driver, Long> {
    Optional<Driver> findByName(String name);
}