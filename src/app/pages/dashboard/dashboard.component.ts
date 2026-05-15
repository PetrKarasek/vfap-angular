import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { UserTableComponent } from '../../components/user-table/user-table.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    UserTableComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] 
})
export class DashboardComponent {
  // Proměnné pouze pro formulář na 2. záložce
  messageText: string = '';
  meetingDate: Date | null = null;
  today = new Date();

  constructor(private snackBar: MatSnackBar) {}

  // Funkce pro odeslání kontaktního formuláře
  sendMessage() {
    if (this.messageText && this.meetingDate) {
      this.snackBar.open('Požadavek byl úspěšně odeslán!', 'Zavřít', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
      this.messageText = '';
      this.meetingDate = null;
    }
  }
}