import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
  styles: ``,
})
export class CountryPageComponent {
  fb = inject(FormBuilder);
  countryService = inject(CountryService);

  regions = signal<string[]>(this.countryService.regions);
  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  countryForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  onFormChanged = effect((onCleanup) => {
    const regionSubscription = this.onRegionChanged();
    const countrySubscription = this.onCountryChanged();

    onCleanup(() => {
      regionSubscription.unsubscribe();
      countrySubscription.unsubscribe();
      console.log('limpiado');
    });
  });

  onRegionChanged() {
    return this.countryForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => this.countryForm.get('country')!.setValue('')),
        tap(() => this.countryForm.get('border')!.setValue('')),
        tap(() => {
          this.countriesByRegion.set([]);
          this.borders.set([]);
        }),
        switchMap((region) =>
          this.countryService.getCountriesByRegion(region ?? '')
        )
      )
      .subscribe((countries) => {
        this.countriesByRegion.set(countries);
      });
  }

  onCountryChanged() {
    return this.countryForm
      .get('country')!
      .valueChanges.pipe(
        tap(() => this.countryForm.get('border')!.setValue('')),
        filter((value) => value!.length > 0),
        switchMap((countryCode) =>
          this.countryService.getCountryByAlphaCode(countryCode ?? '')
        ),
        switchMap((country) =>
          this.countryService.getCountryNamesByCodeArray(country.borders)
        )
      )
      .subscribe((borders) => {
        this.borders.set(borders);
      });
  }
}
