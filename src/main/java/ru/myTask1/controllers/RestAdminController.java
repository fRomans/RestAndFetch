package ru.myTask1.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.myTask1.DTO.UserDTO;
import ru.myTask1.domain.Role;
import ru.myTask1.domain.User;
import ru.myTask1.service.UserConverter;
import ru.myTask1.service.UserService;

import javax.servlet.http.HttpServlet;
import java.util.List;
import java.util.Set;


@RestController
@RequestMapping("/admin")
public class RestAdminController extends HttpServlet {


    private final UserService userService;
    private UserConverter userConverter;


    @Autowired
    public RestAdminController(UserService userService, UserConverter userConverter) {
        this.userService = userService;
        this.userConverter = userConverter;
    }


//    @PostMapping  //url показа usera  в приложении(может не совпадать с url запуска сервера)
//    public List<User> getIndex(@ModelAttribute User user, Authentication authentication, Model model) {
//        List<User> users = userService.findAllService();
//        model.addAttribute("users", users);
//
//        return users;
//    }

    @PostMapping(value = "/update")
    public List<UserDTO> getUpdateUser(@RequestBody UserDTO userDTO) {
        Set<Role> role = userDTO.getRole();
        User user = userConverter.dtoToEntity(userDTO);
        User userUpdate = userService.UserUpdateService(user,role);
        List<User> users = userService.findAllService();
        List<UserDTO> usersDTO = userConverter.entityToDto(users);
        return usersDTO;
    }

    @PostMapping(value = "/delete")
    public List<UserDTO> getDeleteUser(@RequestBody UserDTO userDTO) {

        User user = userConverter.dtoToEntity(userDTO);
        Long id = user.getId();
        userService.deleteByIdService(id);
        List<User> users = userService.findAllService();
        List<UserDTO> usersDTO = userConverter.entityToDto(users);
        return usersDTO;
    }

    @PostMapping(value ="/add")
    public List<UserDTO> addUser(@RequestBody UserDTO userDTO) {
        User user = userConverter.dtoToEntity(userDTO);
        String password = user.getPassword();
        String hashedPassword = userService.UserPasswEncoderService(password);
        user.setPassword(hashedPassword);
        userService.saveService(user);
        List<User> users = userService.findAllService();
        List<UserDTO> usersDTO = userConverter.entityToDto(users);
        return usersDTO;
    }

}

