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

public class programme_controller {
    @Autowired
    private JPA_programme jpa;

    @GetMapping("/programme/")
    public List<programme> programmeAll() {
        return (List<programme>) jpa.findAll();
    }

    @GetMapping("/programme/{id}")
    public Optional<programme> programmeById(@PathVariable Integer id) {
        Optional<programme> userfound = jpa.findById(id);

        return userfound;
    }

    @PostMapping("/programme/add/")
    public void save(@RequestBody programme user) {
        jpa.save(user);
    }

    @PutMapping("/programme/edit/")
    public void programmeedit(@RequestBody programme user) {
        jpa.save(user);
    }

    @DeleteMapping("/programme/delete/{id}")
    public void programmedelete(@PathVariable Integer id) {
        jpa.deleteById(id);
    }

    @GetMapping("programme/{name}")
    public List<programme> findbyname(@PathVariable String name) {

        return jpa.findByName(name);
    }
}
