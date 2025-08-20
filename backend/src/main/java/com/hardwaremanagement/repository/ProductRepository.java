package com.hardwaremanagement.repository;

import com.hardwaremanagement.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByReference(String reference);
    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByCategory(String category);
    boolean existsByReference(String reference);
}