/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package CDG.module_recommendation;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import org.hibernate.annotations.Cascade;

/**
 *
 * @author admin
 */
@Entity
@SequenceGenerator(name = "programme_seq", sequenceName = "programme_seq", initialValue = 1, allocationSize = 1)
public class programme {

    @Id
    @NotNull
    @GeneratedValue(strategy=GenerationType.SEQUENCE,generator = "programme_seq")
    private Integer id;
    @NotNull
    @Column(unique = true)
    @NotBlank(message = "le nom du programme ne peut pas être vide")
    private String nom;
    @ElementCollection
    @OneToMany(cascade = {CascadeType.REMOVE})
    private List<Mission> list_missions;
 
    
    
    public programme() {
    }

    public programme(String nom, List<Mission> list_missions) {
        this.nom = nom;
        this.list_missions = list_missions;
    }
    

    public Integer getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public List<Mission> getList_missions() {
        return list_missions;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setList_missions(List<Mission> list_missions) {
        this.list_missions = list_missions;
    }
   
    
    
}
