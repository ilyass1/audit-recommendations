/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package CDG.module_recommendation;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author admin
 */
@CrossOrigin(origins = "http://localhost:4200")

@RestController
public class domaine_controller {
     @Autowired
    private JPA_domaine jpa;
    @GetMapping("/domaine/")
    public List<domaine> findAll(){
     return  (List<domaine>) jpa.findAll();
    }
     @GetMapping("/domaine/{id}")
    public Optional<domaine> findById(@PathVariable Integer id){
     Optional<domaine>  structure =  jpa.findById(id);
     return structure ;
    }
    
    @PostMapping("/domaine/add/")
    public void save(@RequestBody domaine structure){
     jpa.save(structure);
    }
    
    @PutMapping("/domaine/edit/")
    public void edit_structure(@RequestBody domaine str){
       jpa.save(str);
        
    }
    
    @DeleteMapping("/domaine/delete/{id}")
    public void deleteById( @PathVariable Integer id){
        jpa.delete_p(id);
        jpa.delete_r(id);
       jpa.deleteById(id);
    }
    
     @GetMapping("/domaine/nom/{name}")
    public List<domaine> findbyname(  @PathVariable String name){
    
        return jpa.findByName(name);
    }
    
    @GetMapping("/domaine/reco/mise_enoeuvre/")
    public List<Object> get_miseenoeuvre(){
    
       return jpa.get_mise_enoeuvre();
    }
   
    @GetMapping("/domaine/reco/encours/")
    public List<Object> get_encours(){
    
       return jpa.get_encours();
    }
    
     @GetMapping("/domaine/reco/nonmise_enoeuvre/")
    public List<Object> get_nonmise_enouvre(){
    
       return jpa.get_mise_n_enoeuvre();
    }
    
    @GetMapping("/domaine/reco/obsolete/")
    public List<Object> get_obsolete(){
    
       return jpa.get_obsolete();
    }
   
}
