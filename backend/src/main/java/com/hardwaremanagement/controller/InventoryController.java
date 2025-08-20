package com.hardwaremanagement.controller;

import com.hardwaremanagement.model.Inventory;
import com.hardwaremanagement.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {
    @Autowired
    private InventoryService inventoryService;

    @GetMapping
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public List<Inventory> getAllInventory() {
        return inventoryService.getAllInventory();
    }

    @GetMapping("/store/{storeId}")
    public List<Inventory> getInventoryByStoreId(@PathVariable Long storeId) {
        return inventoryService.getInventoryByStoreId(storeId);
    }

    @GetMapping("/owner/{ownerId}")
    @PreAuthorize("hasRole('OWNER')")
    public List<Inventory> getInventoryByOwnerId(@PathVariable Long ownerId) {
        return inventoryService.getInventoryByOwnerId(ownerId);
    }

    @GetMapping("/store/{storeId}/product/{productId}")
    public ResponseEntity<Inventory> getInventoryByStoreAndProduct(
            @PathVariable Long storeId, @PathVariable Long productId) {
        return inventoryService.getInventoryByStoreAndProduct(storeId, productId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/store/{storeId}/low-stock")
    public List<Inventory> getLowStockItems(@PathVariable Long storeId, @RequestParam Integer threshold) {
        return inventoryService.getLowStockItems(storeId, threshold);
    }

    @PutMapping("/store/{storeId}/product/{productId}")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<Inventory> updateInventory(
            @PathVariable Long storeId, @PathVariable Long productId, @RequestParam Integer quantity) {
        try {
            Inventory updatedInventory = inventoryService.updateInventory(storeId, productId, quantity);
            return ResponseEntity.ok(updatedInventory);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/transfer")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<?> transferInventory(
            @RequestParam Long fromStoreId, 
            @RequestParam Long toStoreId, 
            @RequestParam Long productId, 
            @RequestParam Integer quantity) {
        try {
            inventoryService.transferInventory(fromStoreId, toStoreId, productId, quantity);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}