import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Pilot } from '../models/Pilot';
import { PilotService } from 'src/app/services/pilot.service';


@Component({
  selector: 'app-pilot-detail',
  templateUrl: './pilot-detail.component.html',
  styleUrls: ['./pilot-detail.component.scss']
})
export class PilotDetailComponent implements OnInit {
  pilot: Pilot;
  pilotAction$ = this.pilotService.pilotsSubject$.asObservable();

  constructor(private route: ActivatedRoute, private pilotService: PilotService) { }

  ngOnInit() {
    this.pilotAction$.pipe(filter(x => !!x)).subscribe(st => {
      this.pilot = st.find(s => s.id === +this.route.snapshot.params.id );
    });
  }

}
