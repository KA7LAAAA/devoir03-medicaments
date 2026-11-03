import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './menu.html',
  styles: ``
})
export class Menu {
  optionChoisie: string = '';

  constructor(private router: Router) {}

  onOptionChange() {
    if (!this.optionChoisie) return;

    if (this.optionChoisie === 'ajout') {
      this.router.navigate(['/add-medicament']);
    } else {
      this.router.navigate(['/medicaments'], {
        queryParams: { type: this.optionChoisie }
      });
    }
    // Reset après navigation
    this.optionChoisie = '';
  }
}
