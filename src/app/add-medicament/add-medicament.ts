import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicament } from '../model/model-medicament';
import { Pharmacie } from '../services/pharmacie';

@Component({
  selector: 'app-add-medicament',
  imports: [FormsModule],
  templateUrl: './add-medicament.html',
  styleUrl: './add-medicament.css'
})
export class AddMedicament {
  newMedicament: Medicament = new Medicament();
  dateStr: string = '';
  modeModification: boolean = false;
  tab_categorie: string[] = [
    "Antalgique", "Antibiotique", "Anti-inflammatoire",
    "Bronchodilatateur", "Antidiarrhéique", "Vitamine"
  ];

  constructor(private p: Pharmacie, private route: ActivatedRoute, private router: Router) {
    const idParam = this.route.snapshot.paramMap.get('id');
    const existant = idParam ? this.p.getMedicament(Number(idParam)) : undefined;

    if (existant) {
      // mode modification : on travaille sur une copie
      this.modeModification = true;
      this.newMedicament = { ...existant };
      this.dateStr = this.versChaineDate(existant.dateExpiration);
    } else {
      // mode ajout
      this.newMedicament.id = this.p.nextId();
      this.newMedicament.categorie = this.tab_categorie[0];
      this.newMedicament.ordonnance = false;
    }
  }

  versChaineDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const j = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${j}`;
  }

  enregistrer() {
    if (!this.newMedicament.nom || !this.dateStr) {
      alert("Le nom et la date d'expiration sont obligatoires");
      return;
    }
    this.newMedicament.dateExpiration = new Date(this.dateStr + 'T00:00:00');

    if (this.newMedicament.stock == null) {
      delete this.newMedicament.stock;   // stock vide = pas de stock renseigné
    }

    if (this.modeModification) {
      this.p.updateMedicament(this.newMedicament);
    } else {
      this.p.addMedicament(this.newMedicament);
    }
    this.router.navigate(['/medicaments']);
  }
}