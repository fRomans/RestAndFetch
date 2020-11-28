package ru.myTask1.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.myTask1.DTO.UserDTO;
import ru.myTask1.domain.Role;
import ru.myTask1.domain.User;
import ru.myTask1.service.UserConverter;
import ru.myTask1.service.UserServiceImpl;

import javax.servlet.http.HttpServlet;
import java.util.List;
import java.util.Set;


@RestController
@RequestMapping("/admin")
public class RestAdminController extends HttpServlet {


    private final UserServiceImpl UserServiceImpl;
    private UserConverter userConverter;


    @Autowired
    public RestAdminController(UserServiceImpl UserServiceImpl, UserConverter userConverter) {
        this.UserServiceImpl = UserServiceImpl;
        this.userConverter = userConverter;
    }



    @PostMapping(value = "/update")
    public List<UserDTO> getUpdateUser(@RequestBody UserDTO userDTO) {
        Set<Role> role = userDTO.getRole();
        User user = userConverter.dtoToEntity(userDTO);
        User userUpdate = UserServiceImpl.UserUpdateService(user,role);
        List<User> users = UserServiceImpl.findAllService();
        List<UserDTO> usersDTO = userConverter.entityToDto(users);
        return usersDTO;
    }

    @PostMapping(value = "/delete/{id}")
    public List<UserDTO> getDeleteUser(@PathVariable Long id) {

        UserServiceImpl.deleteByIdService(id);
        List<User> users = UserServiceImpl.findAllService();
        List<UserDTO> usersDTO = userConverter.entityToDto(users);
        return usersDTO;
    }

    @PostMapping(value ="/add")
    public List<UserDTO> addUser(@RequestBody UserDTO userDTO) {
        User user = userConverter.dtoToEntity(userDTO);
        String password = user.getPassword();
        String hashedPassword = UserServiceImpl.UserPasswEncoderService(password);
        user.setPassword(hashedPassword);
        UserServiceImpl.saveService(user);
        List<User> users = UserServiceImpl.findAllService();
        List<UserDTO> usersDTO = userConverter.entityToDto(users);
        return usersDTO;
    }

}

