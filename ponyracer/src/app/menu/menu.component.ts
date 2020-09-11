import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { UserModel } from '../models/user.model';
import { Subscription, of, concat, EMPTY } from 'rxjs';
import { Router } from '@angular/router';
import { switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy  {
  userEventsSubscription: Subscription;
  navbarCollapsed = true;
  user: UserModel;

  constructor(private userService: UserService, private router: Router) { }

  ngOnDestroy(): void {
    if ( this.userEventsSubscription ) {
        this.userEventsSubscription.unsubscribe();
      }
  }

  ngOnInit() {
    this.userEventsSubscription = this.userService.userEvents.pipe(
      switchMap(user => user ?
        concat(of(user), this.userService.scoreUpdates(user.id).pipe(catchError(() => EMPTY))) :
        of(null)
      ))
      .subscribe(userWithScore => this.user = userWithScore);
  }

  toggleNavbar() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  logout(event: Event) {
    event.preventDefault();
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
