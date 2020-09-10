import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RaceModel } from './models/race.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private http: HttpClient) { }

  list(): Observable<Array<RaceModel>> {
    const params = { status: 'PENDING' };
    return this.http.get<Array<RaceModel>>(`${environment.baseUrl}/api/races`, { params });
  }

  bet(raceId: number, ponyId: number): Observable<RaceModel> {
    return this.http.post<RaceModel>(`${environment.baseUrl}/api/races/${raceId}/bets`, { ponyId });
  }

  get(raceId: number): Observable<RaceModel> {
     return this.http.get<RaceModel>(`${environment.baseUrl}/api/races/${raceId}`);
  }

  cancelBet(raceId: number) {
    return this.http.delete(`${environment.baseUrl}/api/races/${raceId}/bets`);
  }
}
