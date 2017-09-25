import { Component, OnInit } from '@angular/core';
import { SchedulingService } from './service/scheduling.service';

@Component({
  selector: 'scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css'],
  providers: [SchedulingService]
})
export class Scheduling implements OnInit{
  constructor(private schedulingService: SchedulingService) {}

  title = 'Scheduling App';

  year = new Date().getFullYear();
  month = new Date().getMonth();
  day = new Date().getDate();

  monthList = [];
  roster = [];

  onDayChanged(day: number) {
    this.day = day;
  }

  onMonthChanged(month: number) {
    this.month = month;
  }

  onYearChanged(year: number) {
    this.year = year;
  }

  getRoster() {
    this.schedulingService.getRoster().then(roster => this.roster = roster);
  }

  ngOnInit(): void {
    this.getRoster();
  }
}
