package com.hardwaremanagement.service;

import com.hardwaremanagement.model.Inventory;
import com.hardwaremanagement.model.Product;
import com.hardwaremanagement.model.HardwareStore;
import com.hardwaremanagement.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {
    @Autowired
    private InventoryRepository inventoryRepository;

    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    public List<Inventory> getInventoryByStoreId(Long storeId) {
        return inventoryRepository.findByStoreId(storeId);
    }

    public List<Inventory> getInventoryByOwnerId(Long ownerId) {
        return inventoryRepository.findByStoreOwnerId(ownerId);
    }

    public Optional<Inventory> getInventoryByStoreAndProduct(Long storeId, Long productId) {
        return inventoryRepository.findByStoreIdAndProductId(storeId, productId);
    }

    public List<Inventory> getLowStockItems(Long storeId, Integer threshold) {
        return inventoryRepository.findByStoreIdAndQuantityLessThan(storeId, threshold);
    }

    public Inventory updateInventory(Long storeId, Long productId, Integer quantity) {
        Optional<Inventory> existingInventory = inventoryRepository.findByStoreIdAndProductId(storeId, productId);
        
        if (existingInventory.isPresent()) {
            Inventory inventory = existingInventory.get();
            inventory.setQuantity(quantity);
            return inventoryRepository.save(inventory);
        } else {
            throw new RuntimeException("Inventory not found for storeId: " + storeId + " and productId: " + productId);
        }
    }

    public Inventory addInventory(HardwareStore store, Product product, Integer quantity) {
        Inventory inventory = new Inventory(store, product, quantity);
        return inventoryRepository.save(inventory);
    }

    public void deleteInventory(Long id) {
        inventoryRepository.deleteById(id);
    }

    public void transferInventory(Long fromStoreId, Long toStoreId, Long productId, Integer quantity) {
        Optional<Inventory> fromInventory = inventoryRepository.findByStoreIdAndProductId(fromStoreId, productId);
        Optional<Inventory> toInventory = inventoryRepository.findByStoreIdAndProductId(toStoreId, productId);
        
        if (!fromInventory.isPresent() || fromInventory.get().getQuantity() < quantity) {
            throw new RuntimeException("Not enough stock available for transfer");
        }
        
        // Reduce quantity in source store
        Inventory source = fromInventory.get();
        source.setQuantity(source.getQuantity() - quantity);
        inventoryRepository.save(source);
        
        // Add quantity to target store
        if (toInventory.isPresent()) {
            Inventory target = toInventory.get();
            target.setQuantity(target.getQuantity() + quantity);
            inventoryRepository.save(target);
        } else {
            // Create new inventory entry if it doesn't exist
            HardwareStore toStore = new HardwareStore();
            toStore.setId(toStoreId);
            Product product = new Product();
            product.setId(productId);
            addInventory(toStore, product, quantity);
        }
    }
}