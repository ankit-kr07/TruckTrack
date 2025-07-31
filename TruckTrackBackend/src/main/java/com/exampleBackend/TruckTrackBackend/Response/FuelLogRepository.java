package com.exampleBackend.TruckTrackBackend.Response;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exampleBackend.TruckTrackBackend.Request.FuelLog;

public interface FuelLogRepository extends JpaRepository<FuelLog, Long> {
}
