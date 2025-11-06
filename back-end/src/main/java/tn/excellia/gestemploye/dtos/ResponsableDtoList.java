package tn.excellia.gestemploye.dtos;

import tn.excellia.gestemploye.models.Role;

public class ResponsableDtoList {
    private String nom ;
    private String prenom ;
    private Role role ;

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
