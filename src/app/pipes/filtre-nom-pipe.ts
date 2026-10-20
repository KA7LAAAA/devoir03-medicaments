import { Pipe, PipeTransform } from '@angular/core';
import { Medicament } from '../model/model-medicament';

@Pipe({
  name: 'filtreNom'
})
export class FiltreNomPipe implements PipeTransform {
  transform(liste: Medicament[], texte: string): Medicament[] {
    if (!texte || !texte.trim()) {
      return liste;
    }
    const t = texte.toLowerCase().trim();
    return liste.filter(m => m.nom.toLowerCase().includes(t));
  }
}