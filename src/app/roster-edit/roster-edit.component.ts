import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'roster-edit',
  templateUrl: './roster-edit.component.html',
  styleUrls: ['./roster-edit.component.css']
})
export class RosterEdit {
  @Input() roster;
  @Output() onRosterChanged = new EventEmitter<String>();
  @Output() onHideRoster = new EventEmitter<String>();
  workingRoster = [];

  save() {
    this.onRosterChanged.emit(JSON.stringify(this.workingRoster));
    this.onHideRoster.emit();
  }

  cancel() {
    this.onHideRoster.emit();
  }

  ngOnInit(): void {
    this.workingRoster = [];
    for (var count = 0; count<this.roster.length; count++) {
      this.workingRoster.push({"name": this.roster[count].name, "id": this.roster[count].id});
    }
  }
}
