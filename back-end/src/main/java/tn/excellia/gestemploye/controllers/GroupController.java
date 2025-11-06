package tn.excellia.gestemploye.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.excellia.gestemploye.dtos.GroupDto;
import tn.excellia.gestemploye.dtos.GroupListDto;
import tn.excellia.gestemploye.dtos.GroupNameDto;
import tn.excellia.gestemploye.models.Group;
import tn.excellia.gestemploye.models.User;
import tn.excellia.gestemploye.services.GroupService;
import tn.excellia.gestemploye.services.UserService;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:61906"}) // Autorise plusieurs origines
@RestController
@RequestMapping("/groups")
public class GroupController {

    @Autowired
    private GroupService groupService;
    @Autowired
    private UserService userService;

    @PostMapping("/ajouterGroup")
    public ResponseEntity<Group> createGroup(@RequestBody GroupDto groupDTO) {
        Group createdGroup = groupService.createGroup(groupDTO);
        return ResponseEntity.ok(createdGroup);
    }

    @PutMapping("/{groupId}")
    public Group updateGroup(@PathVariable Long groupId, @RequestBody GroupDto groupDTO) {
        return groupService.updateGroup(groupId, groupDTO);
    }

    @DeleteMapping("/{groupId}")
    public ResponseEntity<String> deleteGroup(@PathVariable Long groupId) {
        groupService.deleteGroup(groupId);
        return ResponseEntity.ok("Group deleted successfully");
    }
    @GetMapping("/{id}")
    public ResponseEntity<Group> getGroupById(@PathVariable Long id) {
        return ResponseEntity.ok(groupService.getGroupById(id));
    }

    @GetMapping("/listeG")
    public List<GroupListDto> getAllGroups() {
        return groupService.getAllGroups();
    }

    @GetMapping("/names")
    public ResponseEntity<List<GroupNameDto>> getAllGroupNames() {
        return ResponseEntity.ok(groupService.getAllGroupNames());
    }

    //Récupère un groupe basé sur l'ID du superviseur  /***
    @GetMapping("/supervisor/{supervisorId}")
    public Group getGroupBySupervisor(@PathVariable Long supervisorId) {
        return groupService.getGroupBySupervisor(supervisorId);
    }
    //reccuere le superviseur du groupe
    @GetMapping("/supervisors")
    public List<User> getSupervisors() {
        return userService.getSupervisors();
    }
}
