package tn.excellia.gestemploye.services;

import tn.excellia.gestemploye.dtos.GroupDto;
import tn.excellia.gestemploye.dtos.GroupListDto;
import tn.excellia.gestemploye.dtos.GroupNameDto;
import tn.excellia.gestemploye.models.Group;

import java.util.List;

public interface GroupService {
    Group createGroup(GroupDto groupDTO);
    Group updateGroup(Long groupId, GroupDto groupDTO);
    void deleteGroup(Long groupId);
    List<GroupListDto> getAllGroups();
    Group getGroupBySupervisor(Long supervisorId);
    long getTotalGroupCount();
    List<GroupNameDto> getAllGroupNames();
    Group getGroupById(Long id);
}
