package com.example.SpringBoot_Security.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("/admin")
public class AdminViewController {

    @GetMapping()
    public String showAllUsers() {
        return "admin/adminPanel";
    }
}
