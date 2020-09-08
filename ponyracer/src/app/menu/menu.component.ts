import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { UserModel } from '../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy  {
  userEventsSubscription: Subscription;
  navbarCollapsed = true;
  user: UserModel;

  constructor(private userService: UserService) { }

  ngOnDestroy(): void {
    if ( this.userEventsSubscription ) {
        this.userEventsSubscription.unsubscribe();
      }
  }

  ngOnInit() {
   this.userEventsSubscription = this.userService.userEvents.subscribe(
      (userModel) => {
        this.user = userModel;
      });
  }

  toggleNavbar() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }
}
