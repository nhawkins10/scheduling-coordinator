import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { Scheduling } from './scheduling.component';
import { SchedulingService } from './service/scheduling.service';
import { Calendar } from './calendar/calendar.component';
import { Roster } from './roster/roster.component';
import { RosterEdit } from './roster-edit/roster-edit.component';
import { Authentication } from './authentication/authentication.component';

@NgModule({
  declarations: [
    Scheduling,
    Calendar,
    Roster,
    RosterEdit,
    Authentication
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [SchedulingService],
  bootstrap: [Scheduling]
})
export class AppModule { }
