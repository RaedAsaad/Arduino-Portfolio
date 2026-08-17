package arduino.service;

import arduino.entity.AdminEntity;
import arduino.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public boolean authenticate(String username, String password) {
        Optional< AdminEntity> adminOpt = adminRepository.findByUserName(username);

        if (adminOpt.isPresent()) {
            AdminEntity admin = adminOpt.get();
            return admin.getPassword().equals(password);
        }
        return false;
    }
}
