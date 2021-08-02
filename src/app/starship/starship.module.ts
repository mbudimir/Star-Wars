import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StarshipDetailComponent } from './starship-detail/starship-detail.component';
import { StarshipListComponent } from './starship-list/starship-list.component';
import { MatCardModule, MatListModule, MatTableModule } from '@angular/material';

@NgModule({
  declarations: [
    StarshipDetailComponent,
    StarshipListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: StarshipListComponent },
      { path: ':id', component: StarshipDetailComponent },
    ]),
    MatCardModule,
    MatListModule,
    MatTableModule
  ]
})
export class StarshipModule { }
