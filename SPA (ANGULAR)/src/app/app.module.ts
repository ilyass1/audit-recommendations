import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule, RoutingComponent } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SideNavComponent } from "./side-nav/side-nav.component";
import { DomaineComponent } from "./domaine/domaine.component";
import { StructureComponent } from "./structure/structure.component";
import { UtilisateurComponent } from "./utilisateur/utilisateur.component";
import { ProgrammeComponent } from "./programme/programme.component";
import { RecommendationComponent } from "./recommendation/recommendation.component";
import { FormsModule } from "@angular/forms";
import { ChartModule } from "primeng/chart";
import { HomeComponent } from "./home/home.component";
import { utilisateur_data } from "./services/utilisateur";
import { mission_data } from "./services/mission";
import { programme_data } from "./services/programme";
import { structure_data } from "./services/structure";
import { Globals } from "./services/globals";
import { domaine_data } from "./services/domaine";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SidebarModule } from "primeng/sidebar";
import { DropdownModule } from "primeng/dropdown";
import { recommendation_data } from "./services/recommendation";
import { MissionInterneComponent } from "./mission-interne/mission-interne.component";
import { MissionExterneComponent } from "./mission-externe/mission-externe.component";
import { MissionAutreOrganeComponent } from "./mission-autre-organe/mission-autre-organe.component";
import { SliderModule } from "primeng/slider";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { ProgressBarModule } from "primeng/progressbar";
@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    DomaineComponent,
    StructureComponent,
    UtilisateurComponent,
    ProgrammeComponent,
    RecommendationComponent,
    RoutingComponent,
    HomeComponent,
    MissionInterneComponent,
    MissionExterneComponent,
    MissionAutreOrganeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    BrowserAnimationsModule,
    SidebarModule,
    DropdownModule,
    SliderModule,
    ToastModule,
    ProgressBarModule,
  ],
  providers: [
    utilisateur_data,
    mission_data,
    programme_data,
    structure_data,
    domaine_data,
    recommendation_data,
    MessageService,
    Globals
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
