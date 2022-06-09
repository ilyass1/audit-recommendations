/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package CDG.module_recommendation;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

enum priority {
    Priority_0(0), Priority_1(1), Priority_2(2), Priority_3(3);
     
    private final int code;

    private priority(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

}

enum status {
    mise_en_oeuvre("mise en oeuvre"), en_cours("en cours"), non_mise_en_oeuvre("non mise en oeuvre"),
    obsolete("obsolète");

    private final String status;

    private status(String status) {
        this.status = status;
    }
    public String getStatus(){
      return status;
    }

}

@SequenceGenerator(name = "recommendation_seq", sequenceName = "recommendation_seq", initialValue = 1, allocationSize = 1)
@Entity
public class recommendation {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "recommendation_seq")
    @NotNull
    private Integer id;
    @NotNull
    @NotBlank(message = "l'intitulé de la recommendation ne peut pas être vide")
    private String intitule;
    @NotNull
    private Date mise_en_place_previsionnelle;
    @NotNull
    private Date mise_en_place_reelle;
    @OneToOne
    @JoinColumn(name = "responsable_mise_en_place", referencedColumnName = "id", nullable = true)
    private Utilisateur responsable_mise_en_place;
    @Enumerated(EnumType.STRING)
    @NotNull
    private status status;
    @Enumerated

    private priority priority;
    private Integer Taux_avancement;
    @NotNull
    @ElementCollection

    private List<domaine> domaine;

    public recommendation() {
    }

    public recommendation(String intitule, Date mise_en_place_previsionnelle, Date mise_en_place_reelle,
            Utilisateur responsable_mise_en_place, status status, priority priority, Integer Taux_avancement,
            List<domaine> domaine) {
        this.intitule = intitule;
        this.mise_en_place_previsionnelle = mise_en_place_previsionnelle;
        this.mise_en_place_reelle = mise_en_place_reelle;
        this.responsable_mise_en_place = responsable_mise_en_place;
        this.status = status;
        this.priority = priority;
        this.Taux_avancement = Taux_avancement;
        this.domaine = domaine;
    }

    public Integer getId() {
        return id;
    }

    public String getIntitule() {
        return intitule;
    }

    public Date getMise_en_place_previsionnelle() {
        return mise_en_place_previsionnelle;
    }

    public Date getMise_en_place_reelle() {
        return mise_en_place_reelle;
    }

    public Utilisateur getResponsable_mise_en_place() {
        return responsable_mise_en_place;
    }

    public status getStatus() {
        return status;
    }

    public priority getPriority() {
        return priority;
    }

    public Integer getTaux_avancement() {
        return Taux_avancement;
    }

    public List<domaine> getDomaine() {
        return domaine;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setIntitule(String intitule) {
        this.intitule = intitule;
    }

    public void setMise_en_place_previsionnelle(Date mise_en_place_previsionnelle) {
        this.mise_en_place_previsionnelle = mise_en_place_previsionnelle;
    }

    public void setMise_en_place_reelle(Date mise_en_place_reelle) {
        this.mise_en_place_reelle = mise_en_place_reelle;
    }

    public void setResponsable_mise_en_place(Utilisateur responsable_mise_en_place) {
        this.responsable_mise_en_place = responsable_mise_en_place;
    }

    public void setStatus(status status) {
        this.status = status;
    }

    public void setPriority(priority priority) {
        this.priority = priority;
    }

    public void setTaux_avancement(Integer Taux_avancement) {
        this.Taux_avancement = Taux_avancement;
    }

    public void setDomaine(List<domaine> domaine) {
        this.domaine = domaine;
    }

}
