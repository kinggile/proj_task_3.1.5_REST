package com.example.SpringBoot_Security.controller;

import com.example.SpringBoot_Security.model.User;
import com.example.SpringBoot_Security.service.RoleService;
import com.example.SpringBoot_Security.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/adminR")
public class AdminControllerREST {
    private final UserService userService;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;

    public AdminControllerREST(UserService userService, RoleService roleService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public ResponseEntity<List<User>> showAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping({"/{id}"})
    public ResponseEntity<User> showOneUser(@PathVariable Long id) {
        return new ResponseEntity<>(userService.getOneUser(id), HttpStatus.OK);
    }

    @PostMapping("/new")
    public ResponseEntity<User> createNewUser(@RequestBody User user) {
        userService.save(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity<User> update(@RequestBody User user, @PathVariable Long id) {
        userService.updateUser(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}

