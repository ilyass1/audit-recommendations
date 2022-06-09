import { Component, OnInit } from '@angular/core';
import { recommendation_data } from '../services/recommendation';
import { NgForm } from '@angular/forms';
import { utilisateur_data } from '../services/utilisateur';
import { domaine_data } from '../services/domaine';
import { mission_data } from '../services/mission';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
  recommendation: any[]; search_recommendation; id; value; priority_val = [1, 2, 3]; responsable_val; domaine_val
  intitule; previsionelle; reele; responsable: any[]; status; priority; domaines: any[]; confirm; status_val = ["en cours", "mise en oeuvre", "non mise en oeuvre", "obsoléte"]; 
  mission_interne;mission_externe;mission_organe;all_missions= Array();taux
  constructor(private recommendations: recommendation_data, private utilisateur: utilisateur_data, private domaine: domaine_data, private mission: mission_data) { }

  ngOnInit() {
    this.getall()
    this.get_domaines()
    this.get_users();
    this.get_missions()
  }
  ////////get Utilisateur List//////////////
  get_users() {
    this.recommendations.get_responsable().subscribe(
      (response) => {
        this.responsable = response;
      },
      (error) => { }
    )
  }
  get_domaines() {
    this.domaine.get_domaine().subscribe(
      (response) => {
        this.domaines = response;
      },
      (error) => { }
    )
  }
  //////////////////////////////////////////////////////
  get_missions(){
    this.mission.get_mission_interne().subscribe(
      (response)=>{
        this.mission_interne = response
        this.all_missions.push(this.mission_interne)
      },
     (error)=>{}
    )
    this.mission.get_mission_externe().subscribe(
      (response)=>{
        this.mission_externe = response
        this.all_missions.push(this.mission_externe)
      },
     (error)=>{}
    )
    this.mission.get_mission_organe().subscribe(
      (response)=>{
        this.mission_organe = response
        this.all_missions.push(this.mission_organe)
      },
     (error)=>{}
    )
    

  }
