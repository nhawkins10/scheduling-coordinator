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

  showAll = true;

  setAvailability(items) {
    this.availabilityList = [];

    for (var count=0; count<items.length; count++) {
      var available = true;
      for (var unAvlCount=0; unAvlCount<this.unavailable.length; unAvlCount++) {
        if (this.unavailable[unAvlCount] == items[count].id) {
          available = false;
        }
      }
      this.availabilityList.push(
        {
        "name": items[count].name,
        "id": items[count].id,
        "available": available
        }
      );
    }
  }

  toggleAvailable(person) {
    this.onAvailabilityChanged.emit(JSON.stringify(person));
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
  }

//  ngOnInit(): void {
//   this.setAvailability();
//  }

  ngOnChanges() {
    this.roster.subscribe(rosterItems => {
      this.setAvailability(rosterItems);
    });
  }
}
