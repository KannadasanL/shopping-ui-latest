
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/auth.guard.service';
import {RecipesEditComponent} from './recipes-edit/recipes-edit.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipesStartComponent} from './recipes-start/recipes-start.component';
import {RecipesComponent} from './recipes.component';


const recipesRoute: Routes = [

  {path: '', component: RecipesComponent,  canActivate: [AuthGuard], children: [
    {path: '', component: RecipesStartComponent},
    {path: 'new', component: RecipesEditComponent, canActivate: [AuthGuard]},
    {path: ':id', component: RecipeDetailComponent},
    {path: ':id/edit', component: RecipesEditComponent, canActivate: [AuthGuard]}
  ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(recipesRoute)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {

}
