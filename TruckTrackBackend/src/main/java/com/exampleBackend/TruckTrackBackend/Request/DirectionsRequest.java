package com.exampleBackend.TruckTrackBackend.Request;


public class DirectionsRequest {
    private String origin;
    private String destination;


    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }
}