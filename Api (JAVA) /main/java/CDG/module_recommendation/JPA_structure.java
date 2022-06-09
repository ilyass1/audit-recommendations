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

public interface JPA_structure extends CrudRepository<structure, Integer>{
     @Query( value = "select * from structure where nom like :name%", nativeQuery=true)
       List<structure> findByName (@Param("name") String name );
      @Modifying
      @Transactional
      @Query( value = "update utilisateur set structure_id =null where structure_id =:id", nativeQuery=true)
       void delete_structure (@Param("id") Integer id );
}
