import { environment } from './../environments/environment';
import { Component, OnInit } from '@angular/core';
import { StarshipService } from './services/starship.service';
import { PilotService } from './services/pilot.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Star Wars';
  ngOnInit(): void {
    this.starshipService.fetchData(`${environment.urlBase}starships/`, undefined);
    this.pilotService.fetchData(`${environment.urlBase}people/`, undefined);
  }

  constructor(private starshipService: StarshipService, private pilotService: PilotService) {
  }
}
