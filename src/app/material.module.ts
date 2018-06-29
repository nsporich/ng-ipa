import { NgModule } from '@angular/core';

import { 
  MatCardModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatAutocompleteModule,
  MatTableModule,
  MatButtonModule,
  MatTableDataSource
} from '@angular/material';

@NgModule({
  imports: [
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatAutocompleteModule,
    MatTableModule,
    MatButtonModule
  ],
  exports: [
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatAutocompleteModule,
    MatTableModule,
    MatButtonModule
  ]
})

export class MaterialModule {}