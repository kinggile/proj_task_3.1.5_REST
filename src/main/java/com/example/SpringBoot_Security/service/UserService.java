package com.example.SpringBoot_Security.service;


import com.example.SpringBoot_Security.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;


public interface UserService extends UserDetailsService {
    List<User> getAllUsers();

    void save(User user);

    User getOneUser(Long id);

    void updateUser(User user);

    void deleteUser(Long id);

    User findByUsername(String username);

}
