package tn.excellia.gestemploye.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tn.excellia.gestemploye.configuration.JwtUtils;
import tn.excellia.gestemploye.dtos.*;
import tn.excellia.gestemploye.models.LeaveConfig;
import tn.excellia.gestemploye.models.Role;
import tn.excellia.gestemploye.models.User;
import tn.excellia.gestemploye.repositories.GroupRepository;
import tn.excellia.gestemploye.repositories.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupRepository groupRepository;

    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public UserServiceImp(PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }


    @Override
    public User addUser(UserDtoInput userDto) {
        User user = new User();
        user.setCin(userDto.getCin());
        user.setNom(userDto.getNom());
        user.setPrenom(userDto.getPrenom());
        user.setDateNaissance(userDto.getDateNaissance());
        user.setGenre(userDto.getGenre());
        user.setAdresse(userDto.getAdresse());
        user.setNumeroTelephone(userDto.getNumeroTelephone());
        user.setAdresseMail(userDto.getAdresseMail());
        user.setMotDePasse(passwordEncoder.encode(userDto.getMotDePasse()));
        user.setDateEmbauche(userDto.getDateEmbauche());
        user.setRole(userDto.getRole());

        LeaveConfig leaveConfig = new LeaveConfig();
        leaveConfig.setSld_mensuelle(userDto.getRole().equals(Role.RESPONSABLE) ? 1.5 : 1.0);
        user.setLeaveConfig(leaveConfig);
        leaveConfig.setUser(user);

        if (userDto.getGroupId() != null) {
            user.setGrp(groupRepository.findById(userDto.getGroupId()).orElse(null));
        } else {
            user.setGrp(null); // Aucun groupe sélectionné
        }
        return userRepository.save(user);
    }

    @Override
    public User updateUsrAdmin(UserDtoUpdate userDto, Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setCin(userDto.getCin());
        user.setNom(userDto.getNom());
        user.setPrenom(userDto.getPrenom());
        user.setDateNaissance(userDto.getDateNaissance());
        user.setGenre(userDto.getGenre());
        user.setAdresse(userDto.getAdresse());
        user.setNumeroTelephone(userDto.getNumeroTelephone());
        user.setAdresseMail(userDto.getAdresseMail());
        user.setRole(userDto.getRole());
        user.setDateEmbauche(userDto.getDateEmbauche());
        user.setGrp(groupRepository.findById(userDto.getGroupId()).orElse(null));
        return userRepository.save(user);
    }

    @Override
    public User updateProfile(UserDtoUpdateProfile userDto, Long id) {
        Optional<User> existingUserOptional = userRepository.findById(id);
        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();
            existingUser.setCin(userDto.getCin());
            existingUser.setNom(userDto.getNom());
            existingUser.setPrenom(userDto.getPrenom());
            existingUser.setDateNaissance(userDto.getDateNaissance());
             existingUser.setGenre(userDto.getGenre());
            existingUser.setAdresse(userDto.getAdresse());
            existingUser.setNumeroTelephone(userDto.getNumeroTelephone());
            existingUser.setAdresseMail(userDto.getAdresseMail());
            existingUser.setMotDePasse(userDto.getMotDePasse());
            return userRepository.save(existingUser);
        }
        return null;
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }


    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<UserListDto> getListUsers() {
        return userRepository.findAll().stream().map(user ->
                new UserListDto(
                        user.getId(),
                        user.getCin(),
                        user.getNom(),
                        user.getPrenom(),
                        user.getAdresseMail(),
                        user.getRole()
                )).collect(Collectors.toList());
    }

    @Override
    public List<User> getSupervisors() {
        return userRepository.findByRole(Role.RESPONSABLE);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        tn.excellia.gestemploye.models.User user = userRepository.findByAdresseMail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));


        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                user.getAuthorities() // deriger vesr class user
        );
    }

    @Override
    public LoginDtoResponse loginUser(LoginDtoRequest loginRequest) {
        // Recherche de l'utilisateur par email
        User user = userRepository.findByAdresseMail(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // Vérification du mot de passe
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getMotDePasse())) {
            throw new RuntimeException("Identifiant ou mot de passe invalide.");
        }

        // Génération du token JWT avec le rôle et l'ID de l'utilisateur
        String token = jwtUtils.generateToken(user.getAdresseMail(), user.getRole(), user.getId());

        // Retour de la réponse avec le token JWT
        return new LoginDtoResponse(token);
    }


    @Override
    public List<User> getUsersBySupervisor(Long supervisorId) {
        return userRepository.findByGrpSupervisor(userRepository.findById(supervisorId).orElseThrow(() -> new RuntimeException("Supervisor not found")));
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByAdresseMail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }

    @Override
    public Long getTotalEmployees() {
        return userRepository.count();
    }


}