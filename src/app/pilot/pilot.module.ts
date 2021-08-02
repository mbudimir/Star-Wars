import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatListModule } from '@angular/material';

import { PilotDetailComponent } from './pilot-detail/pilot-detail.component';
import { PilotListComponent } from './pilot-list/pilot-list.component';


@NgModule({
  declarations: [
    PilotDetailComponent,
    PilotListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: PilotListComponent },
      { path: ':id', component: PilotDetailComponent },
    ]),
    MatCardModule,
    MatListModule
  ],
  exports: [
    PilotListComponent
  ]
})
export class PilotModule { }
