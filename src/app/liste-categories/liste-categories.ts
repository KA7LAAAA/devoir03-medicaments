import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Categorie } from '../model/categorie.model';
import { Pharmacie } from '../services/pharmacie';
import { UpdateCategorieComponent } from '../update-categorie/update-categorie';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-liste-categories',
  imports: [CommonModule, UpdateCategorieComponent],
  templateUrl: './liste-categories.html',
  styleUrl: './liste-categories.css'
})
export class ListeCategoriesComponent implements OnInit {
  categories!: Categorie[];
  updatedCat: Categorie = { "idCat": 0, "nomCat": "" };
  ajout: boolean = true;

  constructor(private pharmacie: Pharmacie, public auth: Auth) { }

  ngOnInit(): void {
    this.chargerCategories();
  }

  chargerCategories() {
    this.categories = this.pharmacie.listeCategories();
  }

  categorieUpdated(cat: Categorie) {
    console.log("Cat updated event", cat);
    if (this.ajout) {
      this.pharmacie.ajouterCategorie({ ...cat });
    } else {
      this.pharmacie.updateCategorie({ ...cat });
    }
    this.chargerCategories();
    // Réinitialiser le formulaire
    this.updatedCat = { "idCat": 0, "nomCat": "" };
    this.ajout = true;
  }

  updateCat(cat: Categorie) {
    this.updatedCat = { ...cat };
    this.ajout = false;
  }

  supprimerCat(cat: Categorie) {
    if (confirm("Supprimer la catégorie " + cat.nomCat + " ?")) {
      this.pharmacie.supprimerCategorie(cat);
      this.chargerCategories();
    }
  }
}
