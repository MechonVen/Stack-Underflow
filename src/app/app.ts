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
        <a routerLink="/service" routerLinkActive="active">Service</a>
        <a routerLink="/advocacy" routerLinkActive="active">Advocacy</a>
        <a routerLink="/scholarships" routerLinkActive="active">Scholarships</a>
        <a routerLink="/membership" routerLinkActive="active">Membership</a>
        <a routerLink="/volunteer" routerLinkActive="active">Volunteer</a>
        <a routerLink="/zonta-in-action" routerLinkActive="active">Zonta in Action</a>
      </nav>
    </header>

    <main><router-outlet></router-outlet></main>

    <footer>
      <p>&copy; 2025 The Zonta Club of Naples | <a href="https://zonta.org" target="_blank">Zonta International</a></p>
    </footer>
  `,
  styles: [`
    :host { display: flex; flex-direction: column; min-height: 100vh; width: 100%; margin: 0; }
    header { margin: 0; padding: 0; }

    nav {
      display: flex;
      justify-content: center;
      gap: 1rem;
      background-color: #eecd12ff;
      padding: 1rem 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      width: 100%;
      box-sizing: border-box;
      margin: 0;
    }

    nav a {
      color: #a00505ff;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: all 0.3s ease;
      font-weight: 700;
      text-transform: uppercase;
    }

    nav a:hover {
      color: #a00505ff;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(77, 75, 75, 0.15);
    }

    nav a.active {
      color: #e9e9e9ff;
      box-shadow: 0 4px 12px rgba(77, 75, 75, 0.15);
      font-weight: 600;
      text-decoration: underline;
    }

    main { flex: 1; width: 100%; padding: 0; margin: 0; }

    footer {
      background-color: #f5f5f5;
      color: #333;
      text-align: center;
      padding: 1.5rem;
      border-top: 1px solid #e0e0e0;
      margin: 0;
      width: 100%;
      box-sizing: border-box;
    }

    footer a {
      color: #8b0000;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    footer a:hover {
      color: #a00000;
    }
  `]
})
export class App {}
