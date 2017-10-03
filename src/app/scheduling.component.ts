import { Component, OnInit } from '@angular/core';
import { SchedulingService } from './service/scheduling.service';

@Component({
  selector: 'scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css'],
  providers: [SchedulingService]
})
export class Scheduling implements OnInit{
  title = 'Scheduling App';

  year = new Date().getFullYear();
  month = new Date().getMonth();
  day = new Date().getDate();

  roster = [];
  unavailable = [];

  showEdit = false;

  constructor(private schedulingService: SchedulingService) {}

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
    this.schedulingService.getRoster().then(function(roster) {
      this.roster = roster;
    }.bind(this));
  }

  onRosterChanged(roster: string) {
    this.schedulingService.saveRoster(JSON.parse(roster)).then(function() {
      this.getRoster();
    }.bind(this));
  }

  onHideRoster() {
    this.showEdit = false;
  }

  editRoster() {
    this.showEdit = true;
  }

  getUnavailable() {
    var dataKey = this.year + "-" + (this.month < 10 ? "0" + this.month : this.month);
    this.schedulingService.getUnavailable(dataKey, this.day).then(function(unavailable) {
      this.unavailable = unavailable;
    }.bind(this));
  }

  saveUnavailable(id: string, available: boolean) {
    let dataKey: string = this.year + "-" + (this.month < 10 ? "0" + this.month : this.month);
    this.schedulingService.saveUnavailable(dataKey, this.day, id, available).then(function() {
      this.getUnavailable();
    }.bind(this));
  }

  onAvailabilityChanged(person: string) {
    var personData = JSON.parse(person);
    var dataKey = this.year + "-" + (this.month < 10 ? "0" + this.month : this.month);

    this.saveUnavailable(personData.id, !personData.available);
  }

  ngOnInit(): void {
    this.getRoster();
    this.getUnavailable();
  }

  ngOnChanges(): void {

  }
}
