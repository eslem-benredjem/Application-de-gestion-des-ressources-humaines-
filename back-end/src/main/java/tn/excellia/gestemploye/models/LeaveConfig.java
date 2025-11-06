package tn.excellia.gestemploye.models;

import jakarta.persistence.*;

@Entity
public class LeaveConfig {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private double sld_mensuelle;

    @OneToOne(mappedBy = "leaveConfig")
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getSld_mensuelle() {
        return sld_mensuelle;
    }

    public void setSld_mensuelle(double sld_mensuelle) {
        this.sld_mensuelle = sld_mensuelle;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
