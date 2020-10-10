package ru.myTask1.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import ru.myTask1.domain.User;
import ru.myTask1.repos.UserRepos;

import java.util.List;


@Controller
public class UserViewController {

    private UserRepos userRepos;

    @Autowired
    public UserViewController(UserRepos userRepos) {
        this.userRepos = userRepos;
    }

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public String getUserPage(Authentication authentication, Model model) {
        String pageName = null;
        for (GrantedAuthority role : authentication.getAuthorities()) {
            if (!role.getAuthority().equals("ROLE_USER")) {
                pageName = "login";
            } else {
                UserDetails user = (UserDetails) authentication.getPrincipal();
                List<User> users = userRepos.findAll();
                User myUser = null;
                for (User userSearch : users) {
                    if (user.getUsername().equals(userSearch.getUsername()) || user.getAuthorities().equals(userSearch.getAuthorities())) {
                        myUser = userSearch;
                        break;
                    }
                }
                model.addAttribute("userName", myUser.getUsername());
                model.addAttribute("userRole", myUser.getAuthorities());
                model.addAttribute("userID", myUser.getId());
                model.addAttribute("userMoney", myUser.getMoney());
                pageName = "showUsers";
                break;
            }
        }
        return pageName;
    }
}
