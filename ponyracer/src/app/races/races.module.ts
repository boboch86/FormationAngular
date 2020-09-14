import { NgModule } from '@angular/core';

import { RacesComponent } from '../races/races.component';
import { RaceComponent } from '../race/race.component';
import { PonyComponent } from '../pony/pony.component';
import { FromNowPipe } from '../from-now.pipe';
import { BetComponent } from '../bet/bet.component';
import { LiveComponent } from '../live/live.component';
import { PendingRacesComponent } from '../races/pending-races/pending-races.component';
import { FinishedRacesComponent } from '../races/finished-races/finished-races.component';
import { RouterModule } from '@angular/router';
import { RACES_ROUTES } from './races.routes';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RacesComponent,
    RaceComponent,
    PonyComponent,
    FromNowPipe,
    BetComponent,
    LiveComponent,
    PendingRacesComponent,
    FinishedRacesComponent,
  ],
  imports: [
    // BrowserModule,
    // HttpClientModule,
    // RouterModule.forRoot(ROUTES),
    // ReactiveFormsModule,
    RouterModule.forChild(RACES_ROUTES),
    CommonModule,
    SharedModule
    // FormsModule
  ],
  // providers: [{ provide: HTTP_INTERCEPTORS, useExisting: JwtInterceptorService, multi: true }],
  // bootstrap: [AppComponent]
})
export class RacesModule { }
