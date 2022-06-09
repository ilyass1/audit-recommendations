import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core/';
@Injectable()
export class structure_data{
 
 
    constructor(private http: HttpClient) { } 
    
    add_structure(name:string){
      this.http 
      .post('http://localhost:8080/structure/add/', {nom:name})
      .subscribe( 
        (solve) => {
         return true
        }, 
        (error) => {
         
          return false;
        }
      );
      return true 
    }
    update_structure(id:number,name:string){
      this.http 
      .put('http://localhost:8080/structure/edit/', {id:id,nom:name})
      .subscribe( 
        (solve) => {
         return solve;
        }, 
        (error) => {
          return error;
        }
      );
    }
    get_structure() {
      return  this.http
        .get<any[]>('http://localhost:8080/structure/');     
    }
    get_strcuture_name(nom:String) {
      return  this.http
        .get<any[]>('http://localhost:8080/structure/nom/'+nom);
        
    }
    delete_structure(id:number){
    return  this.http 
      .delete('http://localhost:8080/structure/delete/'+id);
    
}
}
  
