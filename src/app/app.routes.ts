import { Routes } from '@angular/router';
import { Medicaments } from './medicaments/medicaments';
import { AddMedicament } from './add-medicament/add-medicament';
import { Login } from './login/login';
import { medicamentGuard } from './guards/medicament.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'medicaments' },
  { path: 'medicaments', title: 'Liste des médicaments', component: Medicaments },
  { path: 'add-medicament', title: "Ajout d'un médicament", component: AddMedicament, canActivate: [medicamentGuard] },
  { path: 'add-medicament/:id', title: "Modification d'un médicament", component: AddMedicament, canActivate: [medicamentGuard] },
  { path: 'login', title: 'Connexion', component: Login }
];
