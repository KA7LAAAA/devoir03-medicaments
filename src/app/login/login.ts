import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private auth: Auth, private router: Router) { }

  seConnecter() {
    if (this.auth.login(this.username, this.password)) {
      this.message = '';
      this.router.navigate(['/medicaments']);
    } else {
      this.message = "Nom d'utilisateur ou mot de passe incorrect";
    }
  }
}