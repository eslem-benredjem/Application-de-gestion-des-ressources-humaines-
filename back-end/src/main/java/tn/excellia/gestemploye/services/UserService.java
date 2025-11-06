package tn.excellia.gestemploye.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import tn.excellia.gestemploye.dtos.*;
import tn.excellia.gestemploye.models.Role;
import tn.excellia.gestemploye.models.User;

import java.util.List;
import java.util.Optional;

public interface UserService extends UserDetailsService {
    User addUser(UserDtoInput userDto);
    User updateUsrAdmin(UserDtoUpdate userDto, Long id);
    User updateProfile(UserDtoUpdateProfile userDto, Long id);
    void deleteById(Long id);
    List<User> getAllUsers();
    List<User> getUsersBySupervisor(Long supervisorId);
    User getUserById(Long id);
    List<UserListDto> getListUsers();
    List<User> getSupervisors();
    UserDetails loadUserByUsername(String email) ;
    LoginDtoResponse loginUser(LoginDtoRequest loginRequest);
    User getUserByEmail(String username);
    Long getTotalEmployees();
}
