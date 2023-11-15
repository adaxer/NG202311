import { Component, computed, signal } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './welcome.component.html',
  styles: ``
})
export class WelcomeComponent {
  form: FormGroup = new FormGroup({
    // Elemente im Formular, verknüpft über "formControlName"
    firstNameInForm: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required])
  });

  firstNameSignal = signal("");
  get firstName(): string { return this.firstNameSignal(); }
  set firstName(value: string) { this.firstNameSignal.set(value); }
  lastNameSignal = signal("");
  get lastName(): string { return this.lastNameSignal(); }
  set lastName(value: string) { this.lastNameSignal.set(value); }

  fullName = computed(() => `${this.firstNameSignal()} ${this.lastNameSignal()}`);
  get fullName2(): string {
    return this.firstName + " " + this.lastName;
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if(this.form.valid){
     // this.firstName = this.form.controls["firstNameInForm"].value;
    }
  }
}
