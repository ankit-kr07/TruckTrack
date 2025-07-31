package com.exampleBackend.TruckTrackBackend.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.exampleBackend.TruckTrackBackend.Request.Inspection;
import com.exampleBackend.TruckTrackBackend.Service.InspectionService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/inspections")
public class InspectionController {
    
    private final InspectionService inspectionService;
    
    @Autowired
    public InspectionController(InspectionService inspectionService) {
        this.inspectionService = inspectionService;
    }
    
    @PostMapping
    public ResponseEntity<Inspection> createInspection(
            @RequestParam String truckId,
            @RequestParam String driverId,
            @RequestParam boolean tires,
            @RequestParam boolean brakes,
            @RequestParam boolean lights,
            @RequestParam boolean mirrors,
            @RequestParam boolean engineOil,
            @RequestParam boolean coolantLevel,
            @RequestParam(required = false) String comments,
            @RequestParam(required = false) List<MultipartFile> images) throws IOException {
        
        Inspection inspection = inspectionService.createInspection(
                truckId, driverId, tires, brakes, lights, mirrors, 
                engineOil, coolantLevel, comments, images);
        
        return ResponseEntity.ok(inspection);
    }
    
    @GetMapping("/truck/{truckId}")
    public ResponseEntity<List<Inspection>> getInspectionsByTruck(@PathVariable String truckId) {
        return ResponseEntity.ok(inspectionService.getInspectionsByTruck(truckId));
    }
    
    @GetMapping("/driver/{driverId}")
    public ResponseEntity<List<Inspection>> getInspectionsByDriver(@PathVariable String driverId) {
        return ResponseEntity.ok(inspectionService.getInspectionsByDriver(driverId));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInspection(@PathVariable Long id) {
        inspectionService.deleteInspection(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/export")
    public ResponseEntity<byte[]> exportInspections() throws IOException {
        byte[] exportData = inspectionService.exportInspections();
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=inspections.json")
                .body(exportData);
    }
}
