package ru.myTask1.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;

@Entity
@Component
@Table(name = "roleSS")
public class Role implements GrantedAuthority {

    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "role")
    private String role;

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable (name="users_roles",
            joinColumns=@JoinColumn (name="role_id"),
            inverseJoinColumns=@JoinColumn(name="user_id"))
    private Set<User> users;

    public Role() {
    }

    public Role(String role) {
        this.role = role;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

     public void setRole(String role) {
        this.role = role;
    }
    @Override
    public String getAuthority() {
        return role;
    }


    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    @Override
    public String toString() {
        return  role ;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Role role1 = (Role) o;
        return id.equals(role1.id) &&
                role.equals(role1.role);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, role);
    }

}
