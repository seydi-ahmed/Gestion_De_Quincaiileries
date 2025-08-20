package com.hardwaremanagement.repository;

import com.hardwaremanagement.model.User;
import com.hardwaremanagement.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByRole(Role role);
    List<User> findByOwnerId(Long ownerId);
    List<User> findByRoleAndOwnerId(Role role, Long ownerId);
    boolean existsByEmail(String email);
}