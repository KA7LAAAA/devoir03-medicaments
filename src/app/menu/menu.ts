import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './menu.html',
  styles: ``
})
export class Menu {
  optionChoisie: string = '';

  constructor(public auth: Auth, private router: Router) { }

  onOptionChange() {
    if (!this.optionChoisie) return;

    if (this.optionChoisie === 'ajout') {
      this.router.navigate(['/add-medicament']);
    } else {
      this.router.navigate(['/medicaments'], {
        queryParams: { type: this.optionChoisie }
      });
    }
    // Réinitialiser la sélection
    this.optionChoisie = '';
  }

  deconnecter() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
