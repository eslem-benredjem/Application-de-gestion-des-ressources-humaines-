package tn.excellia.gestemploye.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.excellia.gestemploye.models.LeaveConfig;

public interface LeaveConfigRepository extends JpaRepository<LeaveConfig, Long> {
}
