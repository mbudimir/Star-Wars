import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PilotService } from 'src/app/services/pilot.service';


@Component({
  selector: 'app-pilot-list',
  templateUrl: './pilot-list.component.html',
  styleUrls: ['./pilot-list.component.scss']
})
export class PilotListComponent {
  pilotAction$ = this.pilotServices.pilotsSubject$.asObservable();

  constructor(private pilotServices: PilotService,
              private route: Router) { }

  goDetail(id: number) {
    this.route.navigateByUrl(`/pilots/${id}`);
  }

}
