///<reference path="../shared/data.storage.service.ts"/>


import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app-routing.module';
import {AuthGuard} from '../auth/auth.guard.service';
import {AuthService} from '../auth/auth.service';
import {DataStorageService} from '../shared/data.storage.service';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {RecipeService} from '../recipes/recipe.service';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [RecipeService, ShoppingListService, DataStorageService, AuthService, AuthGuard]
})
export class CoreModule {

}
