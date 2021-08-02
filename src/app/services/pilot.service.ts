import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { catchError, share, shareReplay } from 'rxjs/operators';
import { Pilot, PilotResult } from '../pilot/models/Pilot';


@Injectable({
  providedIn: 'root'
})
export class PilotService {
  pilotsSubject$ = new BehaviorSubject<Pilot[]>(null);


  constructor(private http: HttpClient) { }

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

  fetchData(url: string, pilots: Pilot[]) {
    this.http.get<PilotResult>(url)
    .pipe(share(), shareReplay(1), catchError(this.handleError))
    .subscribe(data => {
      if (pilots === undefined) {
        pilots = data.results.map((res: Pilot) => ({
            ...res, id: this.getIdByUrl(res.url)
          }) as Pilot);
      } else {
        pilots = pilots.concat(data.results.map((res: Pilot) => ({
            ...res, id: this.getIdByUrl(res.url)
          }) as Pilot));
      }
      if (data.next != null) {
        this.fetchData(data.next, pilots);
      } else {
        this.pilotsSubject$.next(pilots);
      }
    });
  }
}
