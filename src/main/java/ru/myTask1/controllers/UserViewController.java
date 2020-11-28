package ru.myTask1.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import ru.myTask1.domain.User;
import ru.myTask1.service.UserServiceImpl;


@Controller
public class UserViewController {

    private final UserServiceImpl setUserServiceImpl;

    @Autowired
    public UserViewController(UserServiceImpl setUserServiceImpl) {
        this.setUserServiceImpl = setUserServiceImpl;
    }

    @GetMapping("/user")
    public String getUserPage(Authentication authentication, Model model) {

        //берем данные регистрации и аутентификации при входе user-a
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User myUser = setUserServiceImpl.findByUserName(userDetails.getUsername());
        model.addAttribute("user", myUser);
        return "user";
    }
}
