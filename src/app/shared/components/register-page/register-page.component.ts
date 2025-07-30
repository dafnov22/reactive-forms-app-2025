import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styles: ``,
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group(
    {
      name: [
        '',
        [Validators.required, Validators.pattern(FormUtils.namePattern)],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(FormUtils.emailPattern)],
        [FormUtils.checkingServerResponse],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(FormUtils.notOnlySpacesPattern),
          FormUtils.notStrider,
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', Validators.required],
    },
    {
      validators: [
        this.formUtils.isFieldOneEqualFieldTwo('password', 'password2'),
      ],
    }
  );

  isValidField(fieldName: string): boolean | null {
    return this.formUtils.isValidField(this.myForm, fieldName);
  }
  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    // Aquí puedes manejar el envío del formulario
    console.log('Formulario enviado:', this.myForm.value);
  }
}
