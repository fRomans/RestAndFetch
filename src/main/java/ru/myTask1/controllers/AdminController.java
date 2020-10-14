package ru.myTask1.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.myTask1.domain.Role;
import ru.myTask1.domain.User;
import ru.myTask1.service.UserService;

import javax.servlet.http.HttpServlet;
import java.util.List;
import java.util.Set;


@Controller
@RequestMapping("/admin")
public class AdminController extends HttpServlet {


    private UserService userService;


    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping  //url показа usera  в приложении(может не совпадать с url запуска сервера)
    public String getIndex(@ModelAttribute User user, Authentication authentication, Model model) {
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
                break;
            }
        }
        return "showUsers";
    }

    @GetMapping("/add")
    public String getPage() {
        return "addUser";
    }


    @PostMapping("/add")
    public String addUser(@ModelAttribute User user, @RequestParam(value = "role_id") Set<Role> role) {
        user.setRoles(role);

        String password = user.getPassword();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(password);
        user.setPassword(hashedPassword);
        userService.saveService(user);
        return "redirect:/admin";//todo   привести  к такому виду!!!/
    }

    @PostMapping("/delete")
    public String getDeleteUser(@RequestParam(value = "deleteId") Long id) {
        userService.deleteByIdService(id);
        return "redirect:/admin";
    }


    @PostMapping("/update")
    public String getUpdateUser( @ModelAttribute User user, @RequestParam Set<Role> role) {
        userService.UserUpdateService(user, role);
        return "redirect:/admin";
    }


}

