/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package CDG.module_recommendation;

import java.sql.Date;
import java.util.List;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import org.hibernate.Hibernate;
import org.hibernate.annotations.Cascade;

/**
 *
 * @author admin
 */

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "Mission_type", discriminatorType = DiscriminatorType.STRING)
@SequenceGenerator(name = "Misson_seq", sequenceName = "Mission_seq", initialValue = 1, allocationSize = 1)
public class Mission {

    @NotBlank(message = "le nom ne peut pas être vide")
    @Column(unique = true)
    private String nom;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Mission_seq")
    @NotNull
    private Integer id;

    @ElementCollection
    @NotNull
    @OneToMany
    private List<domaine> perimetre;

    @NotNull
    private String Objectifs;

    @NotNull
    private Date debut;

    @NotNull
    private Date fin;

    @ElementCollection
    @OneToMany(cascade = { CascadeType.ALL })
    private List<recommendation> recommendations;

    private String observations;

    @ElementCollection
    @OneToMany
    private List<Utilisateur> equipe_audit;

    public Mission() {
    }

    public Mission(String nom, List<domaine> perimetre, String Objectifs, Date debut, Date fin,
            List<recommendation> recommendations, String observations, List<Utilisateur> equipe_audit) {
        this.nom = nom;
        this.perimetre = perimetre;
        this.Objectifs = Objectifs;
        this.debut = debut;
        this.fin = fin;
        this.recommendations = recommendations;
        this.observations = observations;
        this.equipe_audit = equipe_audit;
    }

    public String getNom() {
        return nom;
    }

    public Integer getId() {
        return id;
    }

    public List<domaine> getPerimetre() {
        return perimetre;
    }

    public String getObjectifs() {
        return Objectifs;
    }

    public Date getDebut() {
        return debut;
    }

    public Date getFin() {
        return fin;
    }

    public List<recommendation> getRecommendations() {
        return recommendations;
    }

    public String getObservations() {
        return observations;
    }

    public List<Utilisateur> getEquipe_audit() {
        return equipe_audit;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setPerimetre(List<domaine> perimetre) {
        this.perimetre = perimetre;
    }

    public void setObjectifs(String Objectifs) {
        this.Objectifs = Objectifs;
    }

    public void setDebut(Date debut) {
        this.debut = debut;
    }

    public void setFin(Date fin) {
        this.fin = fin;
    }

    public void setRecommendations(List<recommendation> recommendations) {
        this.recommendations = recommendations;
    }

    public void setObservations(String observations) {
        this.observations = observations;
    }

    public void setEquipe_audit(List<Utilisateur> equipe_audit) {
        this.equipe_audit = equipe_audit;
    }

}
