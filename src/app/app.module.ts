import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Scheduling } from './scheduling.component';
import { SchedulingService } from './service/scheduling.service';
import { Calendar } from './calendar/calendar.component';
import { Roster } from './roster/roster.component';

@NgModule({
  declarations: [
    Scheduling,
    Calendar,
    Roster
  ],
  imports: [
    BrowserModule
  ],
  providers: [SchedulingService],
  bootstrap: [Scheduling]
})
export class AppModule { }
