import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Medicament } from '../model/model-medicament';
import { Types } from '../model/types.model';
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
  tab_types: string[] = [];
  types: Types[] = [];

  typeChoisi: string = '';
  rechercheNom: string = '';
  recherchePipe: string = '';
  typeRecherche: string = '';

  constructor(private p: Pharmacie, public auth: Auth, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.chargerMedicaments();
    this.chargerTypes();

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

  chargerTypes() {
    this.p.listeTypes().subscribe({
      next: (res) => {
        this.types = res._embedded?.types || res._embedded?.categories || [];
        this.tab_types = this.types.map(t => t.nomTypes || t.nomCat || t.nomType || '');
      },
      error: (err) => console.log('Erreur chargement types :', err)
    });
  }

  onTypeRechercheChange() {
    this.typeChoisi = '';
    this.rechercheNom = '';
    this.recherchePipe = '';
    this.tab_filtre = this.tab_medicament;
  }

  choisirType(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.typeChoisi = val;
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
      const typeObj = m.type || m.types || m.categorie;
      const typeName = typeof typeObj === 'object' && typeObj ? (typeObj.nomTypes || typeObj.nomCat || typeObj.nomType) : typeObj;
      const matchType = this.typeChoisi === '' || typeName === this.typeChoisi;
      const matchNom = nom.includes(texte);
      return matchType && matchNom;
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
