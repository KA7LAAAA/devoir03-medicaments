import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicament } from '../model/model-medicament';
import { Categorie } from '../model/categorie.model';
import { Pharmacie } from '../services/pharmacie';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-add-medicament',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-medicament.html',
  styleUrl: './add-medicament.css'
})
export class AddMedicament implements OnInit {
  newMedicament: Medicament = new Medicament();
  dateStr: string = '';
  modeModification: boolean = false;
  categories: Categorie[] = [];
  newIdCat?: number;

  constructor(
    private p: Pharmacie,
    public auth: Auth,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerCategories();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modeModification = true;
      this.p.getMedicament(Number(idParam)).subscribe({
        next: (med) => {
          this.newMedicament = med;
          this.newMedicament.id = med.id || med.idMedicament!;
          this.newMedicament.nom = med.nom || med.nomMedicament!;
          this.newMedicament.prixMillimes = med.prixMillimes || med.prixMedicament || 0;

          if (med.dateExpiration) {
            const d = new Date(med.dateExpiration);
            this.dateStr = this.versChaineDate(d);
          }
          if (med.categorie && typeof med.categorie === 'object') {
            this.newIdCat = med.categorie.idCat;
          }
        },
        error: (err) => console.log('Erreur chargement medicament :', err)
      });
    } else {
      this.modeModification = false;
      this.newMedicament.ordonnance = false;
    }
  }

  chargerCategories() {
    this.p.listeCategories().subscribe({
      next: (cats) => {
        this.categories = cats._embedded.categories;
        if (!this.modeModification && this.categories.length > 0 && !this.newIdCat) {
          this.newIdCat = this.categories[0].idCat;
        }
      },
      error: (err) => console.log('Erreur chargement categories :', err)
    });
  }

  versChaineDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const j = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${j}`;
  }

  enregistrer() {
    const nom = this.newMedicament.nom || this.newMedicament.nomMedicament;
    if (!nom || !this.dateStr) {
      alert("Le nom et la date d'expiration sont obligatoires");
      return;
    }

    this.newMedicament.nom = nom;
    this.newMedicament.nomMedicament = nom;
    this.newMedicament.dateExpiration = new Date(this.dateStr + 'T00:00:00');

    const prix = this.newMedicament.prixMillimes || this.newMedicament.prixMedicament || 0;
    this.newMedicament.prixMillimes = prix;
    this.newMedicament.prixMedicament = prix;

    if (this.newIdCat) {
      const catTrouvee = this.categories.find(c => c.idCat == this.newIdCat);
      this.newMedicament.categorie = catTrouvee || { idCat: this.newIdCat, nomCat: '' };
    }

    if (this.newMedicament.stock == null) {
      delete this.newMedicament.stock;
    }

    if (this.modeModification) {
      this.p.updateMedicament(this.newMedicament).subscribe({
        next: () => this.router.navigate(['/medicaments']),
        error: (err) => console.log('Erreur modification medicament :', err)
      });
    } else {
      this.p.addMedicament(this.newMedicament).subscribe({
        next: () => this.router.navigate(['/medicaments']),
        error: (err) => console.log('Erreur ajout medicament :', err)
      });
    }
  }

  annuler() {
    this.router.navigate(['/medicaments']);
  }
}
