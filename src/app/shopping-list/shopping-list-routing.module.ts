
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/auth.guard.service';
import {ShoppingListComponent} from './shopping-list.component';

const shoppingListRoutes: Routes = [
  {path: '', component: ShoppingListComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(shoppingListRoutes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule {}
