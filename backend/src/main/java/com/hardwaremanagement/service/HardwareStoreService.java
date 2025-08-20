package com.hardwaremanagement.service;

import com.hardwaremanagement.model.HardwareStore;
import com.hardwaremanagement.model.User;
import com.hardwaremanagement.repository.HardwareStoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HardwareStoreService {
    @Autowired
    private HardwareStoreRepository hardwareStoreRepository;

    public List<HardwareStore> getAllStores() {
        return hardwareStoreRepository.findByIsActiveTrue();
    }

    public List<HardwareStore> getStoresByOwnerId(Long ownerId) {
        return hardwareStoreRepository.findByOwnerIdAndIsActiveTrue(ownerId);
    }

    public Optional<HardwareStore> getStoreById(Long id) {
        return hardwareStoreRepository.findById(id);
    }

    public HardwareStore createStore(HardwareStore store) {
        return hardwareStoreRepository.save(store);
    }

    public HardwareStore updateStore(Long id, HardwareStore storeDetails) {
        HardwareStore store = hardwareStoreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Store not found with id: " + id));

        store.setName(storeDetails.getName());
        store.setAddress(storeDetails.getAddress());
        store.setPhoneNumber(storeDetails.getPhoneNumber());
        store.setManager(storeDetails.getManager());

        return hardwareStoreRepository.save(store);
    }

    public void deleteStore(Long id) {
        HardwareStore store = hardwareStoreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Store not found with id: " + id));
        store.setIsActive(false);
        hardwareStoreRepository.save(store);
    }

    public Optional<HardwareStore> getStoreByManagerId(Long managerId) {
        return hardwareStoreRepository.findByManagerId(managerId);
    }

    public HardwareStore assignManager(Long storeId, User manager) {
        HardwareStore store = hardwareStoreRepository.findById(storeId)
                .orElseThrow(() -> new RuntimeException("Store not found with id: " + storeId));
        store.setManager(manager);
        return hardwareStoreRepository.save(store);
    }

    public HardwareStore removeManager(Long storeId) {
        HardwareStore store = hardwareStoreRepository.findById(storeId)
                .orElseThrow(() -> new RuntimeException("Store not found with id: " + storeId));
        store.setManager(null);
        return hardwareStoreRepository.save(store);
    }
}