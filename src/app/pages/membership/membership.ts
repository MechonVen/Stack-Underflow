import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-membership',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './membership.html',
  styleUrl: './membership.scss',
})
export class Membership implements OnInit {
  membershipForm!: FormGroup;
  formSubmitted = false;
  submitMessage = '';
  isLoading = false;

  benefits: Benefit[] = [
    {
      id: 'networking',
      title: 'Networking Opportunities',
      description: 'Connect with like-minded women professionals and build meaningful relationships in the community.',
      icon: '🤝',
    },
    {
      id: 'mentorship',
      title: 'Mentorship & Development',
      description: 'Gain access to our mentorship program and professional development resources to advance your career.',
      icon: '📚',
    },
    {
      id: 'community',
      title: 'Community Service',
      description: 'Participate in meaningful community service projects that empower women and create positive change.',
      icon: '💪',
    },
    {
      id: 'events',
      title: 'Exclusive Events',
      description: 'Attend member-only events, workshops, and social gatherings throughout the year.',
      icon: '🎉',
    },
    {
      id: 'advocacy',
      title: 'Advocacy & Leadership',
      description: 'Join us in advocating for women\'s rights and take on leadership roles within the organization.',
      icon: '🗣️',
    },
    {
      id: 'resources',
      title: 'Resource Access',
      description: 'Access our library of resources, newsletters, and educational materials for continuous learning.',
      icon: '📖',
    },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.membershipForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      profession: ['', [Validators.required]],
      company: [''],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      whyJoin: ['', [Validators.required, Validators.minLength(20)]],
      agreeToTerms: [false, [Validators.requiredTrue]],
    });
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.membershipForm.invalid) {
      this.submitMessage = 'Please fill out all required fields correctly.';
      return;
    }

    this.isLoading = true;

    const formData = this.membershipForm.value;
    const emailBody = this.generateEmailBody(formData);
    const subject = `Zonta Club Naples Membership Application - ${formData.firstName} ${formData.lastName}`;
    const mailtoLink = `mailto:membership@zontanaples.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    setTimeout(() => {
      const link = document.createElement('a');
      link.href = mailtoLink;
      link.click();
      this.isLoading = false;
      this.submitMessage = 'Check your email client to send the application.';
    }, 100);
  }

  private generateEmailBody(formData: any): string {
    return `
Membership Application Form

Personal Information:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}

Professional Information:
Profession: ${formData.profession}
Company: ${formData.company}

Address Information:
Address: ${formData.address}
City: ${formData.city}
State: ${formData.state}
Zip Code: ${formData.zipCode}

Why Do You Want to Join Zonta Club of Naples?
${formData.whyJoin}

---
This application was submitted through the Zonta Club of Naples website.
    `.trim();
  }

  resetForm() {
    this.membershipForm.reset();
    this.formSubmitted = false;
    this.submitMessage = '';
  }

  get f() {
    return this.membershipForm.controls;
  }
}
