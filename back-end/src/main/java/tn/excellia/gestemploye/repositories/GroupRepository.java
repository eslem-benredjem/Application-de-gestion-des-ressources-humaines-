package tn.excellia.gestemploye.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tn.excellia.gestemploye.dtos.GroupListDto;
import tn.excellia.gestemploye.models.Group;

import java.util.List;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
    List<Group> findAll();
    Group findBySupervisorId(Long supervisorId);
    @Query("SELECT new tn.excellia.gestemploye.dtos.GroupListDto(g.idGroup, g.name, u.nom, u.prenom) " +
            "FROM Group g JOIN g.supervisor u")
    List<GroupListDto> findAllGroupsWithSupervisorName();
}
