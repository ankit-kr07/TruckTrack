package com.exampleBackend.TruckTrackBackend.Response;


import org.springframework.data.jpa.repository.JpaRepository;

import com.exampleBackend.TruckTrackBackend.Request.Driver;

public interface DriverDetailsRepository extends JpaRepository<Driver, Integer> {
}