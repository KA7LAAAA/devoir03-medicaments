import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicament } from '../model/model-medicament';
import { Types } from '../model/types.model';
import { TypesWrapper } from '../model/types-wrapper.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class Pharmacie {
  apiURL: string = 'http://localhost:8090/medicaments/api';
  apiURLTypes: string = 'http://localhost:8090/medicaments/types';

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

  listeTypes(): Observable<TypesWrapper> {
    return this.http.get<TypesWrapper>(this.apiURLTypes);
  }

  // Alias compatibilité
  listeCategories(): Observable<TypesWrapper> {
    return this.listeTypes();
  }

  rechercherParType(idTypes: number): Observable<Medicament[]> {
    const url = `${this.apiURL}/medstypes/${idTypes}`;
    return this.http.get<Medicament[]>(url);
  }

  rechercherParCategorie(idCat: number): Observable<Medicament[]> {
    return this.rechercherParType(idCat);
  }

  ajouterType(t: Types): Observable<Types> {
    return this.http.post<Types>(this.apiURLTypes, t, httpOptions);
  }

  ajouterCategorie(cat: Types): Observable<Types> {
    return this.ajouterType(cat);
  }

  updateType(t: Types): Observable<Types> {
    const id = t.idTypes || t.idType || t.idCat;
    const url = `${this.apiURLTypes}/${id}`;
    return this.http.put<Types>(url, t, httpOptions);
  }

  updateCategorie(cat: Types): Observable<Types> {
    return this.updateType(cat);
  }

  supprimerType(idTypes: number): Observable<any> {
    const url = `${this.apiURLTypes}/${idTypes}`;
    return this.http.delete(url, httpOptions);
  }

  supprimerCategorie(idCat: number): Observable<any> {
    return this.supprimerType(idCat);
  }
}
