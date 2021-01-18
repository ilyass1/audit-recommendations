import { Component, OnInit } from '@angular/core';
import { utilisateur_data } from '../services/utilisateur';
import { domaine_data } from '../services/domaine';
import { NgForm } from '@angular/forms';
import { structure_data } from '../services/structure';
import { SelectItem } from 'primeng/api';
@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
  utilisateur:any[]; search_utilisateur; id; structure; value;
  nom; prenom; type; confirm; types = ['Responsable d\'audit', 'Auditeur interne', 'Responsable opérationel']


  constructor(private utilisateurs: utilisateur_data, private structures: structure_data) { }

  ngOnInit() {
    this.get_all_structure();
    this.getall();

  }
////////get Utilisateur List//////////////
  getall() {
    this.utilisateurs.get_utilisateur().subscribe(
      (Response) => {
        this.utilisateur = Response;
        for (let u of this.utilisateur) {
          if (u.type == "Responsable_audit") {
            u.type = "Responsable d'audit"
          } else if (u.type == "Auditeur_interne") {
            u.type = "Auditeur interne"
          } else if (u.type == "Responsable_opérationel") {
            u.type = "Responsable opérationel"
          }
        }
        for(let u of this.utilisateur){
          if(u.structure == null){
            u.structure = ""
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
  get_all_structure() {
    this.structures.get_structure().subscribe(
      (response) => {
        this.structure = response;

      },
      (error) => {

      }
    )

  }
  //////// add utilisateur popup////////////
  showDialog_add() {
    this.display_add = true;
  }
  ///////// edit utilisateur popup///////////
  showDialog_edit(utilisateur) {
    this.display_edit = true;
    this.id = utilisateur.id;
    this.nom = utilisateur.nom;
    this.prenom = utilisateur.prenom;
    this.type = utilisateur.type;
    this.value = utilisateur.structure.nom;
  
  }
  ////////// Add Utilisateur////////////
  add_utilisateur(utilisateur: NgForm) {
    this.utilisateurs.add_utilisateur(utilisateur.value['nom'], utilisateur.value['prenom'], utilisateur.value['type'], utilisateur.value['value'].id, utilisateur.value['value'].nom)
    setTimeout(() => {
      this.getall()
    }, 1000);
  }
///////////Edit utilisateur//////////////
  edit_utilisateur(utilisateur: NgForm) {
    this.id = this.id;
    if (utilisateur.value['type'] == "Auditeur interne") {
      utilisateur.value['type'] = "Auditeur_interne"
    } else if (utilisateur.value['type'] == "Responsable d'audit") {
      utilisateur.value['type'] = "Responsable_audit"
    } else if (utilisateur.value['type'] == "Responsable opérationel") {
      utilisateur.value['type'] = "Responsable_opérationel"
    }
    this.utilisateurs.update_utilisateur(this.id, utilisateur.value['nom'], utilisateur.value['prenom'], utilisateur.value['type'], utilisateur.value['value'].id);
    setTimeout(() => {
      this.getall();
    }, 1000);

  }
////////Delete utilisateur//////////////
  delete_utilisateur(id) {
    this.confirm = confirm("voulez-vous bien supprimer ce cet utilisateur")
    if (this.confirm) {
      this.utilisateurs.delete_utilisateur(id).subscribe(
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
  search_utilisateur_name() {
    if (this.search_utilisateur == "") {
      this.getall();
    }
    else {
      this.utilisateurs.get_utilisateur_name(this.search_utilisateur).subscribe(
        (response) => {
          this.utilisateur = response;
          for (let u of this.utilisateur) {
            if (u.type == "Responsable_audit") {
              u.type = "Responsable d'audit"
            } else if (u.type == "Auditeur_interne") {
              u.type = "Auditeur interne"
            } else if (u.type == "Responsable_opérationel") {
              u.type = "Responsable opérationel"
            }}
          if (this.utilisateur.length == 0) {
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
