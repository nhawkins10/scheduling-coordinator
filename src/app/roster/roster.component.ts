import { Component, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class Roster {
  @Input() roster;
  @Input() unavailable;
  @Input() locked;
  @Output() onAvailabilityChanged = new EventEmitter<String>();
  @Output() onEdit = new EventEmitter<String>();
  @Output() onLockedChanged = new EventEmitter<Boolean>();
  availabilityList = [];

  showAll = true;

  setAvailability() {
    this.availabilityList = [];

    if (this.roster && this.unavailable) {
      for (var count=0; count<this.roster.length; count++) {
        var available = true;
        for (var unAvlCount=0; unAvlCount<this.unavailable.length; unAvlCount++) {
          if (this.unavailable[unAvlCount] == this.roster[count].id) {
            available = false;
          }
        }
        this.availabilityList.push(
          {
          "name": this.roster[count].name,
          "id": this.roster[count].id,
          "available": available
          }
        );
      }
    }
  }

  toggleAvailable(person) {
    this.onAvailabilityChanged.emit(JSON.stringify(person));
  }

  edit() {
    this.onEdit.emit();
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
  }

  toggleLock() {
    this.onLockedChanged.emit(this.locked);
  }

  ngOnInit(): void {
    this.setAvailability();
  }

  ngOnChanges() {
     this.setAvailability();
  }
}
