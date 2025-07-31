package com.exampleBackend.TruckTrackBackend.Controller;

import org.springframework.web.bind.annotation.*;

import com.exampleBackend.TruckTrackBackend.Request.VoiceCommand;
import com.exampleBackend.TruckTrackBackend.Response.VoiceCommandRepository;

import java.util.List;

@RestController
@RequestMapping("/api/commands")
@CrossOrigin(origins = "*") // Allow React frontend to access this API
public class VoiceCommandController {

    private final VoiceCommandRepository repository;

    public VoiceCommandController(VoiceCommandRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public VoiceCommand saveCommand(@RequestBody VoiceCommand command) {
        return repository.saveAll(command);
    }

    @GetMapping
    public List<VoiceCommandRepository> getAllCommands() {
        return repository.findAll();
    }
}