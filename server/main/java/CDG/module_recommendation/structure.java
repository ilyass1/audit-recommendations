/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package CDG.module_recommendation;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;


/**
 *
 * @author admin
 */
@Entity
@SequenceGenerator(name = "structure_seq", sequenceName ="structure_seq", initialValue = 1, allocationSize=1)
public class structure {

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE,generator = "recommendation_seq")
    private Integer id;
    @NotEmpty
    @Column(unique = true)
    private String nom ;

    public structure() {
    }

    public structure(String nom) {
        this.nom = nom;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }
    
    
    
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    
    
}
