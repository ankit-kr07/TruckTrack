package com.exampleBackend.TruckTrackBackend.Request;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long driverId;
    private String text;
    private String sender;
    private LocalDateTime timestamp;



    
    public ChatMessage(Long id, Long driverId, String text, String sender, LocalDateTime timestamp) {
        this.id = id;
        this.driverId = driverId;
        this.text = text;
        this.sender = sender;
        this.timestamp = timestamp;
    }

    public ChatMessage() {}

    public ChatMessage(Long driverId, String text, String sender, LocalDateTime timestamp) {
        this.driverId = driverId;
        this.text = text;
        this.sender = sender;
        this.timestamp = timestamp;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDriverId() {
        return driverId;
    }

    public void setDriverId(Long driverId) {
        this.driverId = driverId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    
}
