import { Injectable } from '@angular/core';
import { Location } from './models/Location';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  resolveLocations: any;

  locations: Location[] = [];
  locationsPromise = new Promise((resolve) => {
    this.resolveLocations = resolve;
  });

  constructor() { }

  addLocations(locations: Location[]) {
    this.locations = locations;
    this.resolveLocations(locations);
  }
}
