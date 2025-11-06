package tn.excellia.gestemploye.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.excellia.gestemploye.models.LeaveRequest;
import tn.excellia.gestemploye.models.Statut;

import java.util.List;

@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByUserId(Long userId);
}
