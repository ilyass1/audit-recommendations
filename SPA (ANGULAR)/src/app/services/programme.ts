import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core/';
@Injectable()
export class programme_data{
 
 
    constructor(private http: HttpClient) { } 
    
    add_programme(name:string) : boolean{
      this.http 
      .post('http://localhost:8080/programme/add/', {nom:name})
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
    update_programme(id:number,name:string,mission:any[]){
     return this.http 
      .put('http://localhost:8080/programme/edit/', {id:id,nom:name,list_missions:mission})
      
    }
    get_programme() {
      return  this.http
        .get<any[]>('http://localhost:8080/programme/');     
    }
    get_programme_name(nom:String) {
      return  this.http
        .get<any[]>('http://localhost:8080/programme/name/'+nom);
        
    }
    delete_programme(id:number){
     return this.http 
      .delete('http://localhost:8080/programme/delete/'+id)
      
    }

    get_all_missions(){
      return  this.http
      .get<any[]>('http://localhost:8080/mission_interne/getall/');

    }

}

  
