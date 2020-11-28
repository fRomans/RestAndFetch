package ru.myTask1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import ru.myTask1.domain.Role;
import ru.myTask1.domain.User;
import ru.myTask1.repos.UserRepos;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class UserServiceImpl implements UserDetailsService,UserService {

    private final UserRepos userRepos;
    @Autowired
    private  PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepos userRepos
    ) {

        this.userRepos = userRepos;
       // this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<User> findAllService() {
        return userRepos.findAll();
    }
    @Override
    public void saveService(User user) {
        userRepos.save(user);
    }
    @Override
    public void deleteByIdService(Long id) {
        userRepos.deleteById(id);
    }
    @Override
    public String UserPasswEncoderService(String password) {

        return passwordEncoder.encode(password);
    }

    @Override
    public User UserUpdateService(User user, Set<Role> role) {
        Long idUser = user.getId();
        User userUpdate = userRepos.findById(idUser).get();
        userUpdate.setName(user.getUsername());
        if (!user.getPassword().equals("")) {
            userUpdate.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        userUpdate.setMoney(user.getMoney());
        userUpdate.setRoles(role);
        userRepos.save(userUpdate);
        return userUpdate;
    }
    @Override
    public User findByUserName(String username) {
        User user = userRepos.findByName(username);
        ;
        return user;
    }


    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = findByUserName(username);
        if (user == null) {
            throw new UsernameNotFoundException(String.format("User '%s' not found", username));
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                mapRolesToAuthorities(user.getAuthorities()));
    }
    @Override
    public Collection<? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles) {
        return roles.stream().map(r -> new SimpleGrantedAuthority(r.getAuthority())).collect(Collectors.toList());
    }
}
