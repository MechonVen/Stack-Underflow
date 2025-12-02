import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CalendarEvent {
  start: Date;
  title: string;
  description: string;
}

@Component({
  standalone: true,
  selector: 'app-calendar',
  imports: [CommonModule],
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.scss']
})
export class EventCalendar implements OnInit {
  events: CalendarEvent[] = [];

  private getFirstTuesdayOfMonth(year: number, month: number): Date {
    let date = new Date(year, month, 1);
    const day = date.getDay();
    const daysUntilTuesday = (2 - day + 7) % 7;
    date.setDate(1 + daysUntilTuesday);
    return date;
  }

  private generateMonthlyMeetings(monthsToGenerate: number): CalendarEvent[] {
    const meetings: CalendarEvent[] = [];
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    for (let i = 0; i < monthsToGenerate; i++) {
      const monthOffset = currentMonth + i;
      const year = currentYear + Math.floor(monthOffset / 12);
      const month = monthOffset % 12;

      const meetingDate = this.getFirstTuesdayOfMonth(year, month);

      if (meetingDate >= today) {
        meetings.push({
          start: meetingDate,
          title: 'Zonta Monthly Meeting',
          description: 'Join us for our monthly board meeting and updates'
        });
      }
    }

    return meetings;
  }

  ngOnInit() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    const decemberMeeting = this.getFirstTuesdayOfMonth(currentYear, 11);
    const januaryMeeting = this.getFirstTuesdayOfMonth(currentYear + 1, 0);

    this.events = [];

    if (decemberMeeting >= today) {
      this.events.push({
        start: decemberMeeting,
        title: 'Zonta Monthly Meeting',
        description: 'Join us for our monthly board meeting and updates'
      });
    }

    if (januaryMeeting >= today) {
      this.events.push({
        start: januaryMeeting,
        title: 'Zonta Monthly Meeting',
        description: 'Join us for our monthly board meeting and updates'
      });
    }
  }

  get upcomingEvents() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.events
      .filter(event => new Date(event.start) >= today)
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  }
}
