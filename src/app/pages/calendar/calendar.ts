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
    { start: new Date(), title: 'Zonta Meeting' }
  ];
}
