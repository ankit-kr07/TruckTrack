package com.exampleBackend.TruckTrackBackend.Response;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.exampleBackend.TruckTrackBackend.Request.BreakSession;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface BreakSessionRepository extends JpaRepository<BreakSessionRepository, Long> {
    Optional<BreakSessionRepository> findTopByOrderByIdDesc();

    void setEndTime(LocalDateTime now);

    Object getEndTime();

    BreakSession save(BreakSession breakSession);
}