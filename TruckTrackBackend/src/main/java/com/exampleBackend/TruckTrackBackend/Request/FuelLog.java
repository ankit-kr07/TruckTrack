package com.exampleBackend.TruckTrackBackend.Request;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FuelLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date; 
    private double odometer;
    private double quantity;
    private double cost;
    private String location;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String photo; 
}
