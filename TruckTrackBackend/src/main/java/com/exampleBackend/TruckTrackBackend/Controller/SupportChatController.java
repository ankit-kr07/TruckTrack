package com.exampleBackend.TruckTrackBackend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.exampleBackend.TruckTrackBackend.Request.ChatMessage;
import com.exampleBackend.TruckTrackBackend.Response.ChatMessageRepository;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/support-chat")
@CrossOrigin(origins = "*")  // Allow frontend to access backend
public class SupportChatController {

    @Autowired
    private ChatMessageRepository messageRepository;

    // Get messages by driverId
    @GetMapping("/{driverId}/messages")
    public List<ChatMessage> getMessages(@PathVariable Long driverId) {
        return messageRepository.findByDriverIdOrderByTimestampAsc(driverId);
    }

    // Send a new message
    @PostMapping("/{driverId}/send")
    public ChatMessage sendMessage(@PathVariable Long driverId, @RequestBody ChatMessage message) {
        message.setDriverId(driverId);
        message.setTimestamp(LocalDateTime.now());
        return messageRepository.save(message);
    }
}
