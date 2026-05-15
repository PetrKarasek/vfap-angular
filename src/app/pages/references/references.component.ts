import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.css']
})
export class ReferencesComponent {
  references = [
    {
      company: 'Tech Solutions s.r.o.',
      industry: 'IT Services',
      description: 'Implementace VFAP pro správu projektů pro 50členný tým vývojářů.',
      results: [
        'Snížení administrativní zátěže o 40%',
        'Zrychlení komunikace v týmu o 60%',
        'Zvýšení produktivity o 25%'
      ],
      testimonial: 'VFAP kompletně změnil způsob, jakým spravujeme naše projekty. Ušetřili jsme spoustu času a zlepšili týmovou spolupráci.',
      client: 'Jan Novák, CEO'
    },
    {
      company: 'Marketing Agency Pro',
      industry: 'Marketing & Reklama',
      description: 'Nasazení VFAP pro správu kampaní a klientů pro marketingovou agenturu.',
      results: [
        'Lepší přehled o všech projektech',
        'Rychlejší dodání zakázek',
        'Vyšší spokojenost klientů'
      ],
      testimonial: 'Díky VFAP máme perfektní přehled o všech našich kampaních. Naše klienty jsme ještě nikdy nezklamali.',
      client: 'Eva Svobodová, Creative Director'
    },
    {
      company: 'E-Shop Plus',
      industry: 'E-commerce',
      description: 'Integrace VFAP pro správu obsahu a marketingových aktivit e-shopu.',
      results: [
        'Centralizovaná správa obsahu',
        'Efektivnější plánování kampaní',
        'Rychlejší reakce na tržní změny'
      ],
      testimonial: 'VFAP nám pomohl sjednotit všechny naše marketingové aktivity na jednom místě. Skvělá investice!',
      client: 'Petr Dvořák, Marketing Manager'
    }
  ];
}
