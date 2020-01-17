import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { TimeZoneService } from '../time-zone.service';
import { TimeZone } from '../time-zoner/time-zoner.model';


@Component({
  selector: 'app-editer',
  templateUrl: './editer.component.html',
  styleUrls: ['./editer.component.css']
})
export class EditerComponent implements OnInit {
  EditingTimeZone: TimeZone;

  EditZoneGroup: FormGroup;

  constructor(
    private _timeZoneService: TimeZoneService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const timeZoneId = this.route.snapshot.paramMap.get('id');
    this.EditingTimeZone = this._timeZoneService.TimeZones.find(el => el.id === +timeZoneId);

    this.EditZoneGroup = new FormGroup({
      zone: new FormControl('', [
        Validators.required,
        Validators.pattern('(([+]|[-]){1}((([1]{1}[0-2]){1})|(([0-9]{1}))){1}){1}$')
      ]),
      cityName: new FormControl('', [
        Validators.required,
        Validators.maxLength(40),
        Validators.pattern('(([А-я]+)|([A-z]+))+')
      ])
    });
  }

  updateTimeZone() {
    this._timeZoneService.updateZone(this.EditingTimeZone.id,
      this.EditZoneGroup.controls.cityName.value,
      this.EditZoneGroup.controls.offset.value);

    this.router.navigate(['']);
  }

}
