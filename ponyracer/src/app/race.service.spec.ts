import { fakeAsync, tick, TestBed } from '@angular/core/testing';

import { RaceService } from './race.service';
import { RaceModel } from './models/race.model';

describe('RaceService', () => {

  let service: RaceService;

  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => service = TestBed.get(RaceService));

  it('should list races', fakeAsync(() => {
    let fetchedRaces: Array<RaceModel> = [];
    const observable = service.list();
    observable.subscribe((races: Array<RaceModel>) => fetchedRaces = races);

    tick(200);

    expect(fetchedRaces.length).toBe(0, 'The service should return the races after a 500ms delay');

    tick(400);

    expect(fetchedRaces.length).toBe(5, 'The service should return five races in an Observable for the `list()` method after 500ms');
  }));

});
