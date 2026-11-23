import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './menu.html',
  styles: ``
})
export class Menu {
  constructor(public auth: Auth, private router: Router) { }

  deconnecter() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
