package com.example.SpringBoot_Security.service;

import com.example.SpringBoot_Security.model.Role;
import com.example.SpringBoot_Security.repository.RoleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional(readOnly = true)
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    @Transactional
    public void save(Role role) {
        roleRepository.save(role);
    }

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role getOneRole(Long id) {
        Optional<Role> foundOneRole = roleRepository.findById(id);
        return foundOneRole.orElse(null);
    }

    @Override
    public Set<Role> getRoles(Long[] roleId) {

        Set<Role> roleResult = new HashSet<>();


        if (roleId == null) {
            roleResult.add(roleRepository.findAll().get(0));
        } else {
            for (long i : roleId) {
                List<Role> roles = roleRepository.findAll();
                roleResult.add(roles.stream().filter(r -> r.getId() == i).findAny().orElse(null));
            }
        }

        return roleResult;
    }
}
