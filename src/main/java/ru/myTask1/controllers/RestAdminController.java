package ru.myTask1.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.myTask1.service.UserConverter;
import ru.myTask1.DTO.UserDTO;
import ru.myTask1.domain.Role;
import ru.myTask1.domain.User;
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


    @PostMapping  //url показа usera  в приложении(может не совпадать с url запуска сервера)
    public User getIndex(@ModelAttribute User user, Authentication authentication, Model model) {
        List<User> users = userService.findAllService();
        model.addAttribute("users", users);
        User myUser = null;
        //берем данные регистрации и аутентификации при входе user-a
        UserDetails userUserDetails = (UserDetails) authentication.getPrincipal();
        for (GrantedAuthority role : authentication.getAuthorities()) {
            if (role.getAuthority().equals("ROLE_USER")) {
                for (User userSearch : users) {
                    if (userUserDetails.getUsername().equals(userSearch.getUsername())) {
                        myUser = userSearch;
                        break;
                    }
                }

                user.setName(myUser.getUsername());
                user.setRoles((Set<Role>) myUser.getAuthorities());
                user.setId(myUser.getId());
                user.setMoney(myUser.getMoney());
                model.addAttribute("user", user);
                break;
            }
        }
        return user;
    }

    @PostMapping(value = "/update")
    public List<UserDTO> getUpdateUser(@RequestBody UserDTO userDTO) {
        Set<Role> role = userDTO.getRole();
        User user = userConverter.dtoToEntity(userDTO);
        User userUpdate = userService.UserUpdateService(user,role);
        //userService.saveService(userUpdate);
        userDTO = userConverter.entityToDto(userUpdate);
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
        //Set<Role> role = userDTO.getRole();//попробовать без отдельного вызова ролей
        User user = userConverter.dtoToEntity(userDTO);

        //user.setRoles(role);

        String password = user.getPassword();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(password);
        user.setPassword(hashedPassword);
        userService.saveService(user);
        List<User> users = userService.findAllService();
        List<UserDTO> usersDTO = userConverter.entityToDto(users);
        return usersDTO;
    }

}

