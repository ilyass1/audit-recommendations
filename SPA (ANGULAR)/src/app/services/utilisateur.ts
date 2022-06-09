import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core/';
@Injectable()

export class utilisateur_data{
 
 
    constructor(private http: HttpClient) { } 
  
    add_utilisateur(name:string,prenom:string,type:string,id:number,nom:string) : boolean{
        const data = {nom:name,prenom:prenom,type:type,structure:{id:id,nom:nom}}
      this.http 
      .post('http://localhost:8080/utilisateur/add/', data)
      .subscribe( 
        (solve) => {
         return true
        }, 
        (error) => {
         
          return false;
        }
      );
      return  false
    }
    update_utilisateur(id_user:number,name:string,prenom:string,type:string,str_id:number){
        const data = {id:id_user,nom:name,prenom:prenom,type:type,structure:{id:str_id}}
      this.http 
      .put('http://localhost:8080/utilisateur/edit/',data)
      .subscribe( 
        (solve) => {
         return solve;
        }, 
        (error) => {
          return error;
        }
      );
    }
    get_utilisateur() {
      return  this.http
        .get<any[]>('http://localhost:8080/utilisateur/');     
    }
    get_utilisateur_name(nom:String) {
      return  this.http
        .get<any[]>('http://localhost:8080/utilisateur/nom/'+nom);
        
    }
    delete_utilisateur(id:number){
      return this.http 
      .delete('http://localhost:8080/utilisateur/delete/'+id)
      

    }
    get_auditeur(){
      return this.http.get<any[]>('http://localhost:8080/utilisateur/auditeur_interne/');
    }
    get_responsable(){
      return this.http.get<any[]>('http://localhost:8080/utilisateur/responsable_operationel/');
    }
    get_res(){
      return this.http.get<any[]>('http://localhost:8080/utilisateur/responsable_audit/');
    }


}

  
