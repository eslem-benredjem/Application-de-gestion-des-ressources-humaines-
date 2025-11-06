package tn.excellia.gestemploye.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.excellia.gestemploye.models.Role;
import tn.excellia.gestemploye.models.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByGrpSupervisor(User supervisor);
    List<User> findByRole(Role role);
    Optional<User> findById(Long id); //reccupere utilisateur par son id
    Optional<User> findByAdresseMail(String adresseMail);
}
