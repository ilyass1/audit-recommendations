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
public interface JPA_mission_organe extends CrudRepository<mission_autre_organe,Integer> {
    @Query( value = "select * from mission where nom like :name% and mission_type='autre_organe'", nativeQuery=true)
       List<mission_autre_organe> findByName (@Param("name") String name );
      @Modifying
       @Transactional
       @Query( value = "delete from programme_list_missions where list_missions_id =:id", nativeQuery=true)
       void delete_mission (@Param("id") Integer id );
}
