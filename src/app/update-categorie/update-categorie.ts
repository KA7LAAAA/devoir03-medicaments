import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categorie } from '../model/categorie.model';

@Component({
  selector: 'app-update-categorie',
  imports: [CommonModule, FormsModule],
  templateUrl: './update-categorie.html',
  styleUrl: './update-categorie.css'
})
export class UpdateCategorieComponent implements OnInit {
  @Input()
  categorie!: Categorie;

  @Input()
  ajout!: boolean;

  @Output()
  categorieUpdated = new EventEmitter<Categorie>();

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateCategorie ", this.categorie);
  }

  saveCategorie() {
    this.categorieUpdated.emit(this.categorie);
  }
}
