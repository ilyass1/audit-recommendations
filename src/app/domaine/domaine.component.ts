import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { domaine_data } from '../services/domaine';

@Component({
  selector: 'app-domaine',
  templateUrl: './domaine.component.html',
  styleUrls: ['./domaine.component.css']
})
export class DomaineComponent implements OnInit {
  search_domaine: string; domaines: any[]; name; id; confirm; disable = true; edit_name;
  r_encours:any[];r_obsolete:any[];r_n_enoeuvre:any[];r_enoeuvre:any[];domaine_names=new Array();
  constructor(private domaine: domaine_data) { }

  ngOnInit() {
    this.show_all();
    
  }
   ////////// get recommendations List By status///////////////
  

  check_name_edit() {
    if (this.edit_name != '') {
      this.disable = false
    } else {
      this.disable = true
    }
  }
  ///////// get domaines List../////////////////
  show_all() {
    this.domaine.get_domaine().subscribe(
      (response) => {
        this.domaine_names =[]
        this.domaines = response;
       
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    )
  }

  display_add: boolean = false;
  display_edit: boolean = false;
  displaynorecords: boolean = false;
  displaydelete: boolean = false;

  //////// edit popup////////////
  showDialog_edit(domaine) {
    this.display_edit = true;
    this.id = domaine.id;
    this.name = domaine.nom;
  }
  //////// add popup////////
  showDialog_add() {
    this.display_add = true;
  }
  /////// add domaine/////////////
  add_domaine(domaine: NgForm) {
    this.domaine.add_domaine(domaine.value['name'])
    setTimeout(() => {
      this.show_all()
    }, 1000);
  }
 /////// edit domaine/////////////
  edit_domaine(domaineedit: NgForm) {
    this.id = this.id;
    this.domaine.update_domaine(this.id,domaineedit.value['nom']);
    setTimeout(() => {
      this.show_all();
    }, 1000);

  }
   /////// delete domaine/////////////
  delete_domaine(id) {
    this.confirm = confirm("voulez-vous bien supprimer ce domaine")
    if (this.confirm) {
      this.domaine.delete_domaine(id).subscribe(
        (solve) => {
          setTimeout(() => {
            this.show_all();
          }, 1000);
        },
        (error) => {
          this.displaydelete = true;
        }
      );
    }

  }
//////// search domaine//////////
  search_domaine_name() {
    if (this.search_domaine == "") {
      this.show_all();
    }
    else {
      this.domaine.get_domaine_name(this.search_domaine).subscribe(
        (response) => {
          this.domaines = response;
          if (this.domaines.length == 0) {
            this.show_all();
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
