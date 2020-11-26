package ru.myTask1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.myTask1.domain.Role;
import ru.myTask1.domain.User;
import ru.myTask1.repos.UserRepos;

import java.util.List;
import java.util.Set;

@Component
public class UserService  {

    private UserRepos userRepos;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(PasswordEncoder passwordEncoder, UserRepos userRepos) {
        this.passwordEncoder = passwordEncoder;
        this.userRepos = userRepos;
    }


    public List<User> findAllService() {
        return userRepos.findAll();
    }

    public void saveService(User user) {
        userRepos.save(user);
    }

    public void deleteByIdService(Long id) {
        userRepos.deleteById(id);
    }

    public String UserPasswEncoderService(String password) {

        String hashedPassword = passwordEncoder.encode(password);
        return hashedPassword;
    }


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

    public  User findByUserName(String username){
        User user = userRepos.findByName(username);;
        return user;
    }

    public User findByIdService(Long id) {

        User userEdit = userRepos.findById(id).get();

        return userEdit;
    }

}
