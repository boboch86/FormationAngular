import { Component, OnInit, Input } from '@angular/core';
import { RaceModel } from '../models/race.model';

@Component({
  selector: 'pr-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css'],
  template: `
  <div>
  <h2>{{ raceModel.name }}</h2>
  <ul>
    <li *ngFor="let pony of raceModel.ponies">{{ pony.name }}</li>
  </ul>
</div>
  `
})

export class RaceComponent implements OnInit {
  constructor() { }
  @Input() raceModel: RaceModel;
  ngOnInit() {
  }

}
