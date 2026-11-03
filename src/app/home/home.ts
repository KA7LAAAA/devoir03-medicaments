import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  typeRecherche: string = '';

  constructor(private router: Router) {}

  allerVersListe() {
    this.router.navigate(['/medicaments'], {
      queryParams: { type: this.typeRecherche }
    });
  }

  allerVersAjout() {
    this.router.navigate(['/add-medicament']);
  }
}
