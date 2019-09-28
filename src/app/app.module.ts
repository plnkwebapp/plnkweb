import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RegionDialogComponent } from './region-dialog/region-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { LocationSelectComponent } from './location-select/location-select.component';
import { createCustomElement } from '@angular/elements';
@NgModule({
  declarations: [
    AppComponent,
    RegionDialogComponent,
    LocationSelectComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatRippleModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [RegionDialogComponent, LocationSelectComponent]
})
export class AppModule {
  constructor(injector: Injector){
    const el = createCustomElement(LocationSelectComponent, {injector});
    customElements.define("location-select", el);
  }
}
