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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "http://localhost:4200")

public class recommendation_controller {
    @Autowired
    private JPA_recommendation jpa;
    
    @GetMapping("/recommendation/")
    
     public List<recommendation> reco_All(){
     return  (List<recommendation>) jpa.findAll();
    }
    
     @GetMapping("/recommendation/{id}")
    public Optional<recommendation> reco_ById(@PathVariable Integer id){
         Optional<recommendation>  reco_found =  jpa.findById(id);

     return reco_found;
    }
    
    @PostMapping("/recommendation/add/")
    public void reco_save(@RequestBody recommendation user){
     jpa.save(user);
    }
    
   
    @PutMapping("/recommendation/edit/")
     public void reco_edit(@RequestBody recommendation user){
     jpa.save(user);
    }
    
    @DeleteMapping("/recommendation/delete/{id}")
    public void reco_delete(@PathVariable Integer id){
       jpa.delete_reco(id);
       jpa.deleteById(id);
    }
    
     @GetMapping("recommendation/nom/{name}")
    public List<recommendation> findbyname(  @PathVariable String name){
        return jpa.findByName(name);
    }
   
    
}
