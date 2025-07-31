package com.exampleBackend.TruckTrackBackend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exampleBackend.TruckTrackBackend.Request.BreakSession;
import com.exampleBackend.TruckTrackBackend.Response.BreakSessionRepository;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;

@Service
public class BreakService {

    private final BreakSessionRepository repository;

    @Autowired
    public BreakService(BreakSessionRepository repository) {
        this.repository = repository;
    }

    public BreakSession startBreak() {
        BreakSession breakSession = new BreakSession();
        breakSession.setStartTime(LocalDateTime.now());
        return repository.save(breakSession);
    }

    public BreakSessionRepository endBreak() {
        BreakSessionRepository lastSession = repository.findTopByOrderByIdDesc()
                .orElseThrow(() -> new NoSuchElementException("No break session found"));

        if (lastSession.getEndTime() == null) {
            lastSession.setEndTime(LocalDateTime.now());
            return repository.save(lastSession);
        }

        return lastSession;
    }

    public BreakSessionRepository getCurrentBreakStatus() {
        return repository.findTopByOrderByIdDesc().orElse(null);
    }
}