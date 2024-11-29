package com.EBook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.EBook.entity.Admin;
import com.EBook.service.AdminService;

import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/create")
    public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin) {
        Admin createdAdmin = adminService.createNewAdmin(admin);
        return ResponseEntity.ok(createdAdmin);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Admin> getAdminById(@PathVariable Long id) {
        return adminService.getSingleAdmin(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //static username & password
    @GetMapping("/login")
    public ResponseEntity<Map<String, String>> login() {
        Map<String, String> credentials = Map.of(
                "username", "admin",
                "password", "admin"
        );
        return ResponseEntity.ok(credentials);
    }
}
