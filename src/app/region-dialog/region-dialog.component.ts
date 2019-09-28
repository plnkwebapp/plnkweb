import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Location } from '../models/Location';
import { RegionalDialogData } from '../models/RegionDialogData';

@Component({
  selector: 'app-region-dialog',
  templateUrl: './region-dialog.component.html',
  styleUrls: ['./region-dialog.component.css']
})
export class RegionDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RegionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RegionalDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  selectLocation(location: Location){
    this.dialogRef.close(location);
  }
}
