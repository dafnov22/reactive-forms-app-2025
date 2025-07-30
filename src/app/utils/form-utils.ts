import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

// Simula una llamada al servidor para verificar la validez de un campo
// En un caso real, aquí se haría una llamada HTTP a un servicio
// Espera 2.5 segundos antes de resolver true
async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  });
}

export class FormUtils {
  // Expresiones regulares
  static namePattern = '^([a-zA-Z]+) ([a-zA-Z]+)$';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres.`;

        case 'min':
          return `Valor mínimo de ${errors['min'].min}`;

        case 'email':
          return 'El formato no es válido';

        case 'emailTaken':
          return 'El email ya está en uso';

        case 'notStrider':
          return 'El username no puede ser strider';

        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return 'El email no es válido';
          }
          return 'El formato del email no es válido';

        case 'notOnlySpaces':
          return 'No puede contener solo espacios en blanco';

        default:
          return 'Campo inválido';
      }
    }

    return null;
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFieldErrorInArray(
    formArray: FormArray,
    index: number
  ): string | null {
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static isFieldOneEqualFieldTwo(fieldOne: string, fieldTwo: string) {
    return (formGroup: AbstractControl) => {
      const valueOne = formGroup.get(fieldOne)?.value;
      const valueTwo = formGroup.get(fieldTwo)?.value;

      return valueOne === valueTwo ? null : { passwordsNotEqual: true };
    };
  }

  static async checkingServerResponse(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    // Simulación de una llamada al servidor

    await sleep(); // Espera 2.5 segundos

    const formValue = control.value;

    if (formValue === 'hola@mundo.com') {
      return { emailTaken: true };
    }

    return null;
  }

  static notStrider(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    return value === 'strider' ? { notStrider: true } : null;
  }
}

// FormUtils.isValidField()
