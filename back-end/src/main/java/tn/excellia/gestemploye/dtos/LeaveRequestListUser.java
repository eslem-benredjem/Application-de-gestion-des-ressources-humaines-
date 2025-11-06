package tn.excellia.gestemploye.dtos;

import tn.excellia.gestemploye.models.Statut;

import java.time.LocalDate;

public class LeaveRequestListUser {

    private Long id ;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private String cause;
    private Statut status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Statut getStatus() {
        return status;
    }

    public void setStatus(Statut status) {
        this.status = status;
    }
}
