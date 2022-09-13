package com.group3.event_plaza.repository;

import com.group3.event_plaza.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Integer> {

    Role findByRoleId(int id);
}
