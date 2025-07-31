package com.exampleBackend.TruckTrackBackend.Request;


import jakarta.persistence.Embeddable;

@Embeddable
public class Checklist {
    private boolean tires;
    private boolean brakes;
    private boolean lights;
    private boolean mirrors;
    private boolean engineOil;
    private boolean coolantLevel;
    
    
    public boolean isTires() {
        return tires;
    }

    public void setTires(boolean tires) {
        this.tires = tires;
    }

    public boolean isBrakes() {
        return brakes;
    }

    public void setBrakes(boolean brakes) {
        this.brakes = brakes;
    }

    public boolean isLights() {
        return lights;
    }

    public void setLights(boolean lights) {
        this.lights = lights;
    }

    public boolean isMirrors() {
        return mirrors;
    }

    public void setMirrors(boolean mirrors) {
        this.mirrors = mirrors;
    }

    public boolean isEngineOil() {
        return engineOil;
    }

    public void setEngineOil(boolean engineOil) {
        this.engineOil = engineOil;
    }

    public boolean isCoolantLevel() {
        return coolantLevel;
    }

    public void setCoolantLevel(boolean coolantLevel) {
        this.coolantLevel = coolantLevel;
    }

    public Checklist() {}
    
    public Checklist(boolean tires, boolean brakes, boolean lights, 
                    boolean mirrors, boolean engineOil, boolean coolantLevel) {
        this.tires = tires;
        this.brakes = brakes;
        this.lights = lights;
        this.mirrors = mirrors;
        this.engineOil = engineOil;
        this.coolantLevel = coolantLevel;
    }
    

}