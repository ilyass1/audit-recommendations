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
public interface JPA_domaine extends CrudRepository<domaine,Integer>{
    @Query( value = "select * from domaine where nom like :name%", nativeQuery=true)
    List<domaine> findByName (@Param("name") String name );
    
    @Query( value = "select * from r_d_enoeuvre", nativeQuery=true)
    List<Object> get_mise_enoeuvre() ;
    
     @Query( value = "select * from r_d_encours", nativeQuery=true)
    List<Object> get_encours() ;
    
     @Query( value = "select * from r_d_nmise", nativeQuery=true)
    List<Object> get_mise_n_enoeuvre() ;
    
    @Query( value = "select * from r_d_obsolete", nativeQuery=true)
    List<Object> get_obsolete() ;
    
      @Modifying
       @Transactional
       @Query( value = "delete from recommendation_domaine where domaine_id =:id", nativeQuery=true)
       void delete_r (@Param("id") Integer id );
       @Modifying
       @Transactional
       @Query( value = "delete from mission_perimetre where perimetre_id =:id", nativeQuery=true)
       void delete_p (@Param("id") Integer id );
       
    
}


