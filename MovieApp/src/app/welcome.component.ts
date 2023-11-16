import { Component, computed, signal } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CanBeDirty } from './models/can-be-dirty';
import { ToUpperPipe } from './pipes/to-upper.pipe';
import { LedComponent } from './controls/led.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgIf, LedComponent,ToUpperPipe],
  templateUrl: './welcome.component.html',
  styles: ``
})
export class WelcomeComponent implements CanBeDirty{
  form: FormGroup = new FormGroup({
    // Elemente im Formular, verknüpft über "formControlName"
    firstNameInForm: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required])
  });

  startColor = "Red";

  isDirty = false;
  firstNameSignal = signal("");
  get firstName(): string { return this.firstNameSignal(); }
  set firstName(value: string) {
    this.firstNameSignal.set(value);
    this.isDirty = (value!="");
  }
  lastNameSignal = signal("");
  get lastName(): string { return this.lastNameSignal(); }
  set lastName(value: string) {
    this.lastNameSignal.set(value);
    this.isDirty = (value!="");
  }

  fullName = computed(() => `${this.firstNameSignal()} ${this.lastNameSignal()}`);
  get fullName2(): string {
    return this.firstName + " " + this.lastName;
  }

  price=22.50;

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      // this.firstName = this.form.controls["firstNameInForm"].value;
      this.isDirty=false;
    }
  }

  ledChanged(newColor: string){
    console.log("Led changed to ", newColor);
  }
}
