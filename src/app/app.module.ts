import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

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
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [SchedulingService],
  bootstrap: [Scheduling]
})
export class AppModule { }
