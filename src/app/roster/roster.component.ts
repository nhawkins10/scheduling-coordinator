import { Component, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class Roster {
  @Input() roster;
  @Input() unavailable;
  @Output() onAvailabilityChanged = new EventEmitter<String>();
  availabilityList = [];

  setAvailability() {
    this.availabilityList = [];

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

  toggleAvailable(person) {
    this.onAvailabilityChanged.emit(JSON.stringify(person));
  }

  ngOnInit(): void {
    this.setAvailability();
  }

  ngOnChanges() {
    this.setAvailability();
  }
}
