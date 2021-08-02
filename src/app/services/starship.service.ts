import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { throwError, Observable } from 'rxjs';
// tslint:disable-next-line:max-line-length
import { catchError, shareReplay, share } from 'rxjs/operators';
import { Starship, StarshipResult } from '../starship/models/Starship';


@Injectable({
  providedIn: 'root'
})
export class StarshipService {
  starshipSubject$ = new BehaviorSubject<Starship[]>(null);
  starships: Starship[] = [];

  constructor(private http: HttpClient) {
  }

    private handleError(err: any): Observable<never> {
      // in a real world app, we may send the server to some remote logging infrastructure
      // instead of just logging it to the console
      let errorMessage: string;
      if (err.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${err.error.message}`;
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
      }
      console.error(err);
      return throwError(errorMessage);
    }

    private getIdByUrl(url: string): number {
      return +url.split('/')[5];
    }

    fetchData(url: string, starships: Starship[]) {
      this.http.get<StarshipResult>(url)
      .pipe(share(), shareReplay(1), catchError(this.handleError))
      .subscribe(data => {
        if (starships === undefined) {
          starships = data.results.map((res: Starship) => ({
            ...res, id: this.getIdByUrl(res.url)
          }) as Starship);
        } else {
          starships = starships.concat(data.results.map((res: Starship) => ({
            ...res, id: this.getIdByUrl(res.url)
          }) as Starship));
        }
        if (data.next != null) {
          this.fetchData(data.next, starships);
        } else {
          this.starshipSubject$.next(starships);
        }
      });
    }
}
