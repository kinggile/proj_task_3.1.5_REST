package com.example.SpringBoot_Security.controller;

import com.example.SpringBoot_Security.repository.UserRepository;
import com.example.SpringBoot_Security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import com.example.SpringBoot_Security.model.User;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;


@Controller
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public String info(Model model, Principal principal) {
        model.addAttribute("users", userService.findByUsername(principal.getName()));
        model.addAttribute("email", userService.findByUsername(principal.getName()));
        return "user/userInfo";
    }
}
