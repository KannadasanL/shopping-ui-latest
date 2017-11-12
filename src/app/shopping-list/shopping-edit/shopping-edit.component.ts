import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output, OnDestroy
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
/*  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;*/
//  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  @ViewChild('f') form: NgForm;

  subscription: Subscription;

  editMode = false;
  editItem: number;
  editIngredient: Ingredient;


  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.editIngredient.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editItem = index;
        this.editIngredient = this.slService.getIngredient(index);

        this.form.setValue({
          name: this.editIngredient.name,
          amount: this.editIngredient.amount
        });

      }
    );
  }

/*  onAddItem() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
//    this.ingredientAdded.emit(newIngredient);
    this.slService.addIngredient(newIngredient);
  }*/

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.slService.updateIngredient(this.editItem, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

/*
  onClear(form: NgForm) {
    form.reset();
  }
*/

  onClear() {
    this.editMode = false;
    this.form.reset();
  }

  onDelete() {
    this.slService.deleteIngredient(this.editItem);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
