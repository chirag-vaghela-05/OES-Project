package com.examination.DE_Project.config;

import com.examination.DE_Project.model.Admin;
import com.examination.DE_Project.reposatory.Adminrepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer implements CommandLineRunner {

    private final Adminrepo adminrepo;

    public AdminInitializer(Adminrepo adminrepo) {
        this.adminrepo = adminrepo;
    }

    @Override
    public void run(String... args) {

        if (adminrepo.findByEmail("admin@gmail.com").isEmpty()) {

            Admin admin = new Admin();
            admin.setEmail("admin@gmail.com");
            admin.setPassword("Admin#345");

            adminrepo.save(admin);

            System.out.println("==================================");
            System.out.println(" Default Admin Created Successfully");
            System.out.println(" Email : admin@gmail.com");
            System.out.println(" Password : Admin#345");
            System.out.println("==================================");
        } else {
            System.out.println("Admin already exists.");
        }
    }
}
