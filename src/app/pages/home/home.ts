import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventCalendar } from '../calendar/calendar';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterModule, EventCalendar],
  template: `
    <section class="hero">
      <div class="hero-text">
        <h1>Empowering Women Through Service and Advocacy</h1>
        <p>
          The Zonta Club of Naples is dedicated to improving the lives of women and girls
          in our community and around the world.
        </p>
        <div class="cta-buttons">
          <a routerLink="/membership" class="btn primary">Join Now</a>
          <a routerLink="/store" class="btn secondary">Donate</a>
        </div>
      </div>
    </section>

    <section class="mission">
      <h2>Our Mission</h2>
      <p>
        Zonta International is a global organization of professionals empowering women
        worldwide through service and advocacy.
        The Naples Club proudly supports local scholarships, mentorship programs, and
        fundraising for women’s initiatives.
      </p>
    </section>

    <section class="events">
      <h2>Upcoming Events</h2>
      <app-calendar></app-calendar>
      <a routerLink="/about" class="btn link">See All Events →</a>
    </section>

    <section class="impact">
      <h2>Making a Difference</h2>
      <p>
        From providing scholarships to hosting community service events, our members continue
        to make a lasting impact in Collier County and beyond.
      </p>
      <div class="impact-grid">
        <div>
          <h3>🎓 Scholarships</h3>
          <p>Supporting young women pursuing education and leadership roles.</p>
          <div class="cta-buttons">
          <a routerLink="/scholarships" class="btn primary">See Scholarships</a>
          </div>
        </div>
        <div>
          <h3>🤝 Community Service</h3>
          <p>Partnering with local organizations to uplift women in need.</p>
          <div class="cta-buttons">
          <a routerLink="/scholarships" class="btn primary">Sign Up</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: contents; }

    .hero {
      background: linear-gradient(rgba(128,0,6,0.85), rgba(128,0,6,0.85));
      color: white;
      padding: 6rem 2rem;
      text-align: center;
      width: 100vw;
      margin-left: calc(-50vw + 50%);
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
    }

    .hero-text {
      max-width: 900px;
      width: 100%;
    }

    .hero h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .cta-buttons {
      margin-top: 2rem;
      color: #800006ff;
    }

    .btn {
      text-decoration: none;
      padding: 0.8rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 600;
    }

    .btn.primary {
      background: #d89b1d;
      color: #fff;
      margin-right: 1rem;
    }

    .btn.secondary {
      background: #fff;
      color: #333;
      border: 1px solid #ddd;
    }

    section {
      padding: 3rem 2rem;
      max-width: 900px;
      margin: auto;
    }

    section:not(.hero) {
      max-width: 900px;
    }

    .impact-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-top: 1.5rem;
    }

    h2 {
      color: #004080;
      text-align: center;
      margin-bottom: 1rem;
    }

    .events ul {
      list-style: none;
      padding: 0;
      text-align: left;
    }

    .events li {
      margin: 0.5rem 0;
    }

    .btn.link {
      display: block;
      text-align: right;
      margin-top: 1rem;
      font-weight: 500;
      color: #004080;
    }
  `]
})
export class Home {}
