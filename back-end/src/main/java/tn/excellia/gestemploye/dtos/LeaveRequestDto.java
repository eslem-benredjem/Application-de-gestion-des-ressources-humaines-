package tn.excellia.gestemploye.dtos;

import tn.excellia.gestemploye.models.Statut;

import java.time.LocalDate;

public class LeaveRequestDto {

    private Long userId;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private String cause;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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


}
