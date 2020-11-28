package ru.myTask1.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.myTask1.domain.User;
import ru.myTask1.service.UserServiceImpl;

import javax.servlet.http.HttpServlet;
import java.util.List;


@Controller
@RequestMapping("/admin")
public class AdminController extends HttpServlet {


    private final UserServiceImpl UserServiceImpl;


    @Autowired
    public AdminController(UserServiceImpl UserServiceImpl) {
        this.UserServiceImpl = UserServiceImpl;
    }

    @GetMapping  //url показа usera  в приложении(может не совпадать с url запуска сервера)
    public String getIndex(@ModelAttribute User user, Model model) {
        List<User> users = UserServiceImpl.findAllService();
        model.addAttribute("users", users);
        return "showUsers";
    }


}

