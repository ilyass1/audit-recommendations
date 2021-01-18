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

public class mission_interne_controller {
     @Autowired
    private JPA_mission_interne jpa;
    
    @GetMapping("/mission_interne/")
    public List<mission_interne> MissionAll(){
     return  (List<mission_interne>) jpa.findAll();
    }
    
     @GetMapping("/mission_interne/{id}")
    public Optional<mission_interne> MissionById(@PathVariable Integer id){
         Optional<mission_interne>  userfound =  jpa.findById(id);

     return userfound;
    }
    
    @PostMapping("/mission_interne/add/")
    public void save(@RequestBody mission_interne user){
     jpa.save(user);
    }
    
   
    @PutMapping("/mission_interne/edit/")
     public void missionedit( @RequestBody mission_interne user){
     jpa.save(user);
    }
    
    @DeleteMapping("/mission_interne/delete/{id}")
    public void missiondelete(@PathVariable Integer id){
       jpa.delete(id);
       jpa.deleteById(id);
    }
     @GetMapping("mission_interne/nom/{name}")
    public List<mission_interne> findbyname(  @PathVariable String name){
    
        return jpa.findByName(name);
    }
    
    
}
