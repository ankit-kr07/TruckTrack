package com.exampleBackend.TruckTrackBackend.Request;

import jakarta.persistence.*;

@Entity
@Table(name = "drivers")
public class DriverDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String license;
    private String phone;
    
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getLicense() {
        return license;
    }
    public void setLicense(String license) {
        this.license = license;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public DriverDetails(int id, String name, String license, String phone) {
        this.id = id;
        this.name = name;
        this.license = license;
        this.phone = phone;
    }

    
}