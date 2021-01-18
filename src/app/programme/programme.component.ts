import { Component, OnInit } from '@angular/core';
import { programme_data } from '../services/programme';
import { NgForm } from "@angular/forms";
import { mission_data } from '../services/mission';

@Component({
  selector: 'app-programme',
  templateUrl: './programme.component.html',
  styleUrls: ['./programme.component.css']
})
export class ProgrammeComponent implements OnInit {
  search_program: string; programs: any[]; name; id; confirm; disable = true; edit_name;
  missions:any[];missions_values;

  constructor(private program:programme_data) { }

  ngOnInit() {
    this.show_all();
    this.get_mission();
  }

  check_name_edit() {
    if (this.edit_name != '') {
      this.disable = false
    } else {
      this.disable = true
    }
  }
  ///////// get programs List../////////////////
  show_all() {
    this.program.get_programme().subscribe(
      (response) => {
        this.programs = response;
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
  error : boolean=false
  ///////////////////get missions list/////////////////////
  get_mission(){
    this.program.get_all_missions().subscribe(
      (Response)=>{
       this.missions = Response;
      },
      (error)=>{
        console.log('Erreur ! : ' + error);
      }
    )
  }
  hide_error(){
     this.error=false;
  }
  ////////////////////////////////////

  //////// edit popup////////////
  showDialog_edit(program) {
    this.display_edit = true;
    this.id =  program.id;
    this.name = program.nom;
    this.missions_values = program.list_missions;
  }
  //////// add popup////////
  showDialog_add() {
    this.display_add = true;
  }
  /////// add domaine/////////////
  add_program(program: NgForm) {
    this.program.add_programme(program.value['name'])
    setTimeout(() => {
      this.show_all()
    }, 1000);
  }
 /////// edit domaine/////////////
  edit_program(program: NgForm) {
    this.id = this.id;
   this.program.update_programme(this.id,program.value['nom'],program.value['list_mission']).subscribe( 
    (solve) => {
    }, 
    (error) => {
      console.log(error)
     this.error=true
    }
  );
   
    setTimeout(() => {
      this.show_all();
    }, 1000);

  }
   /////// delete domaine/////////////
  delete_program(id) {
    this.confirm = confirm("voulez-vous bien supprimer cette structure")
    if (this.confirm) {
      this.program.delete_programme(id).subscribe(
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
  search_program_name() {
    if (this.search_program == "") {
      this.show_all();
    }
    else {
      this.program.get_programme_name(this.search_program).subscribe(
        (response) => {
          this.programs = response;
          if (this.programs.length == 0) {
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
