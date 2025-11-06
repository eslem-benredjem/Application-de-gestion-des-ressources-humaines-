package tn.excellia.gestemploye.dtos;

import tn.excellia.gestemploye.models.Role;
import tn.excellia.gestemploye.models.Statut;

import java.time.LocalDate;

public class leaveRequestListAdmin {
    private int id;
    private String nom;
    private String prenom;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private String cause;
    private int duree;
    private Role role;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

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

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
    }

    public String getCause() {
        return cause;
    }

    public void setCause(String cause) {
        this.cause = cause;
    }

    public int getDuree() {
        return duree;
    }

    public void setDuree(int duree) {
        this.duree = duree;
    }

    public void setRole(String string) {
    }

    public Role getRole() {
        return role;
    }
}
