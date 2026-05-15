import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Rozhraní pro data karty
interface FeatureCard {
  icon: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // Data pro tři karty s vlastnostmi
  features: FeatureCard[] = [
    { 
      icon: 'group',
      title: 'Uživatelská správa', 
      text: 'Jednoduchá a efektivní správa uživatelů. Přidávejte, upravujte a mažte záznamy během pár kliknutí.' 
    },
    { 
      icon: 'api', 
      title: 'API Integrace', 
      text: 'Kompletní napojení na mockovací server Apiary. Simulace reálného backendu pro bezproblémový vývoj.' 
    },
    { 
      icon: 'table_chart', 
      title: 'Interaktivní Tabulka', 
      text: 'Pokročilá Material-UI tabulka s funkcemi řazení, klientského vyhledávání a automatického stránkování.' 
    }
  ];
}