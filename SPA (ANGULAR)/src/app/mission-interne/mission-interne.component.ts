import { Component, OnInit } from "@angular/core";
import { mission_data } from "../services/mission";
import { recommendation_data } from "../services/recommendation";
import { domaine_data } from "../services/domaine";
import { NgForm } from "@angular/forms";
@Component({
  selector: "app-mission-interne",
  templateUrl: "./mission-interne.component.html",
  styleUrls: ["./mission-interne.component.css"],
})
export class MissionInterneComponent implements OnInit {
  mission_internes;
  reco;
  perimetre;
  domaines;
  id;
  search_mission;
  nom;
  equipe;
  objectifs;
  observations;
  auditeur;
  debut;
  fin;
  confirm;
  recommendations;
  constructor(
    private mission_interne: mission_data,
    private recommendation: recommendation_data,
    private domaine: domaine_data
  ) {}

  ngOnInit() {
    this.get_all();
    this.get_domaines();
    this.get_auditeur();
  }
  /////////////////////////////////////////////
  get_all() {
    this.mission_interne.get_mission_interne().subscribe(
      (response) => {
        this.mission_internes = response;
      },
      (error) => {}
    );
  }
  ///////////////////////////////////////////
  get_reco() {
    this.recommendation.get_recommendation().subscribe(
      (response) => {
        this.recommendations = response;
      },
      (error) => {}
    );
  }
  /////////////////////////////////////////////
  get_domaines() {
    this.domaine.get_domaine().subscribe(
      (response) => {
        this.domaines = response;
      },
      (error) => {}
    );
  }
  /////////////////////////////////////////////
  get_auditeur() {
    this.mission_interne.get_auditeur().subscribe(
      (response) => {
        this.auditeur = response;
      },
      (error) => {}
    );
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
    this.fin = utilisateur.fin;
    this.equipe = utilisateur.equipe_audit;
    this.reco = utilisateur.recommendations;
    this.perimetre = utilisateur.perimetre;
    this.objectifs = utilisateur.objectifs;
    this.observations = utilisateur.observations;
  }
  ////////// Add Utilisateur////////////
  add_mission(utilisateur: NgForm) {
    this.mission_interne.add_mission_interne(
      utilisateur.value["nom"],
      utilisateur.value["perimetre"],
      utilisateur.value["objectifs"],
      utilisateur.value["debut"],
      utilisateur.value["fin"],
      utilisateur.value["observations"],
      utilisateur.value["equipe"]
    );
    setTimeout(() => {
      this.get_all();
    }, 1000);
  }
  ///////////Edit utilisateur//////////////
  edit_mission(utilisateur: NgForm) {
    this.id = this.id;
    this.mission_interne.update_mission_interne(
      this.id,
      utilisateur.value["nom"],
      utilisateur.value["perimetre"],
      utilisateur.value["objectifs"],
      utilisateur.value["debut"],
      utilisateur.value["fin"],
      utilisateur.value["reco"],
      utilisateur.value["observations"],
      utilisateur.value["equipe"]
    );
    setTimeout(() => {
      this.get_all();
    }, 1000);
  }
  ////////Delete utilisateur//////////////
  delete_utilisateur(id) {
    this.confirm = confirm("voulez-vous bien supprimer ce cet utilisateur");
    if (this.confirm) {
      this.mission_interne.delete_mission_interne(id).subscribe(
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
    } else {
      this.mission_interne
        .get_mission_interne_name(this.search_mission)
        .subscribe(
          (response) => {
            this.mission_internes = response;

            if (this.mission_internes.length == 0) {
              this.get_all();
              this.displaynorecords = true;
            }
          },
          (error) => {
            console.log("Erreur ! : " + error);
          }
        );
    }
  }
}
