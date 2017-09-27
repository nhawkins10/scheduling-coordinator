import { Injectable } from '@angular/core';

import { DATA } from './example';

@Injectable()
export class SchedulingService {

  getUnavailable(dataKey, dayKey) {
    var temp;
     if (DATA.months[dataKey]) {
      temp = DATA.months[dataKey][parseInt(dayKey, 10)-1];
     } else {
      temp = [];
     }
    return Promise.resolve(temp);
  }

  saveUnavailable(dataKey, day, id, available) {
    var currentList = DATA.months[dataKey][parseInt(day, 10)-1];
    var newList = [];

    for (var count=0; count<currentList.length; count++) {
      if (currentList[count] != id) {
        newList.push(currentList[count]);
      }
    }

    if (!available) {
      newList.push(id);
    }

    DATA.months[dataKey][parseInt(day, 10)-1] = newList;

    return Promise.resolve(newList);
  }
}
