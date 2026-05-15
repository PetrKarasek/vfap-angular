import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

// Definice struktury uživatele
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule, 
    MatButtonModule, 
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatSnackBarModule
  ],
  // Odkaz na externí soubory
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  // Názvy sloupců pro tabulku
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];
  
  // Zdroj dat pro Material Tabulku
  users = new MatTableDataSource<User>([]);
  
  // Objekt pro formulář nového uživatele
  newUser: Partial<User> = { name: '', email: '', role: 'User' };
  
  dialogOpen = false;

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
    const defaultUsers: User[] = [
      { id: 1, name: 'Jan Novák', email: 'jan.novak@test.cz', role: 'Admin' },
      { id: 2, name: 'Eva Svobodová', email: 'eva.svobodova@test.cz', role: 'User' }
    ];

    // Načtení z localStorage
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('demo_users');
      if (saved) {
        this.users.data = JSON.parse(saved);
      } else {
        this.users.data = defaultUsers;
      }
    } else {
      this.users.data = defaultUsers;
    }
  }

  saveToLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('demo_users', JSON.stringify(this.users.data));
    }
  }

  openDialog() {
    this.dialogOpen = true;
    this.newUser = { name: '', email: '', role: 'User' };
  }

  closeDialog() {
    this.dialogOpen = false;
  }

  addUser() {
    if (this.newUser.name && this.newUser.email) {
      const userToAdd: User = {
        id: Date.now(),
        name: this.newUser.name!,
        email: this.newUser.email!,
        role: this.newUser.role || 'User'
      };

      this.users.data = [...this.users.data, userToAdd];
      this.saveToLocalStorage();
      this.closeDialog();
      
      this.snackBar.open('Uživatel byl úspěšně přidán!', 'Zavřít', { duration: 3000 });
    }
  }

  deleteUser(id: number) {
    this.users.data = this.users.data.filter(u => u.id !== id);
    this.saveToLocalStorage();
    
    this.snackBar.open('Uživatel byl smazán.', 'Zavřít', { duration: 3000 });
  }
}