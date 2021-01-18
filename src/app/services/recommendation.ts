import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core/';
@Injectable()
export class recommendation_data{
 
 
    constructor(private http: HttpClient) { } 
    
    add_recommendation(intitule:string,previsionnelle:Date,reelle:Date,utilisateur_id:number,
    status:string,priority:number,domaine:any[],taux:number) : boolean{

      const data = {intitule:intitule,mise_en_place_previsionnelle:previsionnelle,mise_en_place_reelle:reelle,status:status,priority:priority,responsable_mise_en_place:{
        id:utilisateur_id},domaine:{domaine},taux_avancement:taux}
      this.http 
      .post('http://localhost:8080/recommendation/add/', data)
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
    update_recommendation(id:number,intitule:string,previsionnelle:Date,reelle:Date,utilisateur_id:number,status:string,priority:string,domaine:any[],taux:number){
            const data = {id:id,intitule:intitule,mise_en_place_previsionnelle:previsionnelle,mise_en_place_reelle:reelle,status:status,priority:priority,responsable_mise_en_place:{
                id:utilisateur_id},domaine:domaine,taux_avancement:taux}
               
      this.http 
      .put('http://localhost:8080/recommendation/edit/',data)
      .subscribe( 
        (solve) => {
         return solve;
        }, 
        (error) => {
          return error;
        }
      );
    }
    get_recommendation() {
      return  this.http
        .get<any[]>('http://localhost:8080/recommendation/');     
    }
    get_recommendation_name(nom:String) {
      return  this.http
        .get<any[]>('http://localhost:8080/recommendation/nom/'+nom);
        
    }
    delete_recommendation(id:number){
     return this.http 
      .delete('http://localhost:8080/recommendation/delete/'+id)
      
    }

    get_responsable(){
      return this.http.get<any[]>('http://localhost:8080/utilisateur/responsable_operationel/');
    }
}

  
