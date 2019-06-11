import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatDialogModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
  MatButtonModule, MatSelectModule, MatTooltipModule, MatExpansionModule, MatCardModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule,
    MatExpansionModule,
    MatCardModule
  ],
  exports: [
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule,
    MatExpansionModule,
    MatCardModule
  ]
})
export class MaterialModule { }
