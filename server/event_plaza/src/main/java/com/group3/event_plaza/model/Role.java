package com.group3.event_plaza.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "role")
public class Role {
    @Id
    private int roleId;

    @Column(name = "role_name")
    private String roleName;

    @ManyToMany(cascade = CascadeType.PERSIST,mappedBy = "role")
    @JsonIgnoreProperties(value = "role")
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



}
