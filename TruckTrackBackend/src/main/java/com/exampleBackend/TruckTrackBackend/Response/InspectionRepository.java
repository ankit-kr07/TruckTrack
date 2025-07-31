package com.exampleBackend.TruckTrackBackend.Response;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.exampleBackend.TruckTrackBackend.Request.Inspection;

import java.util.List;

@Repository
public interface InspectionRepository extends JpaRepository<Inspection, Long> {
    List<Inspection> findByTruckIdOrderByInspectionDateDesc(String truckId);
    List<Inspection> findByDriverIdOrderByInspectionDateDesc(String driverId);
    List<Inspection> findAllByOrderByInspectionDateDesc();
    List<Inspection> findTopByOrderByInspectionDateDesc(int count);
}
