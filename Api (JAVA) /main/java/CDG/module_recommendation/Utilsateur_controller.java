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

/**
 *
 * @author admin
 */
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class Utilsateur_controller {
    @Autowired
    private JPA_utilisateur jpa;

    @GetMapping("/utilisateur/")
    public List<Utilisateur> userAll() {
        return (List<Utilisateur>) jpa.findAll();
    }

    @GetMapping("/utilisateur/{id}")
    public Optional<Utilisateur> userById(@PathVariable Integer id) {
        Optional<Utilisateur> userfound = jpa.findById(id);

        return userfound;
    }

    @PostMapping("/utilisateur/add/")
    public void save(@RequestBody Utilisateur user) {
        jpa.save(user);
    }

    @PutMapping("/utilisateur/edit/")
    public void useredit(@RequestBody Utilisateur user) {
        jpa.save(user);
    }

    @DeleteMapping("/utilisateur/delete/{id}")
    public void userdelete(@PathVariable Integer id) {
        jpa.delete_equipe_audit(id);
        jpa.edit(id);
        jpa.deleteById(id);
    }

    @GetMapping("utilisateur/nom/{name}")
    public List<Utilisateur> findbyname(@PathVariable String name) {

        return jpa.findByName(name);
    }

    @GetMapping("/utilisateur/responsable_operationel/")
    public List<Utilisateur> get_responsable() {
        return jpa.get_responsable();
    }

    @GetMapping("/utilisateur/auditeur_interne/")
    public List<Utilisateur> get_auditeur() {
        return jpa.get_aduiteur();
    }

}
