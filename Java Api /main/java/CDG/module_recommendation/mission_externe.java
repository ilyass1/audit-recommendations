/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package CDG.module_recommendation;

import java.sql.Date;
import java.util.List;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

/**
 *
 * @author admin
 */
@Entity
@DiscriminatorValue("externe") 
public class mission_externe extends Mission{
     @NotNull
    private String cabinet ;

    public mission_externe() {
    }

    public mission_externe(String cabinet, String nom, List<domaine> perimetre, String Objectifs, Date debut, Date fin, List<recommendation> recommendations, String observations, List<Utilisateur> equipe_audit) {
        super(nom, perimetre, Objectifs, debut, fin, recommendations, observations, equipe_audit);
        this.cabinet = cabinet;
    }

   

    public String getCabinet() {
        return cabinet;
    }

    public void setCabinet(String cabinet) {
        this.cabinet = cabinet;
    }

   
    
    
    
}
