import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MissionInterneComponent } from "./mission-interne/mission-interne.component";
import { MissionExterneComponent } from "./mission-externe/mission-externe.component";
import { MissionAutreOrganeComponent } from "./mission-autre-organe/mission-autre-organe.component";
import { DomaineComponent } from "./domaine/domaine.component";
import { StructureComponent } from "./structure/structure.component";
import { UtilisateurComponent } from "./utilisateur/utilisateur.component";
import { RecommendationComponent } from "./recommendation/recommendation.component";
import { ProgrammeComponent } from "./programme/programme.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { component: DomaineComponent, path: "domaine" },
  { component: HomeComponent, path: "/" },
  { component: StructureComponent, path: "structure" },
  { component: UtilisateurComponent, path: "utilisateur" },
  { component: RecommendationComponent, path: "recommendation" },
  { component: ProgrammeComponent, path: "programme" },
  { component: MissionInterneComponent, path: "mission interne" },
  { component: MissionExterneComponent, path: "mission externe" },
  { component: MissionAutreOrganeComponent, path: "mission d'autre organe" },
  { path: "", redirectTo: "/", pathMatch: "full" },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
export const RoutingComponent = [
  HomeComponent,
  DomaineComponent,
  StructureComponent,
  UtilisateurComponent,
  RecommendationComponent,
  ProgrammeComponent,
  MissionAutreOrganeComponent,
  MissionExterneComponent,
  MissionInterneComponent,
];
