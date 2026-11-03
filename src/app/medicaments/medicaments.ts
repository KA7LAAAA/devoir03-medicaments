import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
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
  tab_medicament: Medicament[];
  tab_filtre: Medicament[];
  tab_categorie: string[];

  categorieChoisie: string = '';
  rechercheNom: string = '';    // recherche avec keyup
  recherchePipe: string = '';   // recherche avec le pipe

  // type reçu depuis le menu via query param : 'types' | 'keyup' | 'pipe' | ''
  typeRecherche: string = '';

  constructor(private p: Pharmacie, private route: ActivatedRoute) {
    this.tab_medicament = p.listMedicaments();
    this.tab_categorie = [...new Set(this.tab_medicament.map(m => m.categorie))];
    this.tab_filtre = this.tab_medicament;

    // Écouter les changements de query params (quand on choisit dans le menu)
    this.route.queryParams.subscribe(params => {
      this.typeRecherche = params['type'] ?? '';
      // Réinitialiser les filtres à chaque changement de type
      this.categorieChoisie = '';
      this.rechercheNom = '';
      this.recherchePipe = '';
      this.tab_filtre = this.tab_medicament;
    });
  }

  // Recherche par catégorie
  choisirCategorie(event: Event) {
    this.categorieChoisie = (event.target as HTMLSelectElement).value;
    this.appliquerFiltres();
  }

  // Recherche par nom (keyup)
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
    if (confirm('Supprimer le médicament ' + m.nom + ' ?')) {
      this.p.delMedicament(m);
      this.appliquerFiltres();
    }
  }
}
