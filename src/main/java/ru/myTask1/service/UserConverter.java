package ru.myTask1.service;

import org.springframework.stereotype.Component;
import ru.myTask1.DTO.UserDTO;
import ru.myTask1.domain.Role;
import ru.myTask1.domain.User;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class UserConverter {


    public UserDTO entityToDto(User user) {

        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getUsername());
        userDTO.setPassword(user.getPassword());
        userDTO.setMoney(user.getMoney());
        userDTO.setRole((Set<Role>) user.getAuthorities());

        return userDTO;
    }

    public List<UserDTO> entityToDto(List<User> user) {

        return user.stream().map(x-> entityToDto(x)).collect(Collectors.toList());
    }

    public User dtoToEntity(UserDTO userDTO) {

        User user = new User();
        user.setId(userDTO.getId());
        user.setName(userDTO.getName());
        user.setPassword(userDTO.getPassword());
        user.setMoney(userDTO.getMoney());
        user.setRoles((Set<Role>) userDTO.getRole());
        return user;
    }

    public List<User> dtoToEntity(List<UserDTO> userDTO) {

        return userDTO.stream().map(x->dtoToEntity(x)).collect(Collectors.toList());
    }

    





}
