import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicament } from '../model/model-medicament';
import { Categorie } from '../model/categorie.model';
import { CategorieWrapper } from '../model/categorie-wrapper.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class Pharmacie {
  apiURL: string = 'http://localhost:8080/medicaments/api';
  apiURLCat: string = 'http://localhost:8080/medicaments/cat';

  constructor(private http: HttpClient) { }

  listMedicaments(): Observable<Medicament[]> {
    return this.http.get<Medicament[]>(this.apiURL);
  }

  getMedicament(id: number): Observable<Medicament> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Medicament>(url);
  }

  addMedicament(m: Medicament): Observable<Medicament> {
    return this.http.post<Medicament>(this.apiURL, m, httpOptions);
  }

  updateMedicament(m: Medicament): Observable<Medicament> {
    return this.http.put<Medicament>(this.apiURL, m, httpOptions);
  }

  delMedicament(id: number): Observable<any> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  listeCategories(): Observable<CategorieWrapper> {
    return this.http.get<CategorieWrapper>(this.apiURLCat);
  }

  rechercherParCategorie(idCat: number): Observable<Medicament[]> {
    const url = `${this.apiURL}/medscat/${idCat}`;
    return this.http.get<Medicament[]>(url);
  }

  ajouterCategorie(cat: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.apiURLCat, cat, httpOptions);
  }

  updateCategorie(cat: Categorie): Observable<Categorie> {
    const url = `${this.apiURLCat}/${cat.idCat}`;
    return this.http.put<Categorie>(url, cat, httpOptions);
  }

  supprimerCategorie(idCat: number): Observable<any> {
    const url = `${this.apiURLCat}/${idCat}`;
    return this.http.delete(url, httpOptions);
  }
}
