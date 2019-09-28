import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Location } from '../models/Location';

@Component({
  selector: 'app-location-select',
  templateUrl: './location-select.component.html',
  styleUrls: ['./location-select.component.css']
})
export class LocationSelectComponent implements OnInit {
  locations: Location[];
  selected: string = "";

  constructor(public data: DataService) { 
    data.locationsPromise.then(i => {
      this.locations = <Location[]>i;
      this.locations.forEach(j => {
        if (window.location.href.toLowerCase().includes(j.landingPage.toLowerCase())){
          this.selected = j.landingPage;
          return;
        }
      });
    });
  }

  selectLocation($event){
    if (this.selected){
      window.open(this.selected, "_self");
    }
  }

  ngOnInit() {
  }

}
