import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Types } from '../model/types.model';

@Component({
  selector: 'app-update-types',
  imports: [CommonModule, FormsModule],
  templateUrl: './update-types.html',
  styleUrl: './update-types.css'
})
export class UpdateTypesComponent implements OnInit {
  @Input()
  type!: Types;

  @Input()
  ajout!: boolean;

  @Output()
  typeUpdated = new EventEmitter<Types>();

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateTypes ", this.type);
  }

  saveType() {
    this.typeUpdated.emit(this.type);
  }
}
