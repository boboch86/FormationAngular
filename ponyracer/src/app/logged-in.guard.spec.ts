import { fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { LoggedInGuard } from './logged-in.guard';
import { UserService } from './user.service';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

describe('LoggedInGuard', () => {
  let appComponentFixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule
      ]
    });

    appComponentFixture = TestBed.createComponent(AppComponent);
    appComponentFixture.detectChanges();
  });

  it('should allow activation if user is logged in', () => {
    const userService: UserService = TestBed.get(UserService);
    spyOn(userService, 'isLoggedIn').and.returnValue(true);

    const guard: LoggedInGuard = TestBed.get(LoggedInGuard);
    expect(guard.canActivate(undefined, undefined)).toBe(true);
  });

  it('should forbid activation if user is not logged in, and navigate to home', () => {
    const userService: UserService = TestBed.get(UserService);
    spyOn(userService, 'isLoggedIn').and.returnValue(false);

    const router: Router = TestBed.get(Router);
    spyOn(router, 'navigate');

    const guard: LoggedInGuard = TestBed.get(LoggedInGuard);
    expect(guard.canActivate(undefined, undefined)).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should be applied to the races route', fakeAsync(() => {
    const guard: LoggedInGuard = TestBed.get(LoggedInGuard);
    spyOn(guard, 'canActivate').and.returnValue(false);

    const router: Router = TestBed.get(Router);
    router.navigateByUrl('/races');

    tick();
    appComponentFixture.detectChanges();
    expect(guard.canActivate).toHaveBeenCalled();
  }));
});
