import { Component, OnInit } from '@angular/core';
import { SchedulingService } from './service/scheduling.service';

@Component({
  selector: 'scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css'],
  providers: [SchedulingService]
})
export class Scheduling implements OnInit{
  title = 'Worship Team Schedule';

  year = new Date().getFullYear();
  month = new Date().getMonth();
  day = new Date().getDate();

  roster = [];
  unavailable = [];

  showEdit = false;
  locked = false;

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

  onEdit() {
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
    if (!this.locked) {
      var personData = JSON.parse(person);
      var dataKey = this.year + "-" + (this.month < 10 ? "0" + this.month : this.month);

      this.saveUnavailable(personData.id, !personData.available);
    } else {
      alert("Scheduling is currently locked.");
    }
  }

  toggleLocked() {
   console.log('toggle locked');
   //getAuthenticated
   //if (authenticated)
     this.saveLocked();
  }

  getLocked() {
    this.schedulingService.getLocked().then(function(locked) {
      this.locked = locked;
    }.bind(this));
  }

  saveLocked() {
    this.schedulingService.saveLocked(!this.locked).then(function() {
      this.getLocked();
    }.bind(this));
  }

  ngOnInit(): void {
    this.getRoster();
    this.getUnavailable();
    this.getLocked();
  }

  ngOnChanges(): void {

  }
}

