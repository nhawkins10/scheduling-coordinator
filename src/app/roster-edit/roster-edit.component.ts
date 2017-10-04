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

  delete(person) {
    var index = -1;
    for (var count=0; count<this.workingRoster.length; count++) {
       if (this.workingRoster[count].id === person.id) {
         index = count;
       }
    }

    if (index > -1) {
      this.workingRoster.splice(index, 1);
    }
  }

  create() {
    this.workingRoster.push({"id": Date.now(), "name": ""});
    setTimeout(function() {
      document.getElementById('editList').scrollTo(0, 100000);
    });
  }

  ngOnInit(): void {
    this.workingRoster = [];
    for (var count = 0; count<this.roster.length; count++) {
      this.workingRoster.push({"name": this.roster[count].name, "id": this.roster[count].id});
    }
  }
}
