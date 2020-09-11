import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RaceModel, LiveRaceModel } from './models/race.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { PonyWithPositionModel } from './models/pony.model';
import { map, takeWhile } from 'rxjs/operators';
import { WsService } from './ws.service';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private http: HttpClient, private wsService: WsService) { }

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

  live(raceId: number): Observable<Array<PonyWithPositionModel>> {
    return this.wsService.connect<LiveRaceModel>(`/race/${raceId}`).pipe(
      takeWhile(liveRace => liveRace.status !== 'FINISHED'),
      map(liveRace => liveRace.ponies)
      );
  }

  boost(raceId: number, ponyId: number) {
    return this.http.post<RaceModel>(`${environment.baseUrl}/api/races/${raceId}/boosts`, { ponyId });
  }
}
