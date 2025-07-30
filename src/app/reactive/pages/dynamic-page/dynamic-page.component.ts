import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
  styles: ``,
})
export class DynamicPageComponent {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    //lo de abajo es un FormArray, es un array de controles o elementos
    //cada elemento del array es un FormControl
    favoriteGames: this.fb.array(
      [
        ['Metal Gear', Validators.required],
        ['Death Stranding', Validators.required],
      ],
      Validators.minLength(2)
    ),
  });

  // crear un nuevo control de manera aislada o independiente
  newFavorite = new FormControl('', Validators.required);
  // newFavorite = this.fb.control([])

  // Método para agregar un nuevo juego favorito
  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddToFavorites() {
    if (this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;

    this.favoriteGames.push(this.fb.control(newGame, Validators.required));

    this.newFavorite.reset();
  }

  onDeleteFavorite(index: number) {
    // Elimina el elemento correctamente del FormArray
    this.favoriteGames.removeAt(index);
  }

  // trackBy para evitar problemas visuales al eliminar
  trackByIndex(index: number, obj: any): any {
    return index;
  }

  onSubmit() {
    console.log(this.myForm.value);
    this.myForm.markAllAsTouched();
  }

  asFormControl(control: AbstractControl): FormControl {
    return control as FormControl;
  }
}
