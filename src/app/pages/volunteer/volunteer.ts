import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-volunteer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './volunteer.html',
  styleUrl: './volunteer.scss',
})
export class Volunteer {
  @ViewChild('volunteerFormElement') volunteerFormElement?: ElementRef<HTMLFormElement>;

  volunteerForm: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.volunteerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      availability: ['', Validators.required],
      interests: ['', Validators.required],
      comments: [''],
      agreeToContact: [false, Validators.requiredTrue],
    });
  }

  get f() {
    return this.volunteerForm.controls;
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.volunteerForm.invalid) {
      return;
    }

    // Let the browser submit the form directly to Formspree
    if (this.volunteerFormElement) {
      this.volunteerFormElement.nativeElement.submit();
    }
  }

  resetForm() {
    this.volunteerForm.reset();
    this.formSubmitted = false;
  }
}
