import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Medicament } from '../model/model-medicament';
import { Categorie } from '../model/categorie.model';
import { Pharmacie } from '../services/pharmacie';
import { FiltreNomPipe } from '../pipes/filtre-nom-pipe';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-medicaments',
  imports: [CommonModule, RouterLink, FormsModule, FiltreNomPipe],
  templateUrl: './medicaments.html',
  styleUrl: './medicaments.css'
})
export class Medicaments implements OnInit {
  tab_medicament: Medicament[] = [];
  tab_filtre: Medicament[] = [];
  tab_categorie: string[] = [];
  categories: Categorie[] = [];

  categorieChoisie: string = '';
  rechercheNom: string = '';
  recherchePipe: string = '';
  typeRecherche: string = '';

  constructor(private p: Pharmacie, public auth: Auth, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.chargerMedicaments();
    this.chargerCategories();

    this.route.queryParams.subscribe(params => {
      if (params['type']) {
        this.typeRecherche = params['type'];
        this.onTypeRechercheChange();
      }
    });
  }

  chargerMedicaments() {
    this.p.listMedicaments().subscribe({
      next: (meds) => {
        this.tab_medicament = meds;
        this.tab_filtre = meds;
      },
      error: (err) => console.log('Erreur chargement medicaments :', err)
    });
  }

  chargerCategories() {
    this.p.listeCategories().subscribe({
      next: (cats) => {
        this.categories = cats._embedded.categories;
        this.tab_categorie = this.categories.map(c => c.nomCat);
      },
      error: (err) => console.log('Erreur chargement categories :', err)
    });
  }

  onTypeRechercheChange() {
    this.categorieChoisie = '';
    this.rechercheNom = '';
    this.recherchePipe = '';
    this.tab_filtre = this.tab_medicament;
  }

  choisirCategorie(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.categorieChoisie = val;
    this.appliquerFiltres();
  }

  rechercherNom(event: Event) {
    this.rechercheNom = (event.target as HTMLInputElement).value;
    this.appliquerFiltres();
  }

  appliquerFiltres() {
    const texte = this.rechercheNom.toLowerCase().trim();
    this.tab_filtre = this.tab_medicament.filter(m => {
      const nom = (m.nom || m.nomMedicament || '').toLowerCase();
      const catName = typeof m.categorie === 'object' && m.categorie ? m.categorie.nomCat : m.categorie;
      const matchCat = this.categorieChoisie === '' || catName === this.categorieChoisie;
      const matchNom = nom.includes(texte);
      return matchCat && matchNom;
    });
  }

  convertPrix(m: number): string {
    const dt = Math.floor(m / 1000);
    const mill = m % 1000;
    return `${dt} DT ${mill} mill`;
  }

  supprimer(m: Medicament) {
    const nom = m.nom || m.nomMedicament;
    const id = m.id || m.idMedicament;
    if (confirm('Supprimer le médicament ' + nom + ' ?')) {
      this.p.delMedicament(id!).subscribe({
        next: () => this.chargerMedicaments(),
        error: (err) => console.log('Erreur suppression :', err)
      });
    }
  }
}
