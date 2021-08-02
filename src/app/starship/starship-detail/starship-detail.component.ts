import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StarshipService } from 'src/app/services/starship.service';
import { Starship } from '../models/Starship';
import { filter, take} from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { PilotService } from 'src/app/services/pilot.service';
import { Pilot } from 'src/app/pilot/models/Pilot';

@Component({
  selector: 'app-starship-detail',
  templateUrl: './starship-detail.component.html',
  styleUrls: ['./starship-detail.component.scss']
})
export class StarshipDetailComponent implements OnInit {
  starship: Starship;
  starshipAction$ = this.starshipService.starshipSubject$.asObservable();
  pilots$ = this.pilotServices.pilotsSubject$.asObservable();
  pilots: Pilot[] = [];

  constructor(private route: ActivatedRoute, private starshipService: StarshipService,
              private pilotServices: PilotService, private router: Router ) { }

  ngOnInit() {
    combineLatest([
    this.pilots$, this.starshipAction$, this.route.params
    ]).pipe(
      filter(([pilots, starships, param]) => !!pilots && !!starships),
      take(1)
    ).subscribe(([pilots, st, param]) => {
      this.starship = st.find(s => s.id === +param.id );
      this.pilots = pilots.filter(o => st.find(s => s.id === +param.id ).pilots.includes(o.url));
    });
  }

  goPilotDetail(id: number) {
    this.router.navigateByUrl(`/pilots/${id}`);
  }
}
