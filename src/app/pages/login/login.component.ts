import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = '';
      
      // Vytáhnutí emailu a hesla z reaktivního formuláře
      const { email, password } = this.loginForm.value;

      // Simulace zpoždění sítě (500ms), ať je vidět loading spinner
      setTimeout(() => {
        // Kontrola na jeden specifický účet
        if (email === 'admin@admin.cz' && password === 'heslo123') {
          
          // Vygenerování reálného JWT token
          const realJwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
          
          // Uložení do local storage
          localStorage.setItem('authToken', realJwtToken);

          this.loading = false;
          this.snackBar.open('Login successful', 'Close', { duration: 3000 });
          
          // Přesměrování
          this.router.navigate(['/dashboard']);
          
        } else {
          // Pokud zadá cokoliv jiného, vyhodíme chybu
          this.loading = false;
          this.error = 'Invalid email or password';
          this.snackBar.open('Invalid email or password', 'Close', { duration: 3000 });
        }
      }, 500);
    }
  }
}