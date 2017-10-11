import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class SchedulingService {
  roster = []
  unavailable = [];
  path = "";

  constructor(private db: AngularFireDatabase) {}

  getRoster() {
    return new Promise(function(resolve, reject) {
      this.db.list('/roster')
        .subscribe(snapshots => {
          this.roster = [];
          snapshots.forEach(snapshot => {
            this.roster.push(snapshot);
          });
          resolve(this.roster);
        });
    }.bind(this));
  }

  saveRoster(roster) {
    var updates = {};
    updates['/roster'] = roster;

    return new Promise(function(resolve, reject) {
      this.db.object('/')
        .update(updates);
        resolve("success");
    }.bind(this));
  }

  getUnavailable(dataKey, dayKey) {
    return new Promise(function(resolve, reject) {
      this.db.object('/months')
        .subscribe(snapshots => {
          if (snapshots[dataKey] && snapshots[dataKey][dayKey]) {
            this.unavailable = snapshots[dataKey][dayKey];
            resolve(snapshots[dataKey][dayKey]);
          } else {
            this.unavailable = [];
            resolve([]);
          }
        });
    }.bind(this));
  }

  saveUnavailable(dataKey: string, day: number, id: string, available: boolean) {
    var newList = [];
    var updates = {};

    for (var count=0; count<this.unavailable.length; count++) {
      if (this.unavailable[count] != id) {
        newList.push(this.unavailable[count]);
      }
    }

    if (!available) {
      newList.push(id);
    }
    updates[dataKey + '/' + day] = newList;

    return new Promise(function(resolve, reject) {
      this.db.object('/months')
        .update(updates);
        resolve("success");
    }.bind(this));
  }

  getLocked() {
    return new Promise(function(resolve, reject) {
      this.db.object('/locked/status')
        .subscribe(snapshots => {
          resolve(snapshots.$value);
        });
    }.bind(this));
  }

  saveLocked(locked) {
    var updates = {};
    updates['/status'] = locked;

    return new Promise(function(resolve, reject) {
      this.db.object('/locked').update(updates);
      resolve("success");
    }.bind(this));
  }
}
