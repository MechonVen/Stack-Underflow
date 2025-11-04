import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarMonthViewComponent, CalendarWeekViewComponent, CalendarDayViewComponent, CalendarView } from 'angular-calendar';

@Component({
  standalone: true,
  selector: 'app-calendar',
  imports: [
    CommonModule,
    CalendarMonthViewComponent,
    CalendarWeekViewComponent,
    CalendarDayViewComponent
  ],
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.scss']
})
export class EventCalendar {
  CalendarView = CalendarView;
  view: CalendarView = CalendarView.Month;
  viewDate = new Date();
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

  previousMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1);
  }

  nextMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1);
  }

  onEventClick(event: any): void {
    console.log('Event clicked:', event);
  }
}
