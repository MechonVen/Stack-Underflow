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
    :host { display: flex; flex-direction: column; min-height: 100vh; width: 100%; }
    header { margin: 0; width: 100%; }
    nav a.active { text-decoration: underline; }
    nav { display: flex; gap: 1rem; background-color: #d4a017; padding: 1rem; color: #800006; width: 100%; box-sizing: border-box; }
    nav a { color: #800006; text-decoration: none; }
    main { flex: 1; width: 100%; }
    footer { background-color: #800006; text-align: center; padding: 1rem; color: white; margin: 0; width: 100%; box-sizing: border-box; }
    footer a { color: white; }
  `]
})
export class App {}
