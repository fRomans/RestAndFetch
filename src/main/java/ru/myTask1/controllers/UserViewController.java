package ru.myTask1.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import ru.myTask1.domain.Role;
import ru.myTask1.domain.User;
import ru.myTask1.repos.UserRepos;

import java.util.List;
import java.util.Set;


@Controller
public class UserViewController {

    private UserRepos userRepos;

    @Autowired
    public UserViewController(UserRepos userRepos) {
        this.userRepos = userRepos;
    }

    @GetMapping("/user")
    public String getUserPage(@ModelAttribute User user, Authentication authentication, Model model) {

        List<User> users = userRepos.findAll();
        User myUser = null;
        //берем данные регистрации и аутентификации при входе user-a
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        for (User userSearch : users) {
            if (userDetails.getUsername().equals(userSearch.getUsername()) || userDetails.getAuthorities().equals(userSearch.getAuthorities())) {
                myUser = userSearch;
                break;
            }
        }
        user.setName(myUser.getUsername());
        user.setRoles((Set<Role>) myUser.getAuthorities());
        user.setId(myUser.getId());
        user.setMoney(myUser.getMoney());

        return "user";
    }
}
