package ru.myTask1.DTO;

import ru.myTask1.domain.User;

import java.io.Serializable;
import java.util.Set;


public class RoleDTO implements Serializable {


    private Long id;
    private String role;
    private Set<User> users;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
}
