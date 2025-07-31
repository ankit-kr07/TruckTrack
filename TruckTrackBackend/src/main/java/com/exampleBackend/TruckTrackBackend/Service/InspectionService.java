package com.exampleBackend.TruckTrackBackend.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.exampleBackend.TruckTrackBackend.Request.Checklist;
import com.exampleBackend.TruckTrackBackend.Request.Inspection;
import com.exampleBackend.TruckTrackBackend.Response.InspectionRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class InspectionService {
    
    private final InspectionRepository inspectionRepository;
    private final FileStorageService fileStorageService;
    private final ObjectMapper objectMapper;
    
    @Autowired
    public InspectionService(InspectionRepository inspectionRepository, 
                           FileStorageService fileStorageService,
                           ObjectMapper objectMapper) {
        this.inspectionRepository = inspectionRepository;
        this.fileStorageService = fileStorageService;
        this.objectMapper = objectMapper;
    }
    
    public Inspection createInspection(String truckId, String driverId, 
                                     boolean tires, boolean brakes, boolean lights, 
                                     boolean mirrors, boolean engineOil, boolean coolantLevel,
                                     String comments, List<MultipartFile> images) throws IOException {
        
        List<String> imageUrls = images != null ? fileStorageService.storeFiles(images) : List.of();
        
        Checklist checklist = new Checklist(tires, brakes, lights, mirrors, engineOil, coolantLevel);
        Inspection inspection = new Inspection();
        inspection.setTruckId(truckId);
        inspection.setDriverId(driverId);
        inspection.setChecklist(checklist);
        inspection.setComments(comments);
        inspection.setImageUrls(imageUrls);
        inspection.setInspectionDate(LocalDateTime.now());
        
        return inspectionRepository.save(inspection);
    }
    
    public List<Inspection> getInspectionsByTruck(String truckId) {
        return inspectionRepository.findByTruckIdOrderByInspectionDateDesc(truckId);
    }
    
    public List<Inspection> getInspectionsByDriver(String driverId) {
        return inspectionRepository.findByDriverIdOrderByInspectionDateDesc(driverId);
    }
    
    public Optional<Inspection> getInspectionById(Long id) {
        return inspectionRepository.findById(id);
    }
    
    public Inspection updateInspection(Long id, String truckId, String driverId,
                                     boolean tires, boolean brakes, boolean lights,
                                     boolean mirrors, boolean engineOil, boolean coolantLevel,
                                     String comments, List<MultipartFile> images) throws IOException {
        Inspection inspection = inspectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inspection not found with id: " + id));
        
        List<String> imageUrls = images != null ? 
                fileStorageService.storeFiles(images) : 
                inspection.getImageUrls();
        
        Checklist checklist = new Checklist(tires, brakes, lights, mirrors, engineOil, coolantLevel);
        
        inspection.setTruckId(truckId);
        inspection.setDriverId(driverId);
        inspection.setChecklist(checklist);
        inspection.setComments(comments);
        inspection.setImageUrls(imageUrls);
        inspection.setLastModifiedDate(LocalDateTime.now());
        
        return inspectionRepository.save(inspection);
    }
    
    public void deleteInspection(Long id) {
        inspectionRepository.deleteById(id);
    }
    
    public byte[] exportInspections() throws IOException {
        List<Inspection> inspections = inspectionRepository.findAll();
        return convertToJson(inspections).getBytes();
    }
    
    private String convertToJson(List<Inspection> inspections) throws IOException {
        return objectMapper.writeValueAsString(inspections);
    }
    
    public List<Inspection> getAllInspections() {
        return inspectionRepository.findAllByOrderByInspectionDateDesc();
    }
    
    public List<Inspection> getRecentInspections(int count) {
        return inspectionRepository.findTopByOrderByInspectionDateDesc(count);
    }
}
