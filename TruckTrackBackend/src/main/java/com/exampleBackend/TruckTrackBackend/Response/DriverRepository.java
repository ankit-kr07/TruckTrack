package com.exampleBackend.TruckTrackBackend.Response;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.exampleBackend.TruckTrackBackend.Request.Driver;

public interface DriverRepository extends JpaRepository<Driver, Long> {

    Optional<Driver> findByTruckId(Long id);

 
}
