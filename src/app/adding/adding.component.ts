import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TimeZoneService } from '../time-zone.service';

@Component({
  selector: 'app-adding',
  templateUrl: './adding.component.html',
  styleUrls: ['./adding.component.css']
})
export class AddingComponent implements OnInit {
  AddNewZoneGroup: FormGroup = new FormGroup({
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
  constructor(private _timeZoneService: TimeZoneService) { }

  ngOnInit() { }
  async addNewZone() {
    if (this.AddNewZoneGroup.valid) {
      await this._timeZoneService.addNewZone(this.AddNewZoneGroup.controls['cityName'].value,
        this.AddNewZoneGroup.controls['zone'].value);
    }
  }
}


