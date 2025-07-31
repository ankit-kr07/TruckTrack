package com.exampleBackend.TruckTrackBackend.Request;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class VoiceCommand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String command;

    private LocalDateTime timestamp = LocalDateTime.now();

    
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCommand() { return command; }
    public void setCommand(String command) { this.command = command; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}