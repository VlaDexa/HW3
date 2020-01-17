export class TimeZone {
  constructor(newID: number, newCity: string, newOffset: number) {
    this.id = newID;
    this.city = newCity;
    this.offset = newOffset;
  }
  static countID = 0;
  id: number;
  city: string;
  offset: number;
}
