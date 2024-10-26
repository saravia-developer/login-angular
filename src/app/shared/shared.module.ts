import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomsFieldInputComponent } from './atoms-field/atoms-field-input/atoms-field-input.component';
import { AtomsFieldSelectComponent } from './atoms-field/atoms-field-select/atoms-field-select.component';



@NgModule({
  declarations: [
    AtomsFieldInputComponent,
    AtomsFieldSelectComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AtomsFieldSelectComponent,
    AtomsFieldInputComponent
  ]
})
export class SharedModule { }
