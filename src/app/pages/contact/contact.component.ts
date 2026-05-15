import { Component } from '@angular/core'; // TADY byla ta chyba, opraveno na @angular/core
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Tyhle věci tam nechej, jinak ti Angular v HTML nepozná ty [formGroup] a <mat-label>
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  standalone: true, 
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule 
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Formulář odeslán:', this.contactForm.value);

      // Zobrazení snackbaru
      this.snackBar.open('Zpráva byla úspěšně odeslána!', 'Zavřít', {
        duration: 3000, 
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      });

      // Vyresetování formuláře
      this.contactForm.reset();
    } else {
      this.snackBar.open('Prosím, vyplňte všechna pole správně.', 'OK', {
        duration: 3000
      });
    }
  }
}