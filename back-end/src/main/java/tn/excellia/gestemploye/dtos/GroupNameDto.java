package tn.excellia.gestemploye.dtos;

public class GroupNameDto {
    private Long id;   // Ajoutez ce champ
    private String name;

    public GroupNameDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

