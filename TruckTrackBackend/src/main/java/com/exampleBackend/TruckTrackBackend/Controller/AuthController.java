package com.exampleBackend.TruckTrackBackend.Controller;



import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.exampleBackend.TruckTrackBackend.Request.LoginRequest;
import com.exampleBackend.TruckTrackBackend.Response.UserResponse;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") 
public class AuthController {


    private final String validEmail = "admin@example.com";
    private final String validPassword = "password";

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        if (validEmail.equals(loginRequest.getEmail()) && validPassword.equals(loginRequest.getPassword())) {
            UserResponse user = new UserResponse("Admin", validEmail);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    
}
