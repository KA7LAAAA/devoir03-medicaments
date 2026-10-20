import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Medicament } from '../model/model-medicament';
import { Pharmacie } from '../services/pharmacie';
import { FiltreNomPipe } from '../pipes/filtre-nom-pipe';

@Component({
  selector: 'app-medicaments',
  imports: [CommonModule, RouterLink, FormsModule, FiltreNomPipe],
  templateUrl: './medicaments.html',
  styleUrl: './medicaments.css'
})
export class Medicaments {
  tab_medicament: Medicament[];     // toutes les données (celles du service)
  tab_filtre: Medicament[];         // données affichées
  tab_categorie: string[];          // catégories pour la liste déroulante

  categorieChoisie: string = '';    // '' = toutes les catégories
  rechercheNom: string = '';        // recherche avec keyup
  recherchePipe: string = '';       // recherche avec le pipe

  constructor(private p: Pharmacie) {
    this.tab_medicament = p.listMedicaments();
    this.tab_categorie = [...new Set(this.tab_medicament.map(m => m.categorie))];
    this.tab_filtre = this.tab_medicament;
  }

  // Session 87 : recherche par catégorie
  choisirCategorie(event: Event) {
    this.categorieChoisie = (event.target as HTMLSelectElement).value;
    this.appliquerFiltres();
  }

  // Session 89 (keyup) : recherche par nom
  rechercherNom(event: Event) {
    this.rechercheNom = (event.target as HTMLInputElement).value;
    this.appliquerFiltres();
  }

  appliquerFiltres() {
    const texte = this.rechercheNom.toLowerCase().trim();
    this.tab_filtre = this.tab_medicament.filter(m =>
      (this.categorieChoisie === '' || m.categorie === this.categorieChoisie) &&
      m.nom.toLowerCase().includes(texte)
    );
  }

  convertPrix(m: number): string {
    const dt = Math.floor(m / 1000);
    const mill = m % 1000;
    return `${dt} DT ${mill} mill`;
  }

  supprimer(m: Medicament) {
    if (confirm("Supprimer le médicament " + m.nom + " ?")) {
      this.p.delMedicament(m);
      this.appliquerFiltres();   // rafraîchir la liste affichée
    }
  }
}