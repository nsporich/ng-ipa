import { NgModule } from '@angular/core';

import { 
  MatCardModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatAutocompleteModule,
  MatTableModule,
  MatButtonModule,
  MatDialogModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatSortModule
} from '@angular/material';

@NgModule({
  imports: [
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatAutocompleteModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatSortModule
  ],
  exports: [
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatAutocompleteModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatSortModule
  ]
})

export class MaterialModule {}