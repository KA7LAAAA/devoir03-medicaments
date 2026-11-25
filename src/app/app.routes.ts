import { Routes } from '@angular/router';
import { Medicaments } from './medicaments/medicaments';
import { AddMedicament } from './add-medicament/add-medicament';
import { Login } from './login/login';
import { ListeTypesComponent } from './liste-types/liste-types';
import { medicamentGuard } from './guards/medicament.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'medicaments' },
  { path: 'medicaments', title: 'Liste des médicaments', component: Medicaments },
  { path: 'listeTypes', title: 'Gestion des types', component: ListeTypesComponent },
  { path: 'listeCategories', redirectTo: 'listeTypes' },
  { path: 'add-medicament', title: "Ajout d'un médicament", component: AddMedicament, canActivate: [medicamentGuard] },
  { path: 'add-medicament/:id', title: "Modification d'un médicament", component: AddMedicament, canActivate: [medicamentGuard] },
  { path: 'login', title: 'Connexion', component: Login }
];
