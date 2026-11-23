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
  categories: Categorie[] = [];
  updatedCat: Categorie = { "idCat": 0, "nomCat": "" };
  ajout: boolean = true;

  constructor(private pharmacie: Pharmacie, public auth: Auth) { }

  ngOnInit(): void {
    this.chargerCategories();
  }

  chargerCategories() {
    this.pharmacie.listeCategories().subscribe({
      next: (res) => {
        this.categories = res._embedded.categories;
      },
      error: (err) => console.log('Erreur chargement categories :', err)
    });
  }

  categorieUpdated(cat: Categorie) {
    console.log("Cat updated event", cat);
    if (this.ajout) {
      this.pharmacie.ajouterCategorie({ ...cat }).subscribe({
        next: () => this.chargerCategories(),
        error: (err) => console.log('Erreur ajout categorie :', err)
      });
    } else {
      this.pharmacie.updateCategorie({ ...cat }).subscribe({
        next: () => this.chargerCategories(),
        error: (err) => console.log('Erreur modification categorie :', err)
      });
    }
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
      this.pharmacie.supprimerCategorie(cat.idCat).subscribe({
        next: () => this.chargerCategories(),
        error: (err) => console.log('Erreur suppression categorie :', err)
      });
    }
  }
}
