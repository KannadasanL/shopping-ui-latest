

import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter} from '@angular/core';
import {Subject} from 'rxjs/Subject';

export class ShoppingListService {

  ingredientAdded = new Subject<Ingredient[]>();
  editIngredient = new Subject<number>();

  private ingredients: Ingredient[] = [];
    /*[
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
*/
  setIngredients(ingredients: Ingredient[]) {
    this.ingredients = ingredients;
    this.ingredientAdded.next(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientAdded.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientAdded.next(this.ingredients.slice());
  }

}
