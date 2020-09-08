import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { UserModel } from '../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  user: UserModel;
  userEventsSubscription: Subscription;

  constructor(private userService: UserService) { }

  ngOnDestroy(): void {
    if (this.userEventsSubscription) {
      this.userEventsSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.userEventsSubscription = this.userService.userEvents.subscribe((userModel: UserModel) => this.user = userModel);
  }

}
