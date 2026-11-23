import { Injectable } from '@angular/core';

export interface Utilisateur {
  username: string;
  password: string;
  role: 'admin' | 'user';
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private utilisateurs: Utilisateur[] = [
    { username: 'admin', password: '123', role: 'admin' },
    { username: 'yessin', password: '123', role: 'user' }
  ];

  utilisateurConnecte: Utilisateur | null = null;
  isloggedIn: boolean = false;
  loggedUser: string = '';

  constructor() {
    this.chargerSession();
  }

  // Récupérer 
  chargerSession() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const u = localStorage.getItem('user_connecte');
      if (u) {
        try {
          this.utilisateurConnecte = JSON.parse(u);
          this.isloggedIn = true;
          this.loggedUser = this.utilisateurConnecte?.username || '';
        } catch {
          this.utilisateurConnecte = null;
          this.isloggedIn = false;
          this.loggedUser = '';
        }
      }
    }
  }

  //  Sauvegarder 
  login(username: string, password: string): boolean {
    const u = this.utilisateurs.find(
      x => x.username === username && x.password === password
    );
    if (u) {
      this.utilisateurConnecte = u;
      this.isloggedIn = true;
      this.loggedUser = u.username;

      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('user_connecte', JSON.stringify(u));
        localStorage.setItem('isloggedIn', 'true');
        localStorage.setItem('loggedUser', u.username);
      }
      return true;
    }
    return false;
  }

  // Supprimer 
  logout() {
    this.utilisateurConnecte = null;
    this.isloggedIn = false;
    this.loggedUser = '';

    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('user_connecte');
      localStorage.removeItem('isloggedIn');
      localStorage.removeItem('loggedUser');
    }
  }

  estConnecte(): boolean {
    return this.utilisateurConnecte !== null;
  }

  estAdmin(): boolean {
    return this.utilisateurConnecte?.role === 'admin';
  }
}
