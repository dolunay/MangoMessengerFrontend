import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

export const MatImports = [
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule,
	MatIconModule,
	MatDatepickerModule,
	MatNativeDateModule,
	PickerModule,
	HttpClientModule,
	MatDialogModule,
];
