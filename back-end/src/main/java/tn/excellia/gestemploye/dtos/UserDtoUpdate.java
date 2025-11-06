package tn.excellia.gestemploye.dtos;

import io.micrometer.common.lang.Nullable;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import tn.excellia.gestemploye.models.Role;

import java.time.LocalDate;

public class UserDtoUpdate {

    @Pattern(
            regexp = "\\d{8}",
            message = "Le CIN doit contenir exactement 8 chiffres."
    )
    private String cin;

    @NotNull(message = "Le nom est obligatoire")
    private String nom;

    @NotNull(message = "Le prénom est obligatoire")
    private String prenom;

    private LocalDate dateNaissance;

    @NotNull(message = "Le genre est obligatoire")
    private String genre;

    @NotNull(message = "L'adresse est obligatoire")
    private String adresse;

    @Pattern(
            regexp = "\\d{8}",
            message = "Le numéro de téléphone doit contenir exactement 8 chiffres."
    )
    private String numeroTelephone;

    @Pattern(
            regexp = "^[A-Za-z0-9]+@[A-Za-z0-9]+\\.[A-Za-z]{2,}$",
            message = "L'adresse email n'est pas valide."
    )
    private String adresseMail;

    @NotNull
    private Role role;

    private LocalDate dateEmbauche;

    // Ajout d'un champ pour groupId
    @Nullable
private Long groupId;


    // Getters et Setters
    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
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

    public LocalDate getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getNumeroTelephone() {
        return numeroTelephone;
    }

    public void setNumeroTelephone(String numeroTelephone) {
        this.numeroTelephone = numeroTelephone;
    }

    public String getAdresseMail() {
        return adresseMail;
    }

    public void setAdresseMail(String adresseMail) {
        this.adresseMail = adresseMail;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public LocalDate getDateEmbauche() {
        return dateEmbauche;
    }

    public void setDateEmbauche(LocalDate dateEmbauche) {
        this.dateEmbauche = dateEmbauche;
    }

    public Long getGroupId() {
        return groupId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

}
