package ru.myTask1.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    @GetMapping("/login1")
    public String loginPage() {

        return "login1";
    }

}
