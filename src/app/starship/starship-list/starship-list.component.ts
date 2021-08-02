import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StarshipService } from '../../services/starship.service';
import { Starship } from '../models/Starship';

@Component({
  selector: 'app-starship-list',
  templateUrl: './starship-list.component.html',
  styleUrls: ['./starship-list.component.scss']
})
export class StarshipListComponent {
  starships: Starship[] = [];
  starshipAction$ = this.starshipService.starshipSubject$.asObservable();

  constructor(private starshipService: StarshipService, private route: Router) {
  }

  goDetail(id: number) {
    this.route.navigateByUrl(`/starships/${id}`);
  }
}
