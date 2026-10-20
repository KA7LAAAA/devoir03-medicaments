export class Medicament {
  id!: number;
  nom!: string;
  categorie!: string;
  dateExpiration!: Date;
  prixMillimes!: number;   // prix en millimes (1 DT = 1000 millimes)
  ordonnance!: boolean;    // ordonnance obligatoire ou non
  stock?: number;          // quantité en stock, optionnelle
}