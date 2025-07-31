package com.exampleBackend.TruckTrackBackend.Response;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exampleBackend.TruckTrackBackend.Request.VoiceCommand;

public interface VoiceCommandRepository extends JpaRepository<VoiceCommandRepository, Long> {

    VoiceCommand saveAll(VoiceCommand command);
}