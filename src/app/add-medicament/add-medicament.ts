import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicament } from '../model/model-medicament';
import { Types } from '../model/types.model';
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
  types: Types[] = [];
  newIdType?: number;

  constructor(
    private p: Pharmacie,
    public auth: Auth,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerTypes();

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
          const t = med.type || med.types || med.categorie;
          if (t && typeof t === 'object') {
            this.newIdType = t.idTypes || t.idType || t.idCat;
          }
        },
        error: (err) => console.log('Erreur chargement medicament :', err)
      });
    } else {
      this.modeModification = false;
      this.newMedicament.ordonnance = false;
    }
  }

  chargerTypes() {
    this.p.listeTypes().subscribe({
      next: (res) => {
        this.types = res._embedded?.types || res._embedded?.categories || [];
        if (!this.modeModification && this.types.length > 0 && !this.newIdType) {
          const premier = this.types[0];
          this.newIdType = premier.idTypes || premier.idType || premier.idCat;
        }
      },
      error: (err) => console.log('Erreur chargement types :', err)
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

    if (this.newIdType) {
      const typeTrouve = this.types.find(t => (t.idTypes || t.idType || t.idCat) == this.newIdType);
      const val = typeTrouve || { idTypes: this.newIdType, nomTypes: '' };
      this.newMedicament.type = val;
      this.newMedicament.types = val;
      this.newMedicament.categorie = val;
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
