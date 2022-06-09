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
public interface JPA_recommendation extends CrudRepository<recommendation,Integer> {
     @Query( value = "select * from recommendation where intitule like :name%", nativeQuery=true)
       List<recommendation> findByName (@Param("name") String name );
      @Modifying
      @Transactional
      @Query( value = "delete from mission_recommendations where recommendations_id =:id", nativeQuery=true)
       void delete_reco (@Param("id") Integer id );
    

}

