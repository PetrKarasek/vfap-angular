import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'role', 'birthDate', 'actions'];
  
  dataSource = new MatTableDataSource<any>([]);
  loading = false;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Propojení seřazení s tabulkou po inicializaci pohledu
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (response: any) => {
        this.dataSource.data = response || [];
        this.loading = false;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        this.snackBar.open('Failed to fetch users', 'Close', { duration: 3000 });
        this.dataSource.data = [];
        this.loading = false;
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editUser(user: any): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: { user, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(user.id, result).subscribe({
          next: () => {
            this.snackBar.open('User updated successfully', 'Close', { duration: 3000 });
            const currentData = this.dataSource.data;
            const index = currentData.findIndex((u: any) => u.id === user.id);
            if (index !== -1) {
              currentData[index] = { ...currentData[index], ...result };
              this.dataSource.data = [...currentData];
            }
          },
          error: () => {
            this.snackBar.open('Failed to update user', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  deleteUser(user: any): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.snackBar.open('User deleted successfully', 'Close', { duration: 3000 });
          const currentData = this.dataSource.data;
          this.dataSource.data = currentData.filter((u: any) => u.id !== user.id);
        },
        error: () => {
          this.snackBar.open('Failed to delete user', 'Close', { duration: 3000 });
        }
      });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: { user: null, isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.createUser(result).subscribe({
          next: (newUser) => {
            this.snackBar.open('User created successfully', 'Close', { duration: 3000 });
            const currentData = this.dataSource.data;
            this.dataSource.data = [...currentData, { ...result, id: Date.now() }];
          },
          error: () => {
            this.snackBar.open('Failed to create user', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}