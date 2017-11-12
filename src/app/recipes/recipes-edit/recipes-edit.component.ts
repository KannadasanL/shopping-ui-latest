import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;


  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
      }
    );

  }

  onSubmit() {
 /*   const recipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['description'],
      this.recipeForm.value['ingredients']
    );*/

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.onCancel();
   //  this.router.navigate([this.id], {relativeTo: this.route});

  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }


  onAddIngredient() {
  (<FormArray>this.recipeForm.get('ingredients')).push(
    new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    })
  );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm() {

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const editRecipe = this.recipeService.getRecipeById(this.id);
      recipeName = editRecipe.name;
      recipeImagePath = editRecipe.imagePath;
      recipeDescription = editRecipe.description;

      if (editRecipe['ingredients']) {
        for (const ingredient of editRecipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }

    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });


  }

}
