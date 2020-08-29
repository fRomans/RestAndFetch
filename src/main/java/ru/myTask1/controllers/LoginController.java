package ru.myTask1.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import ru.myTask1.repos.UserRepos;

@Controller
public class LoginController {
    @Autowired
    UserRepos userRepos;

    @GetMapping("/login1")
    public String loginPage() {

        return "login1";
    }

}
