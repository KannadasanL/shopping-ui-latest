import {Component, Injectable} from '@angular/core';
import {DataStorageService} from '../../shared/data.storage.service';
import {Response} from '@angular/http';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

@Injectable()
export class HeaderComponent {

  constructor (private dataService: DataStorageService,
               private authService: AuthService,
               private router: Router) {}

  onSaveData() {
    this.dataService.storeRecipes()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
    this.dataService.storeIngredients()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }

  onFetchData() {
    this.dataService.getRecipes();
    this.dataService.getIngredients();
  }

  onLogOut() {
    this.authService.onLogout();
    this.router.navigate(['/signin']);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
