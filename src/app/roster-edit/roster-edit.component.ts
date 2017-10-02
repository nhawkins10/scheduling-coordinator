import { Component, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'roster-edit',
  templateUrl: './roster-edit.component.html',
  styleUrls: ['./roster-edit.component.css']
})
export class RosterEdit {
  @Input() roster;
  @Output() onRosterChanged = new EventEmitter<String>();
  name: string = "Nathan";

  save() {
    this.onRosterChanged.emit(JSON.stringify(this.roster));
    console.log('save');
  }

  cancel() {
    console.log('cancel');
  }

  ngOnInit(): void {

  }

  ngOnChanges() {

  }
}
