import { Injectable } from '@angular/core';

import { DATA } from './example';

@Injectable()
export class SchedulingService {
  getRoster() {
    return Promise.resolve(DATA.roster);
  }
}
