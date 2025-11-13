import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-calendar',
  imports: [CommonModule],
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.scss']
})
export class EventCalendar {
  events = [
    {
      start: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7),
      title: 'Zonta Monthly Meeting',
      description: 'Join us for our monthly board meeting and updates'
    },
    {
      start: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 14),
      title: 'Community Service Day',
      description: 'Volunteering at local women\'s shelter'
    },
    {
      start: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 21),
      title: 'Scholarship Awards Ceremony',
      description: 'Celebrating our scholarship recipients'
    }
  ];

  get upcomingEvents() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.events
      .filter(event => new Date(event.start) >= today)
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  }
}
