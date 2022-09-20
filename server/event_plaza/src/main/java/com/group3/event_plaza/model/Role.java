package com.group3.event_plaza.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.group3.event_plaza.common.lang.UserRole;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "Role")
public class Role {
    @Id
    private int roleId;

    @Column(name = "role_name")
    private String roleName;

    @ManyToMany(cascade = CascadeType.ALL,mappedBy = "roles")
    @JsonIgnoreProperties(value = "roles")
    private Set<User> user = new HashSet<>();


    protected Role() {
    }

    public Role(String roleName) {
        this.roleName = roleName;
    }

    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }

    public String  getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public Set<User> getUser() {

        return user;
    }

    public void setUser(Set<User> user) {
        this.user = user;
    }
}
