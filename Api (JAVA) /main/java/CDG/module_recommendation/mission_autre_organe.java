/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package CDG.module_recommendation;

import java.sql.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

/**
 *
 * @author admin
 */

@Entity
@DiscriminatorValue("autre_organe") 
public class mission_autre_organe extends Mission {
    @NotNull
    private String nom_organe;

    public mission_autre_organe() {
        
    }

    public mission_autre_organe(String nom_organe, String nom, List<domaine> perimetre, String Objectifs, Date debut, Date fin, List<recommendation> recommendations, String observations, List<Utilisateur> equipe_audit) {
        super(nom, perimetre, Objectifs, debut, fin, recommendations, observations, equipe_audit);
        this.nom_organe = nom_organe;
    }

   

    public String getNom_organe() {
        return nom_organe;
    }

    public void setNom_organe(String nom_organe) {
        this.nom_organe = nom_organe;
    }

    
    
}
