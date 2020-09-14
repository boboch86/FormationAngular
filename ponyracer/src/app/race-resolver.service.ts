import { Injectable } from '@angular/core';
import { RaceModel } from './models/race.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RaceService } from './race.service';

@Injectable({
  providedIn: 'root'
})
export class RaceResolverService implements Resolve<RaceModel> {

  constructor(private raceService: RaceService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : RaceModel | import('rxjs').Observable<RaceModel> | Promise<RaceModel> {
    const raceId = +route.paramMap.get('raceId');
    return this.raceService.get(raceId);
  }
}
