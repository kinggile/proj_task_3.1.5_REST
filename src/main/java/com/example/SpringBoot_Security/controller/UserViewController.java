package com.example.SpringBoot_Security.controller;

import com.example.SpringBoot_Security.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@Controller
@RequestMapping("/user")
public class UserViewController {

    private final UserService userService;

    public UserViewController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public String info(Model model, Principal principal) {
        model.addAttribute("users", userService.findByUsername(principal.getName()));
        model.addAttribute("email", userService.findByUsername(principal.getName()));
        return "user/userInfo";
    }
}
