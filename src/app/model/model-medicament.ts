import { Categorie } from './categorie.model';

export class Medicament {
  id!: number;
  idMedicament?: number;
  nom!: string;
  nomMedicament?: string;
  categorie!: Categorie | string | any;
  dateExpiration!: Date;
  prixMillimes!: number;
  prixMedicament?: number;
  ordonnance!: boolean;
  stock?: number;
}
