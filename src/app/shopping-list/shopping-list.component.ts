import {Component, OnDestroy, OnInit} from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs/Subscription';
import {DataStorageService} from '../shared/data.storage.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  subscription: Subscription;
/*    = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];*/

  constructor(private slService: ShoppingListService,
              private dlService: DataStorageService) { }

  ngOnInit() {
     this.ingredients = this.slService.getIngredients();
/*    this.dlService.getIngredients()
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.slService.setIngredients(ingredients);
        }
      );*/

    this.subscription = this.slService.ingredientAdded.subscribe(
      (ingredient: Ingredient[]) => {
        this.ingredients = ingredient;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditIngredient(index: number) {
    this.slService.editIngredient.next(index);
  }

}
