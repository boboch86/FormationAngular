import { PonyModel, PonyWithPositionModel } from './pony.model';

export interface RaceModel {
    name: string;
    ponies: PonyModel[];
    id: number;
    startInstant: string;
    betPonyId?: number;
    status?: 'PENDING' | 'RUNNING' | 'FINISHED';
  }

  export interface LiveRaceModel {
    ponies: Array<PonyWithPositionModel>;
    status: 'PENDING' | 'RUNNING' | 'FINISHED';
  }
