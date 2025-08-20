package com.hardwaremanagement.controller;

import com.hardwaremanagement.model.HardwareStore;
import com.hardwaremanagement.model.User;
import com.hardwaremanagement.service.HardwareStoreService;
import com.hardwaremanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stores")
public class HardwareStoreController {
    @Autowired
    private HardwareStoreService hardwareStoreService;

    @Autowired
    private UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public List<HardwareStore> getAllStores() {
        return hardwareStoreService.getAllStores();
    }

    @GetMapping("/owner/{ownerId}")
    @PreAuthorize("hasRole('OWNER')")
    public List<HardwareStore> getStoresByOwnerId(@PathVariable Long ownerId) {
        return hardwareStoreService.getStoresByOwnerId(ownerId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HardwareStore> getStoreById(@PathVariable Long id) {
        return hardwareStoreService.getStoreById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('OWNER')")
    public HardwareStore createStore(@RequestBody HardwareStore store) {
        return hardwareStoreService.createStore(store);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<HardwareStore> updateStore(@PathVariable Long id, @RequestBody HardwareStore storeDetails) {
        try {
            HardwareStore updatedStore = hardwareStoreService.updateStore(id, storeDetails);
            return ResponseEntity.ok(updatedStore);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<?> deleteStore(@PathVariable Long id) {
        hardwareStoreService.deleteStore(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{storeId}/assign-manager/{managerId}")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<HardwareStore> assignManager(@PathVariable Long storeId, @PathVariable Long managerId) {
        User manager = userService.getUserById(managerId)
                .orElseThrow(() -> new RuntimeException("Manager not found with id: " + managerId));
        
        try {
            HardwareStore updatedStore = hardwareStoreService.assignManager(storeId, manager);
            return ResponseEntity.ok(updatedStore);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{storeId}/remove-manager")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<HardwareStore> removeManager(@PathVariable Long storeId) {
        try {
            HardwareStore updatedStore = hardwareStoreService.removeManager(storeId);
            return ResponseEntity.ok(updatedStore);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}