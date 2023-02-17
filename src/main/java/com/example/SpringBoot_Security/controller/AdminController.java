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
        User user = userService.findByUsername(principal.getName());
        model.addAttribute("users", user);
        model.addAttribute("email", user);
        model.addAttribute("allUser", userService.getAllUsers());
        model.addAttribute("roleUser", roleService.getAllRoles());
        return "admin/adminPanel";
    }

    @GetMapping("/new")
    public String newUser(@ModelAttribute("user") User user, Model model, @ModelAttribute("roles") Role role) {
        model.addAttribute("roleUser", roleService.getAllRoles());
        return "admin/adminPanel";
    }

    @PostMapping()
    public String createNewUser(@ModelAttribute("user") User user, @RequestParam(name = "role", defaultValue = "0") Long[] id) {
        Set<Role> roles = new HashSet<>(roleService.getRoles(id));
        user.setRoles(roles);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userService.save(user);

        return "redirect:/admin";
    }

    @PatchMapping("/edit/{id}")
    public String editUser(@ModelAttribute("user") User user, @RequestParam(name = "role", defaultValue = "0") Long[] id) {
        Set<Role> roles = new HashSet<>(roleService.getRoles(id));
        user.setRoles(roles);

        userService.updateUser(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }
}
