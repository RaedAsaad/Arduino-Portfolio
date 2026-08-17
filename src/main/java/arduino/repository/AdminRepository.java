package arduino.repository;

import arduino.entity.AdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<AdminEntity, Long> {

    // Spring automatically generates the SQL for this based on the method name!
    Optional<AdminEntity> findByUserName(String userName);

}
