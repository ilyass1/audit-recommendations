import { Component, OnInit } from '@angular/core';
import { mission_data } from '../services/mission';
import { recommendation_data } from '../services/recommendation';
import { domaine_data } from '../services/domaine';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-mission-autre-organe',
  templateUrl: './mission-autre-organe.component.html',
  styleUrls: ['./mission-autre-organe.component.css']
})
export class MissionAutreOrganeComponent implements OnInit {
  mission_organes;reco;perimetre; domaines; id; search_mission; nom; equipe; objectifs; observations
  auditeur;debut;fin;confirm;organe_nom;recommendations
  constructor(private mission_organe:mission_data, private recommendation: recommendation_data, private domaine: domaine_data) { }

  ngOnInit() {
    this.get_all();
    this.get_domaines();
    this.get_auditeur();

  }
/////////////////////////////////////////////
  get_all() {
    this.mission_organe.get_mission_organe().subscribe(
      (response) => {
        this.mission_organes = response
        
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
  this.mission_organe.get_auditeur().subscribe(
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
  this.organe_nom = utilisateur.nom_organe;
  this.fin = utilisateur.fin;
  this.reco= utilisateur.recommendations;
  this.equipe = utilisateur.equipe_audit;
  this.perimetre = utilisateur.perimetre;
  this.objectifs = utilisateur.objectifs;
  this.observations =utilisateur.observations;
  
}
////////// Add Utilisateur////////////
add_mission(utilisateur: NgForm) {
  this.mission_organe.add_mission_organe(utilisateur.value['nom'], utilisateur.value['perimetre'], utilisateur.value['objectifs'], utilisateur.value['debut'],utilisateur.value['fin'],
utilisateur.value['observations'],utilisateur.value['nom_organe'],utilisateur.value['equipe'])
  setTimeout(() => {
    this.get_all()
  }, 1000);
}
///////////Edit utilisateur//////////////
edit_mission(utilisateur: NgForm) {
  this.id = this.id;
  this.mission_organe.update_mission_organe(this.id, utilisateur.value['nom'], utilisateur.value['perimetre'], utilisateur.value['objectifs'], utilisateur.value['debut'],utilisateur.value['fin'],
  utilisateur.value['reco'],utilisateur.value['observations'],this.organe_nom,utilisateur.value['equipe']);
  setTimeout(() => {
    this.get_all();
  }, 1000);

}
////////Delete utilisateur//////////////
delete_mission(id) {
  this.confirm = confirm("voulez-vous bien supprimer ce cet utilisateur")
  if (this.confirm) {
    this.mission_organe.delete_mission_organe(id).subscribe(
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
    this.mission_organe.get_mission_organe_name(this.search_mission).subscribe(
      (response) => {
        this.mission_organes = response;
        
        if (this.mission_organes.length == 0) {
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
