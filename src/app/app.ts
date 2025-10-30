import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header>
      <nav>
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
        <a routerLink="/about" routerLinkActive="active">Who We Are</a>
        <a routerLink="/scholarships" routerLinkActive="active">Scholarships</a>
        <a routerLink="/membership" routerLinkActive="active">Membership</a>
        <a routerLink="/store" routerLinkActive="active">Donate / Store</a>
      </nav>
    </header>

    <main><router-outlet></router-outlet></main>

    <footer>
      <p>&copy; 2025 The Zonta Club of Naples | <a href="https://zonta.org" target="_blank">Zonta International</a></p>
    </footer>
  `,
  styles: [`
    nav a.active { text-decoration: underline; }
    nav { display: flex; gap: 1rem; background-color: #800006ff; padding: 1rem; color: #fff; }
    main { padding: 2rem; }
    footer { background-color: #f4f4f4; text-align: center; padding: 1rem; }
  `]
})
export class App {}
