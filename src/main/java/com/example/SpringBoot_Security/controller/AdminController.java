package com.example.SpringBoot_Security.controller;

import com.example.SpringBoot_Security.model.Role;
import com.example.SpringBoot_Security.model.User;
import com.example.SpringBoot_Security.service.RoleService;
import com.example.SpringBoot_Security.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashSet;
import java.util.Set;


@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;

    public AdminController(UserService userService, RoleService roleService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping()
    public String showAllUsers(Model model, Principal principal) {
        return "admin/adminPanel";
    }
}
