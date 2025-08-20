package com.hardwaremanagement.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "hardware_stores")
public class HardwareStore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @OneToOne
    @JoinColumn(name = "manager_id")
    private User manager;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    private List<Inventory> inventories = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Constructors, getters and setters
    public HardwareStore() {}

    public HardwareStore(String name, String address, String phoneNumber, User owner) {
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.owner = owner;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public User getOwner() { return owner; }
    public void setOwner(User owner) { this.owner = owner; }
    public User getManager() { return manager; }
    public void setManager(User manager) { this.manager = manager; }
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    public List<Inventory> getInventories() { return inventories; }
    public void setInventories(List<Inventory> inventories) { this.inventories = inventories; }
}