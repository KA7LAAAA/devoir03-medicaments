import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Types } from '../model/types.model';
import { Pharmacie } from '../services/pharmacie';
import { UpdateTypesComponent } from '../update-types/update-types';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-liste-types',
  imports: [CommonModule, UpdateTypesComponent],
  templateUrl: './liste-types.html',
  styleUrl: './liste-types.css'
})
export class ListeTypesComponent implements OnInit {
  types: Types[] = [];
  updatedType: Types = { idTypes: 0, nomTypes: '' };
  ajout: boolean = true;

  constructor(private pharmacie: Pharmacie, public auth: Auth) { }

  ngOnInit(): void {
    this.chargerTypes();
  }

  chargerTypes() {
    this.pharmacie.listeTypes().subscribe({
      next: (res) => {
        this.types = res._embedded.types || res._embedded.categories || [];
      },
      error: (err) => console.log('Erreur chargement types :', err)
    });
  }

  typeUpdated(t: Types) {
    console.log("Type updated event", t);
    if (this.ajout) {
      this.pharmacie.ajouterType({ ...t }).subscribe({
        next: () => this.chargerTypes(),
        error: (err) => console.log('Erreur ajout type :', err)
      });
    } else {
      this.pharmacie.updateType({ ...t }).subscribe({
        next: () => this.chargerTypes(),
        error: (err) => console.log('Erreur modification type :', err)
      });
    }
    // Réinitialiser le formulaire
    this.updatedType = { idTypes: 0, nomTypes: '' };
    this.ajout = true;
  }

  updateType(t: Types) {
    this.updatedType = { ...t };
    this.ajout = false;
  }

  supprimerType(t: Types) {
    const nom = t.nomTypes || t.nomType || t.nomCat;
    const id = t.idTypes || t.idType || t.idCat;
    if (confirm("Supprimer le type " + nom + " ?")) {
      this.pharmacie.supprimerType(id!).subscribe({
        next: () => this.chargerTypes(),
        error: (err) => console.log('Erreur suppression type :', err)
      });
    }
  }
}
