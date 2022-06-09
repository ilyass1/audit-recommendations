import { Component, OnInit } from '@angular/core';
import { structure_data } from '../services/structure';
import {NgForm }  from '@angular/forms'
@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css']
})
export class StructureComponent implements OnInit {
  search_strcuture:string ; structures: any[]; name; id; confirm; disable = true; edit_name;
  _names=new Array();
  constructor(private structure:structure_data) { }

  ngOnInit() {
  this.show_all()
  }
  
  check_name_edit() {
    if (this.edit_name != '') {
      this.disable = false
    } else {
      this.disable = true
    }
  }
  ///////// get domaines List../////////////////
  show_all() {
    this.structure.get_structure().subscribe(
      (response) => {
        this.structures = response;
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
  showDialog_edit(structure) {
    this.display_edit = true;
    this.id = structure.id;
    this.name = structure.nom;
  }
  //////// add popup////////
  showDialog_add() {
    this.display_add = true;
  }
  /////// add domaine/////////////
  add_structure(structure: NgForm) {
    this.structure.add_structure(structure.value['name'])
    setTimeout(() => {
      this.show_all()
    }, 1000);
  }
 /////// edit domaine/////////////
  edit_structure(structure: NgForm) {
    this.id = this.id;
    this.structure.update_structure(this.id,structure.value['nom']);
    setTimeout(() => {
      this.show_all();
    }, 1000);

  }
   /////// delete domaine/////////////
  delete_structure(id) {
    this.confirm = confirm("voulez-vous bien supprimer cette structure")
    if (this.confirm) {
      this.structure.delete_structure(id).subscribe(
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
  search_strcuture_name() {
    if (this.search_strcuture == "") {
      this.show_all();
    }
    else {
      this.structure.get_strcuture_name(this.search_strcuture).subscribe(
        (response) => {
          this.structures = response;
          if (this.structures.length == 0) {
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

