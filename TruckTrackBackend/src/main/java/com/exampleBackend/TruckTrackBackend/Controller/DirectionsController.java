package com.exampleBackend.TruckTrackBackend.Controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import com.exampleBackend.TruckTrackBackend.Request.DirectionsRequest;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow React frontend to access
public class DirectionsController {

    @Value("${google.maps.api.key}")
    private String googleMapsApiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/directions")
    public ResponseEntity<String> getDirections(@RequestBody DirectionsRequest request) {
        if (request.getOrigin() == null || request.getDestination() == null) {
            return ResponseEntity.badRequest().body("Missing origin or destination");
        }

        String url = "https://maps.googleapis.com/maps/api/directions/json"
                + "?origin=" + request.getOrigin()
                + "&destination=" + request.getDestination()
                + "&mode=driving"
                + "&key=" + googleMapsApiKey;

        try {
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to fetch directions: " + e.getMessage());
        }
    }
}