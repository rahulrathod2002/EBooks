package com.EBook.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.EBook.entity.Admin;
import com.EBook.repository.AdminRepository;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admin createNewAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public Optional<Admin> getSingleAdmin(Long id) {
        return adminRepository.findById(id);
    }
}
