package tn.excellia.gestemploye.dtos;

public class GroupListDto {
    private Long id;
    private String nom;
    private String nomSupervisor;
    private String prenomSupervisor;

    public GroupListDto(Long id, String nom, String nomSupervisor, String prenomSupervisor) {
        this.id = id;
        this.nom = nom;
        this.nomSupervisor = nomSupervisor;
        this.prenomSupervisor = prenomSupervisor;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getNomSupervisor() {
        return nomSupervisor;
    }

    public void setNomSupervisor(String nomSupervisor) {
        this.nomSupervisor = nomSupervisor;
    }

    public String getPrenomSupervisor() {
        return prenomSupervisor;
    }

    public void setPrenomSupervisor(String prenomSupervisor) {
        this.prenomSupervisor = prenomSupervisor;
    }
}
