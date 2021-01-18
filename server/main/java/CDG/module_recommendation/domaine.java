/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package CDG.module_recommendation;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import net.bytebuddy.asm.Advice;

/**
 *
 * @author admin
 */
@Entity
@SequenceGenerator(name = "domaine_seq", sequenceName = "domaine_seq", initialValue = 1, allocationSize=1)
public class domaine {
    
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE,generator = "domaine_seq")
    @NotNull
    private Integer id ;
    
      @Column(unique = true)
    @NotBlank(message = "le nom du domaine ne peut pas être vide")
    private String nom;

    public domaine() {
    }

    public domaine(String nom) {
        this.nom = nom;
    }

    public Integer getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }
      


}
