import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatInputModule, 
  			MatProgressSpinnerModule, MatCardModule, MatIconModule, 
			MatSidenavModule, MatMenuModule, MatDialogModule, MatGridListModule,
			MatListModule, MatSnackBarModule],
  exports: [MatButtonModule, MatToolbarModule, MatInputModule, 
  			MatProgressSpinnerModule, MatCardModule, MatIconModule, 
			MatSidenavModule, MatMenuModule, MatDialogModule, MatGridListModule,
			MatListModule, MatSnackBarModule],
})
export class MaterialModule { }