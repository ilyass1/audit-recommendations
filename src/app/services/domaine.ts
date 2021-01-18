import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core/';
@Injectable()
export class domaine_data{
 
 
    constructor(private http: HttpClient) { } 
    
    add_domaine(name:string) : boolean{
      this.http 
      .post('http://localhost:8080/domaine/add/', {nom:name})
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
    update_domaine(id:number,name:string){
      this.http 
      .put('http://localhost:8080/domaine/edit/', {id:id,nom:name})
      .subscribe( 
        (solve) => {
         return solve;
        }, 
        (error) => {
          return error;
        }
      );
    }
    get_domaine() {
      return  this.http
        .get<any[]>('http://localhost:8080/domaine/');     
    }
    get_domaine_name(nom:String) {
      return  this.http
        .get<any[]>('http://localhost:8080/domaine/nom/'+nom);
        
    }
    delete_domaine(id:number){
     return this.http 
      .delete('http://localhost:8080/domaine/delete/'+id);
      

    }
    get_r_encours(){
      return  this.http
      .get<any[]>('http://localhost:8080/domaine/reco/encours/');  
   }
  
   get_r_obsolete(){
    return  this.http
    .get<any[]>('http://localhost:8080/domaine/reco/obsolete/');  
  }
  
  get_r_n_mise_enoeuvre(){
    return  this.http
    .get<any[]>('http://localhost:8080/domaine/reco/nonmise_enoeuvre/');  
  }
  get_r_mise_enoeuvre(){
    return  this.http
    .get<any[]>('http://localhost:8080/domaine/reco/mise_enoeuvre/');  
  }
  
}

  
