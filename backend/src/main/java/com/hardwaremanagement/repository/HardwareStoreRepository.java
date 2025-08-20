package com.hardwaremanagement.repository;

import com.hardwaremanagement.model.HardwareStore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HardwareStoreRepository extends JpaRepository<HardwareStore, Long> {
    List<HardwareStore> findByOwnerId(Long ownerId);
    List<HardwareStore> findByIsActiveTrue();
    List<HardwareStore> findByOwnerIdAndIsActiveTrue(Long ownerId);
    Optional<HardwareStore> findByManagerId(Long managerId);
}