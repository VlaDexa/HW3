import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { TimeZone } from './time-zoner/time-zoner.model';

@Injectable({
  providedIn: 'root'
})
export class TimeZoneService {
  private timeZonesSubj = new Subject<Array<TimeZone>>();
  private timeZones = new Array<TimeZone>();

  get TimeZonesAsObservable() {
    return this.timeZonesSubj.asObservable();
  }
  get TimeZones(): Array<TimeZone> {
    return this.timeZones;
  }
  constructor() { }

  async addNewZone(newCity: string, newOffset: number) {
    if (this.timeZones.find(el => el.city === newCity) == null) {
      this.timeZones.push(new TimeZone(TimeZone.countID, newCity, newOffset));

      TimeZone.countID++;

      this.timeZonesSubj.next(this.timeZones);
    }

  }

  async updateZone(id: number, newCity: string, newOffset: number) {
    const updatingZone = this.timeZones.find(el => el.id === id);
    if (updatingZone != null) {
      updatingZone.city = newCity;
      updatingZone.offset = newOffset;

      this.timeZonesSubj.next(this.timeZones);
    }
  }

  async deleteZone(id: number) {
    const deletingZone = this.timeZones.find(el => el.id === id);
    if (deletingZone != null) {
      this.timeZones.splice(this.timeZones.indexOf(deletingZone), 1);

      this.timeZonesSubj.next(this.timeZones);
    }
  }
}
