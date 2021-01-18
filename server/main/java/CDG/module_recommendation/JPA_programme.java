/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package CDG.module_recommendation;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author admin
 */
public interface JPA_programme  extends CrudRepository<programme,Integer>{
     @Query( value = "select * from programme where nom like :name%", nativeQuery=true)
       List<programme> findByName (@Param("name") String name );
}
