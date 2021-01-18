import { Component, OnInit } from '@angular/core';
import { utilisateur_data } from '../services/utilisateur';
import { domaine_data } from '../services/domaine';
import { structure_data } from '../services/structure';
import { recommendation_data } from '../services/recommendation';
import { mission_data } from '../services/mission';
import { Globals } from "../services/globals";
import * as moment from 'moment';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit {
  domaine;data1: any; data2: any;data6; utilisateurs: any[]; missions_interne: any[]; missions_externe: any[]; missions_organe: any[]; recommendations: any[]; domaines: any[]; structures: any[];
  mise_en_oeuvre: number = 0; non_mise_en_oeuvre: number = 0; en_cours: number = 0; obsolete: number = 0; chartOptions: any; data3: any; data4: any; data5: any;
  mi_i_en = 0; mi_i_nm = 0; mi_i_m = 0; mi_i_o = 0; mi_e_en = 0; mi_e_nm = 0; mi_e_m = 0; mi_e_o = 0; mi_o_en = 0; mi_o_nm = 0; mi_o_m = 0; mi_o_o = 0
  c_1_en = 0; c_1_n_m = 0; c_1_o = 0; c_1_m = 0; c_2_en = 0; c_2_n_m = 0; c_2_o = 0; c_2_m = 0; c_3_en = 0; c_3_n_m = 0; c_3_o = 0; c_3_m = 0;
  r_encours:any[];r_obsolete:any[];r_n_enoeuvre:any[];r_enoeuvre:any[];data7;data8;data9;dataset_en;dataset_o;dataset_nm;dataset_m;backgroundColor: any;
  auditeur;responsable_o;responsable_audit;count=0;
  constructor(private u: utilisateur_data, private d: domaine_data, private s: structure_data, private r: recommendation_data,
    private m: mission_data,private messageService: MessageService,private c:Globals) {
        
  }

  ngOnInit() {
   this.u.get_auditeur().subscribe(
     (response)=>{
       this.auditeur = response
     },
     (error)=>{}
   )
   this.u.get_responsable().subscribe(
    (response)=>{
      this.responsable_o = response
    },
    (error)=>{}
  )
  this.u.get_res().subscribe(
    (response)=>{
      this.responsable_audit = response
    },
    (error)=>{}
  )

    this.u.get_utilisateur().subscribe(
      (response) => {
        this.utilisateurs = response;
        for (let u of this.utilisateurs) {
          if (u.type == "Responsable_audit") {
            u.type = "Responsable d'audit"
          } else if (u.type == "Auditeur_interne") {
            u.type = "Auditeur interne"
          } else if (u.type == "Responsable_opérationel") {
            u.type = "Responsable opérationel"
          }
        }
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    )
    this.s.get_structure().subscribe(
      (response) => {
        this.structures = response;
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    )
    this.d.get_domaine().subscribe(
      (response) => {
        this.domaines = response;
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    )
    this.r.get_recommendation().subscribe(
      (response) => {
        this.recommendations = response;
        for (let reco of this.recommendations) {
         if(moment(reco.mise_en_place_previsionnelle).subtract(15,'days').format("YYYY-MM-DD") == moment().format("YYYY-MM-DD") && reco.status =="en_cours"){
         if(this.c.count < 2 ){
         
          this.c.count ++;
         this.messageService.add({key:'key1', severity:'warn', summary: 'Il reste 15 jours avant la mise en place de la recommendation "'+reco.intitule+'"',life:6000});
         }
         }else if(moment(reco.mise_en_place_previsionnelle).format("YYYY-MM-DD")== moment().format("YYYY-MM-DD") && reco.status =="en_cours"){
          this.messageService.add({key: 'key1', severity:'error', summary: "Date previsionnelle pour mettre en place la recommendation '"+reco.intitule+"'",life:8000});
         }
          if (reco.status == "mise_en_oeuvre") {
            this.mise_en_oeuvre++
          } else if (reco.status == "non_mise_en_oeuvre") {
            this.non_mise_en_oeuvre++
          } else if (reco.status == "en_cours") { this.en_cours++ }
          else if (reco.status == "obsolete") {
            this.obsolete++
          }
        }
        for (let u of this.recommendations) {
          if (u.priority == "Priority_1") {
            u.priority = 1
          } else if (u.priority == "Priority_2") {
            u.priority = 2
          } else if (u.priority == "Priority_3") {
            u.priority = 3
          }
        }
        for (let u of this.recommendations) {
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
        

        this.calculate_data6();
        

      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    )

    this.m.get_mission_interne().subscribe(
      (response) => {
        this.missions_interne = response;
        this.calulate_m_i()
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    )
    this.m.get_mission_externe().subscribe(
      (response) => {
        this.missions_externe = response;
        this.calulate_m_e()
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    )
    this.m.get_mission_organe().subscribe(
      (response) => {
        this.missions_organe = response;
        this.calulate_m_o()

      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    )
    for(let w  in this.r_encours){

    }



    setTimeout(() => {
      this.data1 = {
        labels: ["total"],
        datasets: [
          {
            label: "Mission d'audit interne",
            backgroundColor: '#FF6384',
            borderColor: '#FF6384',
            data: [this.missions_interne.length]
          },
          {
            label: "Mission d'audit externe",
            backgroundColor: '#36A2EB',
            borderColor: '#36A2EB',
            data: [this.missions_externe.length]
          },
          {
            label: "Mission d’un autre organe de contrôle externe ",
            backgroundColor: '#FFCE56',
            borderColor: '#FFCE56',
            data: [this.missions_organe.length]
          }
        ]
      }
      this.chartOptions = {
        scales: {
          yAxes: [{
            ticks: {
              stepSize: 1,
              beginAtZero: true
            }
          }]
        }

      }
      //////////--------------------------/////////
      this.data2 = {
        labels: ['Recommendation mise en œuvre', ' Recommendation en cours', ' Recommendation non mise en œuvre', ' Recommendation obsolète'],
        datasets: [
          {

            data: [this.mise_en_oeuvre, this.en_cours, this.non_mise_en_oeuvre, this.obsolete],
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",

            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56"
            ]
          }]
      };
      //////////--------------------------/////////


      this.data3 = {

        datasets: [
          {
            label: "Mise en oeuvre",
            backgroundColor: '#FF6384',
            borderColor: '#FF6384',
            data: [this.mi_i_m]
          },
          {
            label: " Non mise en oeuvre",
            backgroundColor: '#36A2EB',
            borderColor: '#36A2EB',
            data: [this.mi_i_nm]
          },
          {
            label: "En cours",
            backgroundColor: '#FFCE56',
            borderColor: '#FFCE56',
            data: [this.mi_i_en]
          },
          {
            label: "Obsoléte",
            backgroundColor: 'lightgrey',
            borderColor: 'lightgrey',
            data: [this.mi_i_o]
          }
        ]
      }
      
      //////////--------------------------/////////
      this.data4 = {

        datasets: [
          {
            label: "Mise en oeuvre",
            backgroundColor: '#FF6384',
            borderColor: '#FF6384',
            data: [this.mi_e_m]
          },
          {
            label: " Non mise en oeuvre",
            backgroundColor: '#36A2EB',
            borderColor: '#36A2EB',
            data: [this.mi_e_nm]
          },
          {
            label: "En cours",
            backgroundColor: '#FFCE56',
            borderColor: '#FFCE56',
            data: [this.mi_e_en]
          },
          {
            label: "Obsoléte",
            backgroundColor: 'lightgrey',
            borderColor: 'lightgrey',
            data: [this.mi_e_o]
          }
        ]
      }
     
      //////////--------------------------/////////
      this.data5 = {

        datasets: [
          {
            label: "Mise en oeuvre",
            backgroundColor: '#FF6384',
            borderColor: '#FF6384',
            data: [this.mi_o_m]
          },
          {
            label: " Non mise en oeuvre",
            backgroundColor: '#36A2EB',
            borderColor: '#36A2EB',
            data: [this.mi_o_nm]
          },
          {
            label: "En cours",
            backgroundColor: '#FFCE56',
            borderColor: '#FFCE56',
            data: [this.mi_o_en]
          },
          {
            label: "Obsoléte",
            backgroundColor: 'lightgrey',
            borderColor: 'lightgrey',
            data: [this.mi_o_o]
          }
        ]
      }
    ////////////////////////////
      this.data6 = {
        labels: ['Priorité 1', 'Priorité 2', 'Priorité 3'],
        datasets: [
            {
                label: 'En Cours',
                backgroundColor: '#FFCE56',
                borderColor: '#FFCE56',
                data: [this.c_1_en,this.c_2_en,this.c_3_en]
            },
            {
                label: 'Mise en oeuvre',
                backgroundColor: '#FF6384',
                borderColor: '#FF6384',
                data: [this.c_1_m,this.c_2_m,this.c_3_m]
            },
            {
              label: 'Obsolète',
              backgroundColor: 'lightgrey',
              borderColor: 'lightgrey',
              data: [this.c_1_o,this.c_2_o,this.c_3_o]
          },
          {
            label: 'Non Mise en oeuvre',
            backgroundColor: '#36A2EB',
            borderColor: '#36A2EB',
            data: [this.c_1_n_m,this.c_2_n_m,this.c_3_n_m]
        }
        ]
    }
    
    }, 2000)
////////////////////////////////
    

  }

 

  calculate_data6() {
    for (let y of this.recommendations) {
      if (y.priority == 1 && y.status == 'en cours') {
        this.c_1_en++
      }
      if (y.priority == 1 && y.status == 'obsoléte') {
        this.c_1_o++
      }
      if (y.priority == 1 && y.status == 'non mise en oeuvre') {
        this.c_1_n_m++
      }
      if (y.priority == 1 && y.status == 'mise en oeuvre') {
        this.c_1_m++
      }
      ///////
      if (y.priority == 2 && y.status == 'en cours') {
        this.c_2_en++
      }
      if (y.priority == 2 && y.status == 'obsoléte') {
        this.c_2_o++
      }
      if (y.priority == 2 && y.status == 'non mise en oeuvre') {
        this.c_2_n_m++
      }
      if (y.priority == 2 && y.status == 'mise en oeuvre') {
        this.c_2_m++
      }
      //////////
      if (y.priority == 3 && y.status == 'en cours') {
        this.c_3_en++
      }
      if (y.priority == 3 && y.status == 'obsoléte') {
        this.c_3_o++
      }
      if (y.priority == 3 && y.status == 'non mise en oeuvre') {
        this.c_3_n_m++
      }
      if (y.priority == 3 && y.status == 'mise en oeuvre') {
        this.c_3_m++
      }
    
    }
  }
  
calulate_m_i() {
    for (let mi_i of this.missions_interne) {
      for (let mi_i_r of mi_i.recommendations) {
        if (mi_i_r.status == "en_cours") {
          this.mi_i_en++
        }
        else if (mi_i_r.status == "non_mise_en_oeuvre") {
          this.mi_i_nm++
        }
        else if (mi_i_r.status == "obsolete") {
          this.mi_i_o++
        } else if (mi_i_r.status == "mise_en_oeuvre") {
          this.mi_i_m++
        }
      }

    }
  }
  calulate_m_e() {
    for (let mi_e of this.missions_externe) {
      for (let mi_e_r of mi_e.recommendations) {
        if (mi_e_r.status == "en_cours") {
          this.mi_e_en++
        }
        else if (mi_e_r.status == "non_mise_en_oeuvre") {
          this.mi_e_nm++
        }
        else if (mi_e_r.status == "obsolete") {
          this.mi_e_o++
        } else if (mi_e_r.status == "mise_en_oeuvre") {
          this.mi_e_m++
        }
      }

    }
  }
  calulate_m_o() {
    for (let mi_o of this.missions_organe) {
      for (let mi_o_r of mi_o.recommendations) {
        if (mi_o_r.status == "en_cours") {
          this.mi_o_en++
        }
        else if (mi_o_r.status == "non_mise_en_oeuvre") {
          this.mi_o_nm++
        }
        else if (mi_o_r.status == "obsolete") {
          this.mi_o_o++
        } else if (mi_o_r.status == "mise_en_oeuvre") {
          this.mi_o_m++
        }
      }

    }
  }
  //////////////////////////////////////////////////////////////////////

}

