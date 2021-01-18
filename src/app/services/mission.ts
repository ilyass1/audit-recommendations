import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core/';
@Injectable()
export class mission_data{
 
 
    constructor(private http: HttpClient) { } 
    
    add_mission_interne(nom:string,perimetre:any[],objectifs:string,debut:Date,fin:Date,
     observation:string,equipe_audit:any[]) : boolean{

        const data = {nom:nom,perimetre:perimetre,objectifs:objectifs,debut:debut,fin:fin,observations:observation,equipe_audit:equipe_audit}
           
      this.http 
      .post('http://localhost:8080/mission_interne/add/', data)
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
    update_mission_interne(id:number,nom:string,perimetre:any[],objectifs:string,debut:Date,fin:Date,recommendations:any[],
        observation:string,equipe_audit:any[]){
            const data = {id:id,nom:nom,perimetre:perimetre,objectifs:objectifs,debut:debut,fin:fin,recommendations:recommendations,observations:observation,equipe_audit:equipe_audit}

               
      this.http 
      .put('http://localhost:8080/mission_interne/edit/',data)
      .subscribe( 
        (solve) => {
         return solve;
        }, 
        (error) => {
          return error;
        }
      );
    }
    get_mission_interne() {
      return  this.http
        .get<any[]>('http://localhost:8080/mission_interne/');     
    }
    get_mission_interne_name(nom:String) {
      return  this.http
        .get<any[]>('http://localhost:8080/mission_interne/nom/'+nom);
        
    }
    //////Mission externe/////////////
    add_mission_externe(nom:string,perimetre:any[],objectifs:string,debut:Date,fin:Date,
      observation:string,cabinet:string,equipe_audit:any[]) : boolean{
 
         const data = {nom:nom,perimetre:perimetre,objectifs:objectifs,cabinet:cabinet,debut:debut,fin:fin,observations:observation,equipe_audit:equipe_audit}
            
       this.http 
       .post('http://localhost:8080/mission_externe/add/', data)
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
     update_mission_externe(id:number,nom:string,perimetre:any[],objectifs:string,debut:Date,fin:Date,recommendations:any[],
         observation:string,cabinet:string,equipe_audit:any[]){
             const data = {id:id,nom:nom,perimetre:perimetre,cabinet:cabinet,objectifs:objectifs,debut:debut,fin:fin,recommendations:recommendations,observations:observation,equipe_audit:equipe_audit}
 
                
       this.http 
       .put('http://localhost:8080/mission_externe/edit/',data)
       .subscribe( 
         (solve) => {
          return solve;
         }, 
         (error) => {
           return error;
         }
       );
     }
     get_mission_externe() {
       return  this.http
         .get<any[]>('http://localhost:8080/mission_externe/');     
     }
     get_mission_externe_name(nom:String) {
       return  this.http
         .get<any[]>('http://localhost:8080/mission_externe/nom/'+nom);
         
     }

     //////////// Mission d'autre organe/////////////////////////////////////////////////////
   
     add_mission_organe(nom:string,perimetre:any[],objectifs:string,debut:Date,fin:Date,
      observation:string,organe:string,equipe_audit:any[]) : boolean{
 
         const data = {nom:nom,perimetre:perimetre,objectifs:objectifs,nom_organe:organe,debut:debut,fin:fin,observations:observation,equipe_audit:equipe_audit}
            
       this.http 
       .post('http://localhost:8080/mission_organe/add/', data)
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
     update_mission_organe(id:number,nom:string,perimetre:any[],objectifs:string,debut:Date,fin:Date,recommendations:any[],
         observation:string,organe:string,equipe_audit:any[]){
             const data = {id:id,nom:nom,perimetre:perimetre,nom_organe:organe,objectifs:objectifs,debut:debut,fin:fin,recommendations:recommendations,observations:observation,equipe_audit:equipe_audit}
 
                
       this.http 
       .put('http://localhost:8080/mission_organe/edit/',data)
       .subscribe( 
         (solve) => {
          return solve;
         }, 
         (error) => {
           return error;
         }
       );
     }
     get_mission_organe() {
       return  this.http
         .get<any[]>('http://localhost:8080/mission_organe/');     
     }
     get_mission_organe_name(nom:String) {
       return  this.http
         .get<any[]>('http://localhost:8080/mission_organe/nom/'+nom);
         
     }
     delete_mission_interne(id:number){
      return this.http 
      .delete('http://localhost:8080/mission_interne/delete/'+id)
      

    }
    delete_mission_externe(id:number){
      return this.http 
      .delete('http://localhost:8080/mission_externe/delete/'+id)
    }

  
    delete_mission_organe(id:number){
     return  this.http 
      .delete('http://localhost:8080/mission_organe/delete/'+id)
      

    }

    get_auditeur(){
      return this.http.get<any[]>('http://localhost:8080/utilisateur/auditeur_interne/');
    }
  
    get_m_i_id(id){
      return this.http.get<any>('http://localhost:8080/mission_interne/'+id)
    }
    get_m_e_id(id){
      return this.http.get<any>('http://localhost:8080/mission_externe/'+id)
    }
    get_m_o_id(id){
      return this.http.get<any>('http://localhost:8080/mission_organe/'+id)
    }


}

  
