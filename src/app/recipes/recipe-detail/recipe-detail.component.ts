import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../recipe.model';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private slService: ShoppingListService,
              private recipeService: RecipeService,
              private routes: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.routes.params.subscribe(
      (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipeById(this.id);
      }
    );
  }

  addToShoppingList() {
    this.slService.addIngredients(this.recipe.ingredients);
  }

  onEditRecipe() {
     this.router.navigate(['edit'], {relativeTo: this.routes});
   //  this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.routes});

  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.routes});
  }
}
