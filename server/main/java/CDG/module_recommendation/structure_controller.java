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
@RestController
@CrossOrigin(origins = "http://localhost:4200")

public class structure_controller {
    @Autowired
    private JPA_structure jpa;
     @GetMapping("/structure/")
    public List<structure> findAll(){
     return  (List<structure>) jpa.findAll();
    }
     @GetMapping("/structure/{id}")
    public Optional<structure> findById(@PathVariable Integer id){
     Optional<structure>  structure =  jpa.findById(id);
     return structure ;
    }
    
    @PostMapping("/structure/add/")
    public void save(@RequestBody structure structure){
     jpa.save(structure);
    }
    
    @PutMapping("/structure/edit/")
    public void edit_structure(@RequestBody structure str){
       jpa.save(str);
        
    }
    
    @DeleteMapping("/structure/delete/{id}")
    public void deleteById( @PathVariable Integer id){
        jpa.delete(id);
       jpa.deleteById(id);
    }
     @GetMapping("structure/nom/{name}")
    public List<structure> findbyname(  @PathVariable String name){
    
        return jpa.findByName(name);
    }
    
    
}
