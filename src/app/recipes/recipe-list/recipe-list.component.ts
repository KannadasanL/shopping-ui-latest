import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';

import { Recipe } from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {DataStorageService} from '../../shared/data.storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']

})
export class RecipeListComponent implements OnInit, OnDestroy {
 // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];

  subscription: Subscription;
    /*= [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
    new Recipe('Another Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')
  ];*/

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private dlService: DataStorageService) { }

  ngOnInit() {

    this.subscription = this.recipeService.recipeChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );

     this.recipes = this.recipeService.getRecipes();
/*     this.dlService.getRecipes()
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );*/
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
