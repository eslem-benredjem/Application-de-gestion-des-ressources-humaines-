package tn.excellia.gestemploye.models;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class LeaveRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long idLeaveRequest;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // L'utilisateur qui a fait la demande de congé

    private LocalDate dateDebut;
    private LocalDate dateFin;

    private String cause;

    private Statut status;

    public long getIdLeaveRequest() {
        return idLeaveRequest;
    }

    public void setIdLeaveRequest(Long idLeaveRequest) {
        this.idLeaveRequest = idLeaveRequest;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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
