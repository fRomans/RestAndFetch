package ru.myTask1.controllers;


import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
public class UserViewController {


    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public String getUserPage(Authentication authentication, Model model) {
        String pageName = null;
        for (GrantedAuthority role : authentication.getAuthorities()) {
            if (!role.getAuthority().equals("ROLE_USER")) {
                pageName = "login";
            } else {
                UserDetails user = (UserDetails) authentication.getPrincipal();
                model.addAttribute("user22", user);
                pageName = "user";
                break;
            }
        }
        return pageName;
    }
}
