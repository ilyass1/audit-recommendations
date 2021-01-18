/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package CDG.module_recommendation;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.DiscriminatorValue;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;


/**
 *
 * @author admin
 */
@Entity
@DiscriminatorValue("interne") 
public class mission_interne extends Mission {

    public mission_interne(String nom, List<domaine> perimetre, String Objectifs, Date debut, Date fin, List<recommendation> recommendations, String observations, List<Utilisateur> equipe_audit) {
        super(nom, perimetre, Objectifs, debut, fin, recommendations, observations, equipe_audit);
    }
    
 

   

    public mission_interne() {
    }

   
  

  

   
    
    
}
