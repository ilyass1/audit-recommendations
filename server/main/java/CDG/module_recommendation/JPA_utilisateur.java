/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package CDG.module_recommendation;

import java.util.List;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author admin
 */


public interface JPA_utilisateur extends CrudRepository<Utilisateur,Integer>{
      @Query( value = "select * from utilisateur where nom like :name% or prenom like :name%", nativeQuery=true)
     List<Utilisateur> findByName (@Param("name") String name );
      @Modifying
      @Transactional
      @Query( value = "delete from mission_equipe_audit where equipe_audit_id =:id", nativeQuery=true)
     void delete (@Param("id") Integer id );
      @Modifying
      @Transactional
      @Query( value = "update recommendation set responsable_mise_en_place = null where responsable_mise_en_place =:id", nativeQuery=true)
       void edit (@Param("id") Integer id );
       @Query( value = "select * from utilisateur where type = 'Responsable_opérationel' ", nativeQuery=true)
        List<Utilisateur> get_responsable();
        @Query( value = "select * from utilisateur where type = 'Auditeur_interne' ", nativeQuery=true)
        List<Utilisateur> get_aduiteur();
       
}
