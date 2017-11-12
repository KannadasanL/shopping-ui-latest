import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {HomeComponent} from './core/home/home.component';



const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
  {path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'},
  {path: 'not-found', component: PageNotFoundComponent}
];

// {path: '', redirectTo: '/recipes', pathMatch: 'full'},
//  {path: '**', redirectTo: '/not-found'}

@NgModule({
imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
exports: [RouterModule]
})
export class AppRoutingModule {

}
