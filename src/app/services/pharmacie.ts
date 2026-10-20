import { Injectable } from '@angular/core';
import { Medicament } from '../model/model-medicament';

@Injectable({
  providedIn: 'root'
})
export class Pharmacie {
  tab_medicament: Medicament[] = [
    { id: 1, nom: "Doliprane", categorie: "Antalgique",
      dateExpiration: new Date("08/30/2027"), prixMillimes: 2500,
      ordonnance: false, stock: 120 },
    { id: 2, nom: "Amoxicilline", categorie: "Antibiotique",
      dateExpiration: new Date("03/15/2027"), prixMillimes: 7800,
      ordonnance: true, stock: 55 },
    { id: 3, nom: "Ventoline", categorie: "Bronchodilatateur",
      dateExpiration: new Date("11/01/2027"), prixMillimes: 6200,
      ordonnance: true, stock: 35 },
    { id: 4, nom: "Smecta", categorie: "Antidiarrhéique",
      dateExpiration: new Date("05/20/2028"), prixMillimes: 4300,
      ordonnance: false, stock: 60 },
    { id: 5, nom: "Aspegic", categorie: "Antalgique",
      dateExpiration: new Date("01/10/2028"), prixMillimes: 3100,
      ordonnance: false, stock: 80 }
  ];

  listMedicaments(): Medicament[] {
    return this.tab_medicament;
  }

  getMedicament(id: number): Medicament | undefined {
    return this.tab_medicament.find(m => m.id === id);
  }

  nextId(): number {
    return this.tab_medicament.length > 0
      ? Math.max(...this.tab_medicament.map(m => m.id)) + 1
      : 1;
  }

  addMedicament(m: Medicament) {
    this.tab_medicament.push(m);
  }

  updateMedicament(m: Medicament) {
    const pos = this.tab_medicament.findIndex(x => x.id === m.id);
    if (pos !== -1) {
      this.tab_medicament[pos] = m;
    }
  }

  delMedicament(m: Medicament) {
    const pos = this.tab_medicament.indexOf(m);
    if (pos !== -1) {
      this.tab_medicament.splice(pos, 1);
    }
  }
}