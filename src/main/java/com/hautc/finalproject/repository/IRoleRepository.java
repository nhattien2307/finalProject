package com.hautc.finalproject.repository;

import com.hautc.finalproject.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface IRoleRepository extends JpaRepository<Role, Integer> {
    Role findByName(String name);
}
