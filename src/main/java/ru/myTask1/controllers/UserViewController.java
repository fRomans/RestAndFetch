package ru.myTask1.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public String getUserPage(@ModelAttribute User user, Authentication authentication, Model model) {
        String pageName = null;
        for (GrantedAuthority role : authentication.getAuthorities()) {
            if (!role.getAuthority().equals("ROLE_USER")) {
                pageName = "login";
            } else {
                List<User> users = userRepos.findAll();
                User myUser = null;
                for (User userSearch : users) {
                    if (user.getUsername().equals(userSearch.getUsername()) || user.getAuthorities().equals(userSearch.getAuthorities())) {
                        myUser = userSearch;
                        break;
                    }
                }
                user.setName(myUser.getUsername());
                user.setRoles((Set<Role>) myUser.getAuthorities());
                user.setId( myUser.getId());
                user.setMoney( myUser.getMoney());
                pageName = "showUsers";
                break;
            }
        }
        return pageName;
    }
}
