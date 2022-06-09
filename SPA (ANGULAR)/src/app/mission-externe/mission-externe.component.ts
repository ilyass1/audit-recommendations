import { Component, OnInit } from '@angular/core';
import { mission_data } from '../services/mission';
import { recommendation_data } from '../services/recommendation';
import { domaine_data } from '../services/domaine';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-mission-externe',
  templateUrl: './mission-externe.component.html',
  styleUrls: ['./mission-externe.component.css']
})
export class MissionExterneComponent implements OnInit {
  mission_externes;reco;perimetre; domaines; id; search_mission; nom; equipe; objectifs; observations
  auditeur;debut;fin;confirm;cabinet;recommendations
  constructor(private mission_externe:mission_data, private recommendation: recommendation_data, private domaine: domaine_data) { }

  ngOnInit() {
    this.get_all();
    this.get_domaines();
    this.get_auditeur();

  }
/////////////////////////////////////////////
  get_all() {
    this.mission_externe.get_mission_externe().subscribe(
      (response) => {
        this.mission_externes = response
        
      },
      (error) => { }
    )
  }
  /////////////////////////////////////////

/////////////////////////////////////////////
get_domaines(){
  this.domaine.get_domaine().subscribe(
    (response) => {
      this.domaines = response
    },
    (error) => { }
  )
}
/////////////////////////////////////////////
get_auditeur(){
  this.mission_externe.get_auditeur().subscribe(
    (response)=>{
    this.auditeur =response
  },
  (error)=>{}
  )
}
/////////////////////////////////////////////
display_add: boolean = false;
display_edit: boolean = false;
displaynorecords: boolean = false;
displaydelete: boolean = false;
/////////////////////////////////////////////
 //////// add utilisateur popup////////////
 showDialog_add() {
  this.display_add = true;
}
///////// edit utilisateur popup///////////
showDialog_edit(utilisateur) {
  this.display_edit = true;
  this.id = utilisateur.id;
  this.nom = utilisateur.nom;
  this.debut = utilisateur.debut;
  this.cabinet=utilisateur.cabinet;
  this.fin = utilisateur.fin;
  this.reco= utilisateur.recommendations;
  this.equipe = utilisateur.equipe_audit;
  this.perimetre = utilisateur.perimetre;
  this.objectifs = utilisateur.objectifs;
  this.observations =utilisateur.observations;
  
}
////////// Add Utilisateur////////////
add_mission(utilisateur: NgForm) {
  this.mission_externe.add_mission_externe(utilisateur.value['nom'], utilisateur.value['perimetre'], utilisateur.value['objectifs'], utilisateur.value['debut'],utilisateur.value['fin'],
utilisateur.value['observations'],utilisateur.value['cabinet'],utilisateur.value['equipe'])
  setTimeout(() => {
    this.get_all()
  }, 1000);
}
///////////Edit utilisateur//////////////
edit_mission(utilisateur: NgForm) {
  this.id = this.id;
  this.mission_externe.update_mission_externe(this.id, utilisateur.value['nom'], utilisateur.value['perimetre'], utilisateur.value['objectifs'], utilisateur.value['debut'],utilisateur.value['fin'],
  utilisateur.value['reco'],utilisateur.value['observations'],utilisateur.value['cabinet'],utilisateur.value['equipe']);
  setTimeout(() => {
    this.get_all();
  }, 1000);

}
////////Delete utilisateur//////////////
delete_utilisateur(id) {
  this.confirm = confirm("voulez-vous bien supprimer ce cet utilisateur")
  if (this.confirm) {
    this.mission_externe.delete_mission_externe(id).subscribe(
      (solve) => {
        setTimeout(() => {
          this.get_all();
        }, 1000);
      },
      (error) => {
        this.displaydelete = true;
      }
    );
  }

}
///////////Search Utilisateur////////////////
search_mission_name() {
  if (this.search_mission == "") {
    this.get_all();
  }
  else {
    this.mission_externe.get_mission_externe_name(this.search_mission).subscribe(
      (response) => {
        this.mission_externes = response;
        
        if (this.mission_externes.length == 0) {
          this.get_all();
          this.displaynorecords = true;
        }
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );

  }
}


}
