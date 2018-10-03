import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [CardComponent],
  exports: [
    CommonModule,
    FormsModule,
    CardComponent
  ]
})
export class SharedModule { }
