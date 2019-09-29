import { Component, OnInit, ElementRef } from '@angular/core';
import { RegionDialogComponent } from './region-dialog/region-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Location } from './models/Location';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  linkUrl: string = "prices.html";
  saveLocation: boolean = false;

  constructor(private elRef: ElementRef, public dialog: MatDialog, private data: DataService){
    let prop = this.elRef.nativeElement.getAttribute('link-url');
    if (prop) {
      this.linkUrl = prop;
    }

    prop = this.elRef.nativeElement.getAttribute('save-location');
    if (prop) {
      this.saveLocation = (<string>prop).toLowerCase().startsWith("y");
    }

    prop = this.elRef.nativeElement.getAttribute('locations');
    if (prop) {
      var locations = (<string>prop).split('|');
      this.data.addLocations(locations.map(i => {
        var parts = i.split(';');
        return {
          state: parts[0],
          id: parts[1],
          landingPage: parts[2]
        };
      }));
    }
  }

  anchorClicked(){
    var savedLocation = localStorage.getItem("selected-location");
    if (savedLocation && this.saveLocation){
      window.open(savedLocation, "_self");
      return;
    }

    const dialogRef = this.dialog.open(RegionDialogComponent, {
      width: '400px',
      data: { locations: this.data.locations }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        var location = <Location>result;
        localStorage.setItem("selected-location", location.landingPage);
        window.open(location.landingPage, "_self");
      }
    });
  }

  ngOnInit() {
    var anchors = document.getElementsByTagName("a");
    for(var i = 0; i < anchors.length; i++){
      let anchor = anchors[i];
      if (anchor.href.endsWith(this.linkUrl)){
        anchor.setAttribute("href", "javascript:void(0);");
        anchor.addEventListener("click", (e:Event) => {
          this.anchorClicked();
          return false;
        });
        //break;
      }
    }

    // var select = <HTMLSelectElement>document.getElementById('location-select');
    // if (select){
    //   //var onPricingPage = false;
    //   var options = [];
    //   this.data.locations.forEach(i => {
    //     var option = document.createElement('option');
    //     option.text = `${i.id}, ${i.state}`;
    //     option.value = i.landingPage;

    //     if (window.location.href.toLowerCase().includes(i.landingPage.toLowerCase())){
    //       option.setAttribute("selected", "true");
    //      // onPricingPage = true;
    //     }

    //     options.push(option);
    //   });

    //   // if (!onPricingPage){
    //   //   var blank = document.createElement('option');
    //   //   blank.text = "";
    //   //   blank.setAttribute("selected", "true");
    //   //   select.add(blank);
    //   // }

    //   options.forEach(i => select.add(i));

    //   select.onchange = (i) => {
    //     if (select.value){
    //       window.open(select.value);
    //     }
    //   };
    // }
  }
}
