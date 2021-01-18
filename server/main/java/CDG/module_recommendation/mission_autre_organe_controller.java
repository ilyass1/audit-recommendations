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

public class mission_autre_organe_controller  {
      @Autowired
    private JPA_mission_organe jpa;
    
    @GetMapping("/mission_organe/")
    public List<mission_autre_organe> MissionAll(){
     return  (List<mission_autre_organe>) jpa.findAll();
    }
    
     @GetMapping("/mission_organe/{id}")
    public Optional<mission_autre_organe> MissionById(@PathVariable Integer id){
         Optional<mission_autre_organe>  userfound =  jpa.findById(id);

     return userfound;
    }
    
    @PostMapping("/mission_organe/add/")
    public void save(@RequestBody mission_autre_organe user){
     jpa.save(user);
    }
    
   
    @PutMapping("/mission_organe/edit/")
     public void missionedit(@RequestBody mission_autre_organe user){
     jpa.save(user);
    }
    
    @DeleteMapping("/mission_organe/delete/{id}")
    public void missiondelete(@PathVariable Integer id){
        jpa.delete(id);
       jpa.deleteById(id);
    }
     @GetMapping("mission_organe/nom/{name}")
    public List<mission_autre_organe> findbyname(  @PathVariable String name){
    
        return jpa.findByName(name);
    }
    
}
