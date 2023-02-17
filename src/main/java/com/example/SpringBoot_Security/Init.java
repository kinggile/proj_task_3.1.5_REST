package com.example.SpringBoot_Security;

import com.example.SpringBoot_Security.model.Role;
import com.example.SpringBoot_Security.model.User;
import com.example.SpringBoot_Security.service.RoleService;
import com.example.SpringBoot_Security.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;


@Component
public class Init {

    private final UserService userService;
    private final RoleService roleService;

    private final Role roleAdmin = new Role("ROLE_ADMIN");
    private final Role roleUser = new Role("ROLE_USER");

    public Init(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @Transactional
    @Bean
    public void addUser() {
        roleService.save(roleAdmin);
        roleService.save(roleUser);


        User admin = new User("Admin", "Admin", 20, "admin@mail.ru",
                "admin", "$2a$12$x2jGJqzzWh7mp1c4bNW/MePnpkb5Q.garsy0PN9cmK3Ja0UQ3N432"); // pass = admin

        User user = new User("User", "User", 20, "user@mail.ru",
                "user", "$2a$12$L339r/csaPqCTKONAh2fYuiUTGRZYDkRvVUMlX7SujN9ZGSzEtKdm"); // pass = user

        admin.addRole(roleAdmin);
//        admin.addRole(roleUser);
        user.addRole(roleUser);

        userService.save(admin);
        userService.save(user);

    }
}
