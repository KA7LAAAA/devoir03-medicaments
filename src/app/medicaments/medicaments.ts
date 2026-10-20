import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Medicament } from '../model/model-medicament';
import { Pharmacie } from '../services/pharmacie';

@Component({
  selector: 'app-medicaments',
  imports: [CommonModule, RouterLink],
  templateUrl: './medicaments.html',
  styleUrl: './medicaments.css'
})
export class Medicaments {
  tab_medicament: Medicament[];

  constructor(private p: Pharmacie) {
    this.tab_medicament = p.listMedicaments();
  }

  convertPrix(m: number): string {
    const dt = Math.floor(m / 1000);
    const mill = m % 1000;
    return `${dt} DT ${mill} mill`;
  }

  supprimer(m: Medicament) {
    if (confirm("Supprimer le médicament " + m.nom + " ?")) {
      this.p.delMedicament(m);
    }
  }
}