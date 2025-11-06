package tn.excellia.gestemploye.dtos;

import tn.excellia.gestemploye.models.User;

public class GroupDto {
    private String name;
    private Long supervisorId;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getSupervisorId() {
        return supervisorId;
    }

    public void setSupervisorId(Long supervisorId) {
        this.supervisorId = supervisorId;
    }


}
