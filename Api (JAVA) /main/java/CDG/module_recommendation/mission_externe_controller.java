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

public class mission_externe_controller {
         @Autowired
    private JPA_mission_externe jpa;
    
    @GetMapping("/mission_externe/")
    public List<mission_externe> MissionAll(){
     return  (List<mission_externe>) jpa.findAll();
    }
    
     @GetMapping("/mission_externe/{id}")
    public Optional<mission_externe> MissionById(@PathVariable Integer id){
         Optional<mission_externe>  userfound =  jpa.findById(id);

     return userfound;
    }
    
    @PostMapping("/mission_externe/add/")
    public void save(@RequestBody mission_externe user){
     jpa.save(user);
    }
    
   
    @PutMapping("/mission_externe/edit/")
     public void missionedit(@RequestBody mission_externe user){
     jpa.save(user);
    }
    
    @DeleteMapping("/mission_externe/delete/{id}")
    public void missiondelete(@PathVariable Integer id){
       jpa.delete_mission(id);
       jpa.deleteById(id);
    }
      @GetMapping("mission_externe/nom/{name}")
    public List<mission_externe> findbyname(  @PathVariable String name){
    
        return jpa.findByName(name);
    }
    
}
