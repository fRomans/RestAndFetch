package ru.myTask1.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;
import java.util.Set;


@Entity
@Table(name = "usersSS")
public class User implements UserDetails {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "password")
    private String password;

    @Column(name = "money")
    private Long money;


    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> role;

    public User() {
    }

    public User(long id, String name, String pass, long money) {
        this.id = id;
        this.name = name;
        this.password = pass;
        this.money = money;
    }

    public User(String name, String password, Long money, Set<Role> role) {
        this.name = name;
        this.password = password;
        this.money = money;
        this.role = role;
    }



    public long getId() {
        return id;
    }


    public void setId(long id) {
        this.id = id;
    }

    @Override
    public String getUsername() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    

    public String getPassword() {
        return password;
    }


    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getMoney() {
        return money;
    }

    public void setMoney(Long money) {
        this.money = money;
    }

    public void setRoles(Set<Role> roles) {
        this.role = roles;
    }

    
    @Override
    public Collection<Role> getAuthorities()  {
        return role;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, password, money);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id == user.id &&
                Objects.equals(name, user.name) &&
                Objects.equals(password, user.password) &&
                Objects.equals(money, user.money) &&
                Objects.equals(role, user.role);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", money=" + money +
                ", roles=" + role +
                '}';
    }
}
