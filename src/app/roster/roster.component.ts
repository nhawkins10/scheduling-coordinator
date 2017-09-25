import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class Roster {
  @Input() roster;

  ngOnInit(): void {
    console.log(this.roster);
  }
}
