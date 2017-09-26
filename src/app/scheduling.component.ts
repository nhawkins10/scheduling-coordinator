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
  unavailable = [];

  onDayChanged(day: number) {
    this.day = day;
    this.getUnavailable();
  }

  onMonthChanged(month: number) {
    this.month = month;
    this.getUnavailable();
  }

  onYearChanged(year: number) {
    this.year = year;
    this.getUnavailable();
  }

  getRoster() {
    this.schedulingService.getRoster().then(roster => this.roster = roster);
  }

  getUnavailable() {
    var dataKey = this.year + "-" + (this.month < 10 ? "0" + this.month : this.month);
    this.schedulingService.getUnavailable(dataKey, this.day).then(unavailable => this.unavailable = unavailable);
  }

  saveUnavailable(dataKey, day, id, available) {
    this.schedulingService.saveUnavailable(dataKey, day, id, available).then(() => this.getUnavailable());
  }

  onAvailabilityChanged(person: string) {
    var personData = JSON.parse(person);
    var dataKey = this.year + "-" + (this.month < 10 ? "0" + this.month : this.month);

    this.saveUnavailable(dataKey, this.day, personData.id, !personData.available);
  }

  ngOnInit(): void {
    this.getRoster();
    this.getUnavailable();
  }
}
