
import 'rxjs/Rx';


import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Ingredient} from './ingredient.model';
import {AuthService} from '../auth/auth.service';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class DataStorageService {

  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private slService: ShoppingListService,
              private authService: AuthService) {}
  storeRecipes() {
    const token = this.authService.getToken();
    return this.httpClient.put('https://ng-shoppingui1.firebaseio.com/recipes.json?auth=' + token,
      this.recipeService.getRecipes());
  }

  getRecipes() {

    const token = this.authService.getToken();

     this.httpClient.get<Recipe[]>('https://ng-shoppingui1.firebaseio.com/recipes.json?auth=' + token)
      .map(
        (recipes) => {
          // const recipes: Recipe[] = response.json();
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }

          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }

/*  getRecipes() {
    return this.http.get('https://ng-shoppingui1.firebaseio.com/recipes.json')
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }

          return recipes;
        }
      );
  }*/

  storeIngredients() {
    const token = this.authService.getToken();
    return this.httpClient.put('https://ng-shoppingui1.firebaseio.com/ingredients.json?auth=' + token,
      this.slService.getIngredients());
  }

  getIngredients() {
    const token = this.authService.getToken();
    this.httpClient.get<Ingredient[]>('https://ng-shoppingui1.firebaseio.com/ingredients.json?auth=' + token)
      .subscribe(
        (ingredients) => {
           //  const ingredients: Ingredient[] = response.json();
            this.slService.setIngredients(ingredients);
        }
      );
  }

/*  getIngredients() {
    return this.http.get('https://ng-shoppingui1.firebaseio.com/ingredients.json')
      .map(
        (response: Response) => {
          const ingredients: Ingredient[] = response.json();
          return ingredients;
        }
      );
  }*/
}
