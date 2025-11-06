package tn.excellia.gestemploye.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tn.excellia.gestemploye.dtos.GroupDto;
import tn.excellia.gestemploye.dtos.GroupListDto;
import tn.excellia.gestemploye.dtos.GroupNameDto;
import tn.excellia.gestemploye.models.Group;
import tn.excellia.gestemploye.models.User;
import tn.excellia.gestemploye.repositories.GroupRepository;
import tn.excellia.gestemploye.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GroupServiceImpl implements GroupService {
    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Group createGroup(GroupDto groupDTO) {
        System.out.println("Creating group: " + groupDTO.getName());
        System.out.println("Supervisor ID received: " + groupDTO.getSupervisorId());

        User supervisor = userRepository.findById(groupDTO.getSupervisorId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Supervisor with ID " + groupDTO.getSupervisorId() + " not found"));

        Group group = new Group();
        group.setName(groupDTO.getName());
        group.setSupervisor(supervisor);

        return groupRepository.save(group);
    }


    @Override
    public Group updateGroup(Long id, GroupDto groupDto) {
        Optional<Group> existingGroup = groupRepository.findById(id);
        if (existingGroup.isPresent()) {
            Group group = existingGroup.get();
            group.setName(groupDto.getName());

            Optional<User> supervisor = userRepository.findById(groupDto.getSupervisorId());
            supervisor.ifPresent(group::setSupervisor);

            return groupRepository.save(group);
        }
        return null;
    }

    @Override
    public void deleteGroup(Long groupId) {
        Optional<Group> groupOptional = groupRepository.findById(groupId);
        if (groupOptional.isPresent()) {
            Group group = groupOptional.get();

            group.setSupervisor(null);
            groupRepository.delete(group);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Group with ID " + groupId + " not found");
        }
    }


    @Override
    public List<GroupListDto> getAllGroups() {

         return groupRepository.findAllGroupsWithSupervisorName();
    }

    @Override
    public Group getGroupBySupervisor(Long supervisorId) {
        return groupRepository.findBySupervisorId(supervisorId);
    }

    //  méthode pour obtenir le nombre total des groupes
    @Override
    public long getTotalGroupCount() {
        return groupRepository.count();
    }

    @Override
    public List<GroupNameDto> getAllGroupNames() {
        List<Group> groups = groupRepository.findAll();
        List<GroupNameDto> groupNames = new ArrayList<>();

        for (Group group : groups) {
            groupNames.add(new GroupNameDto(group.getIdGroup(), group.getName()));
        }

        return groupNames;
    }

    @Override
    public Group getGroupById(Long id) {
        Optional<Group> group = groupRepository.findById(id);
        return group.orElseThrow(() -> new RuntimeException("Groupe non trouvé avec ID: " + id));
    }
}