///////////////////////////////////////////////
  getall() {
    this.recommendations.get_recommendation().subscribe(
      (Response) => {
        this.recommendation = Response;
        for (let u of this.recommendation) {
          if (u.priority == "Priority_1") {
            u.priority = 1
          } else if (u.priority == "Priority_2") {
            u.priority = 2
          } else if (u.priority == "Priority_3") {
            u.priority = 3
          }
        }
        for (let u of this.recommendation) {
          if (u.status == "en_cours") {
            u.status = "en cours"
          } else if (u.status == "mise_en_oeuvre") {
            u.status = "mise en oeuvre"
          } else if (u.status == "non_mise_en_oeuvre") {
            u.status = "non mise en oeuvre"
          } else if (u.status == "obsolete") {
            u.status = "obsoléte"
          }
        }
      },
      (error) => { }

    )
  }
  display_add: boolean = false;
  display_edit: boolean = false;
  displaynorecords: boolean = false;
  displaydelete: boolean = false;
  /////////////get structure List////////////
  get_all_domaines() {
    this.domaine.get_domaine().subscribe(
      (response) => {
        this.domaines = response;
      },
      (error) => { }
    )
  }
  //////// add utilisateur popup////////////
  showDialog_add() {
    this.display_add = true;
  }
  ///////// edit utilisateur popup///////////
  showDialog_edit(reco) {
    this.display_edit = true;
    this.id = reco.id;
    this.intitule = reco.intitule;
    this.previsionelle = reco.mise_en_place_previsionnelle;
    this.reele = reco.mise_en_place_reelle;
    this.status = reco.status;
    this.priority = reco.priority;
    this.taux = reco.taux_avancement;
    this.domaine_val = reco.domaine;
    this.responsable_val = reco.responsable_mise_en_place.id;
  }
  ////////// Add Utilisateur////////////
  add_recommendation(utilisateur: NgForm) {
    if (utilisateur.value['status'] == "en cours") {
      utilisateur.value['status'] = "en_cours";
    } else if (utilisateur.value['status'] == "mise en oeuvre") {
      utilisateur.value['status'] = "mise_en_oeuvre";
    } else if (utilisateur.value['status'] == "non mise en oeuvre") {
      utilisateur.value['status'] = "non_mise_en_oeuvre";
    } else if (utilisateur.value['status'] == "obsoléte") {
      utilisateur.value['status'] = "obsolete";
    }
    if (utilisateur.value['priority'] == 1) {
      utilisateur.value['priority'] == "Priority_1"
    } else if (utilisateur.value['priority'] == 2) {
      utilisateur.value['priority'] == "Priority_2"
    } else if (utilisateur.value['priority'] == 3) {
      utilisateur.value['priority'] == "Priority_3"
    }

    let tab = Array();
    let new_reco = {"intitule":utilisateur.value['intitule'],"mise_en_place_previsionnelle":utilisateur.value['previsionelle'], 
    "mise_en_place_reelle":utilisateur.value['reele']==''?'':utilisateur.value['reele'],"responsable_mise_en_place":utilisateur.value['responsable'],
    "status":utilisateur.value['status'],"priority":utilisateur.value['priority'],"domaine":utilisateur.value['domaine'],"taux_avancement":utilisateur.value['taux']};
    tab =utilisateur.value['mission'].recommendations
    tab.push(new_reco);
    if(utilisateur.value['mission'].cabinet != null){
    this.mission.update_mission_externe(utilisateur.value['mission'].id, utilisateur.value['mission'].nom, utilisateur.value['mission'].perimetre,utilisateur.value['mission'].objectifs,
    utilisateur.value['mission'].debut,utilisateur.value['mission'].fin,tab,utilisateur.value['mission'].observations,utilisateur.value['mission'].cabinet,utilisateur.value['mission'].equipe_audit);
    setTimeout(() => {
      this.getall()
    }, 1000);}
    else if(utilisateur.value['mission'].nom_organe != null){
      this.mission.update_mission_organe(utilisateur.value['mission'].id, utilisateur.value['mission'].nom, utilisateur.value['mission'].perimetre,utilisateur.value['mission'].objectifs,
      utilisateur.value['mission'].debut,utilisateur.value['mission'].fin,tab,utilisateur.value['mission'].observations,utilisateur.value['mission'].nom_organe,utilisateur.value['mission'].equipe_audit);
      setTimeout(() => {
        this.getall()
      }, 1000);

    }else{
      this.mission.update_mission_interne(utilisateur.value['mission'].id, utilisateur.value['mission'].nom, utilisateur.value['mission'].perimetre,utilisateur.value['mission'].objectifs,
      utilisateur.value['mission'].debut,utilisateur.value['mission'].fin,tab,utilisateur.value['mission'].observations,utilisateur.value['mission'].equipe_audit);
      setTimeout(() => {
        this.getall()
      }, 1000);

    }
  }
  ///////////Edit utilisateur//////////////
  edit_recommendation(utilisateur: NgForm) {
    this.id = this.id;

    if (utilisateur.value['status'] == "en cours") {
      utilisateur.value['status'] = "en_cours";
    } else if (utilisateur.value['status'] == "mise en oeuvre") {
      utilisateur.value['status'] = "mise_en_oeuvre";
    } else if (utilisateur.value['status'] == "non mise en oeuvre") {
      utilisateur.value['status'] = "non_mise_en_oeuvre";
    } else if (utilisateur.value['status'] == "obsoléte") {
      utilisateur.value['status'] = "obsolete";
    }
    if (utilisateur.value['priority'] == 1) {
      utilisateur.value['priority'] == "Priority_1"
    } else if (utilisateur.value['priority'] == 2) {
      utilisateur.value['priority'] == "Priority_2"
    } else if (utilisateur.value['priority'] == 3) {
      utilisateur.value['priority'] == "Priority_3"
    }


    this.recommendations.update_recommendation(this.id, utilisateur.value['intitule'], utilisateur.value['previsionelle'], utilisateur.value['reele']==''? null:utilisateur.value['reele'] ,utilisateur.value['responsable'], utilisateur.value['status'],
      utilisateur.value['priority'],utilisateur.value['domaine'] == '' ?this.domaine_val : utilisateur.value['domaine'] ,utilisateur.value['taux']);
    setTimeout(() => {
      this.getall();
    }, 1000);

  }
  ////////Delete utilisateur//////////////
  delete_utilisateur(id) {
    this.confirm = confirm("voulez-vous bien supprimer cette recommendation")
    if (this.confirm) {
      this.recommendations.delete_recommendation(id).subscribe(
        (solve) => {
          setTimeout(() => {
            this.getall();
          }, 1000);
        },
        (error) => {
          this.displaydelete = true;
        }
      );
    }

  }
  ///////////Search Utilisateur////////////////
  search_reco_name() {
    if (this.search_recommendation == "") {
      this.getall();
    }
    else {
      this.recommendations.get_recommendation_name(this.search_recommendation).subscribe(
        (response) => {
          this.recommendation = response;
          for (let u of this.recommendation) {
            if (u.priority == "Priority_1") {
              u.priority = 1
            } else if (u.priority == "Priority_2") {
              u.priority = 2
            } else if (u.priority == "Priority_3") {
              u.priority = 3
            }
          }
          for (let u of this.recommendation) {
            if (u.status == "en_cours") {
              u.status = "en cours"
            } else if (u.status == "mise_en_oeuvre") {
              u.status = "mise en oeuvre"
            } else if (u.status == "non_mise_en_oeuvre") {
              u.status = "non mise en oeuvre"
            } else if (u.status == "obsolete") {
              u.status = "obsoléte"
            }
          }
          if (this.recommendation.length == 0) {
            this.getall();
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
