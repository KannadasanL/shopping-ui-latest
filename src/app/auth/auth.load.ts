import {CanLoad, Route} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthLoad implements CanLoad {

  constructor(private authService: AuthService) {}
  canLoad(route: Route): Observable<boolean> |
                         Promise<boolean> |
                          boolean {


    const token = this.authService.getToken();
    return this.authService.canLoadChildren(token, route);

    // return this.authService.isAuthenticated();
  }
}
