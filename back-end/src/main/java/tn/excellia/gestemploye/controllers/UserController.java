package tn.excellia.gestemploye.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.Validator;
import org.springframework.web.bind.annotation.*;
import tn.excellia.gestemploye.configuration.JwtUtils;
import tn.excellia.gestemploye.dtos.*;
import tn.excellia.gestemploye.models.User;
import tn.excellia.gestemploye.repositories.UserRepository;
import tn.excellia.gestemploye.services.UserService;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = {"http://localhost:4200"}) // Autorise plusieurs origines
@RestController
//@PreAuthorize("hasRole('ROLE_RESPONSABLE')")
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final Validator validator;

    public UserController(UserService userService, UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils, Validator validator) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.validator = validator;
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody @Valid LoginDtoRequest loginRequest) {

        try {
            System.out.println("loginRequest: " + loginRequest + loginRequest.getPassword() + loginRequest.getUsername());
            LoginDtoResponse response = userService.loginUser(loginRequest);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }



    // Ajouter un utilisateur ***
    @PostMapping("/ajouterEmploye")
    public ResponseEntity<User> addUser(@RequestBody UserDtoInput userDto) {
        return ResponseEntity.ok(userService.addUser(userDto));
    }


    // Modifier un utilisateur ****
    @PutMapping("/modifierEmploye/{id}")
    public User updateUserAdmin(@RequestBody UserDtoUpdate userDto, @PathVariable Long id) {
        return userService.updateUsrAdmin(userDto, id);
    }

    @PutMapping("/modifierProfile/{id}")
    public User updateProfile(@RequestBody UserDtoUpdateProfile userDto, @PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        // Vérification que l'utilisateur authentifié correspond à l'id dans l'URL
        if (!userDetails.getUsername().equals(userDto.getAdresseMail())) {
            throw new AccessDeniedException("Vous n'avez pas les droits nécessaires pour modifier ce profil");
        }
        return userService.updateProfile(userDto, id);
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.getUserByEmail(userDetails.getUsername());
        System.out.println("User details: " + user);  // Log pour vérifier les données
        return ResponseEntity.ok(user);
    }


    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable Long id) {
        try {
            userService.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la suppression");
        }
    }

    @GetMapping("/listeEmployes") //******
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/listeUsers")
    @PreAuthorize("hasRole('ROLE_RESPONSABLE')")
    public ResponseEntity<List<UserListDto>> getListUsers() {
        return ResponseEntity.ok(userService.getListUsers());
    }


    @GetMapping("/listesuperviseur/{supervisorId}")
    public ResponseEntity<List<User>> getUsersBySupervisor(@PathVariable Long supervisorId) {
        List<User> users = userService.getUsersBySupervisor(supervisorId);
        return ResponseEntity.ok(users);
    }


    //retourne les info d'utilisateur //****
    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    //affiche les info des user qui a role=responsable
    @GetMapping("/supervisors" )
    public List<User> getSupervisors() {
        return userService.getSupervisors();
    }

    //nombre totale des utilisateur
    @GetMapping("/totalEmployees")
    public Long getTotalEmployees() {
        return userService.getTotalEmployees();
    }
}
