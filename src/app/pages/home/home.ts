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
        <h1>Zonta Club of Naples</h1>
        <p>
          We believe in making the world a better place by empowering women. 
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
        Zonta Club of Naples is part of tens of thousands of professionals worldwide who demand gender equality and the end of violence against women and girls. We seek to eradicate human trafficking, domestic violence, and child marriage so no woman lives in fear. Zonta provides grants, resources, scholarships and services while advocating change, educating the community and helping direct responders and law enforcement. We say NO to violence and YES to equal opportunity and rights for women and girls of Collier County.
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
        From providing scholarships to hosting community service events, our members continue to
        make a lasting impact in Collier County and beyond.
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
            <a routerLink="/volunteer" class="btn primary">Sign Up</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: contents;
      }

      .hero {
        background: linear-gradient(rgba(128, 0, 6, 0.85), rgba(128, 0, 6, 0.85));
        color: white;
        padding: 6rem 2rem;
        text-align: center;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        min-height: 500px;
        margin: 0;
      }

      .hero-text {
        max-width: 700px;
        width: 100%;
      }

      .hero h1 {
        font-size: 3.5rem;
        margin-bottom: 1.5rem;
        font-weight: 700;
        letter-spacing: -1px;
        line-height: 1.2;
      }

      .hero p {
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 2rem;
        font-weight: 400;
        color: white;
      }

      .cta-buttons {
        margin-top: 2rem;
        color: #800006ff;
      }

      .btn {
        text-decoration: none;
        padding: 0.9rem 1.8rem;
        border-radius: 0.4rem;
        font-weight: 600;
        font-size: 1rem;
        transition: all 0.3s ease;
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
        margin-bottom: 2rem;
        font-size: 2.5rem;
        font-weight: 700;
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

      section p {
        font-size: 1rem;
        line-height: 1.8;
        color: #555;
      }

      section h3 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        color: #004080;
      }
    `,
  ],
})
export class Home {}
