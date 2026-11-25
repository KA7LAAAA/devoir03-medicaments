import { Types } from './types.model';

export class Medicament {
  id!: number;
  idMedicament?: number;
  nom!: string;
  nomMedicament?: string;
  type!: Types | string | any;
  types?: Types | string | any;
  categorie?: Types | string | any;
  dateExpiration!: Date;
  prixMillimes!: number;
  prixMedicament?: number;
  ordonnance!: boolean;
  stock?: number;
}
