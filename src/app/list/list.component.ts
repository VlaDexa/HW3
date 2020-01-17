import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { TimeZone } from '../time-zoner/time-zoner.model';
import { TimeZoneService } from '../time-zone.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  private timeZoneSubscription: Subscription;
  localZones: Array<TimeZone>;
  cityInput = new FormControl('');
  listOfCitiesOfZones = new Array<string>();
  filteredListOfCitiesOfZones: Observable<string[]>;

  searchedZone: TimeZone = null;
  detectChangesInterval: NodeJS.Timer;
  constructor(private _timeZoneService: TimeZoneService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  this.localZones = this._timeZoneService.TimeZones;

  this.listOfCitiesOfZones = [];
  this.localZones.forEach(el => {
      this.listOfCitiesOfZones.push(el.city);
    });

  this.filteredListOfCitiesOfZones = this.cityInput.valueChanges.pipe(
      startWith(''),
      map(value => {
        if (value === '') {
          this.searchedZone = null;
        }
        return this._filter(value);
      })
    );

  this.timeZoneSubscription = this._timeZoneService.TimeZonesAsObservable.subscribe(data => {
      this.localZones = data;

      this.listOfCitiesOfZones = [];
      this.localZones.forEach(el => {
        this.listOfCitiesOfZones.push(el.city);
      });

      this.filteredListOfCitiesOfZones = this.cityInput.valueChanges.pipe(
        startWith(''),
        map(value => {
          if (value === '') {
            this.searchedZone = null;
          }
          return this._filter(value);
        })
      );
    });

  this.detectChangesInterval = setInterval(() => { this.cdr.detectChanges(); }, 1000);
  }

  getTimeWithOffset(offset: number): string {
    const returingTime: Date = new Date(Date.now());
    returingTime.setHours(returingTime.getHours() + (+offset + +returingTime.getTimezoneOffset() / 60));
    let returtingString = '';
    if (returingTime.getHours() < 10) {
      returtingString += '0' + returingTime.getHours().toString() + ':';
    } else {
      returtingString += returingTime.getHours().toString() + ':';
    }

    if (returingTime.getMinutes() < 10) {
      returtingString += '0' + returingTime.getMinutes().toString() + ':';
    } else {
      returtingString += returingTime.getMinutes().toString() + ':';
    }

    if (returingTime.getSeconds() < 10) {
      returtingString += '0' + returingTime.getSeconds().toString();
    } else {
      returtingString += returingTime.getSeconds().toString();
    }
    return returtingString;
  }

  deleteZone(id: number) {
    this._timeZoneService.deleteZone(id);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.listOfCitiesOfZones.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  GotSearch(ev: any) {
    this.searchedZone = this.localZones.find(el => el.city === ev.option.value);
  }

  ngOnDestroy() {
    clearInterval(this.detectChangesInterval);
    this.timeZoneSubscription.unsubscribe();
  }

}
