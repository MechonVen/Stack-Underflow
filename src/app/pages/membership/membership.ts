import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
  private platformId = inject(PLATFORM_ID);

  membershipForm!: FormGroup;
  formSubmitted = false;
  submitMessage = '';
  isLoading = false;

  isProcessingPayment = false;
  paymentMessage = '';
  paymentError = '';

  benefits: Benefit[] = [
    {
      id: 'networking',
      title: 'Networking Opportunities',
      description:
        'Connect with like-minded women professionals and build meaningful relationships in the community.',
      icon: '🤝',
    },
    {
      id: 'mentorship',
      title: 'Mentorship & Development',
      description:
        'Gain access to our mentorship program and professional development resources to advance your career.',
      icon: '📚',
    },
    {
      id: 'community',
      title: 'Community Service',
      description:
        'Participate in meaningful community service projects that empower women and create positive change.',
      icon: '💪',
    },
    {
      id: 'events',
      title: 'Exclusive Events',
      description:
        'Attend member-only events, workshops, and social gatherings throughout the year.',
      icon: '🎉',
    },
    {
      id: 'advocacy',
      title: 'Advocacy & Leadership',
      description:
        "Join us in advocating for women's rights and take on leadership roles within the organization.",
      icon: '🗣️',
    },
    {
      id: 'resources',
      title: 'Resource Access',
      description:
        'Access our library of resources, newsletters, and educational materials for continuous learning.',
      icon: '📖',
    },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();

    if (isPlatformBrowser(this.platformId)) {
      this.loadStripeScript();
      this.checkPaymentStatusFromUrl();
    }
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
    const mailtoLink = `mailto:membership@zontanaples.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      emailBody,
    )}`;

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

  private loadStripeScript() {
    if (isPlatformBrowser(this.platformId) && !(window as any).Stripe) {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.async = true;
      document.head.appendChild(script);
    }
  }

  async checkoutMembership() {
    this.formSubmitted = true;
    this.paymentMessage = '';
    this.paymentError = '';

    if (this.membershipForm.invalid) {
      this.paymentError = 'Please fill out all required fields correctly before paying the membership fee.';
      return;
    }

    if (!isPlatformBrowser(this.platformId)) {
      this.paymentError = 'Online payment is only available in a web browser.';
      return;
    }

    let publicKey = '';

    try {
      const keyResponse = await fetch('/api/stripe-public-key');

      if (!keyResponse.ok) {
        throw new Error('Failed to load Stripe configuration');
      }

      const keyData = await keyResponse.json();
      publicKey = keyData.publicKey;
    } catch {
      this.paymentError = 'Payment system is not configured properly. Please contact us.';
      return;
    }

    const stripe = (window as any).Stripe(publicKey);

    if (!stripe) {
      this.paymentError = 'Payment system is not available right now. Please try again later.';
      return;
    }

    this.isProcessingPayment = true;

    const formData = this.membershipForm.value;

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          membership: true,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to start checkout session');
      }

      const session = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId: session.sessionId });

      if (result.error) {
        this.paymentError = result.error.message || 'Unable to redirect to payment page.';
      }
    } catch (error) {
      console.error('Membership payment error', error);
      this.paymentError =
        'There was a problem starting the payment. Please try again or contact membership@zontanaples.org.';
    } finally {
      this.isProcessingPayment = false;
    }
  }

  private checkPaymentStatusFromUrl() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const params = new URLSearchParams(window.location.search);

    if (params.get('success') === 'true') {
      this.paymentMessage = 'Thank you for completing your membership payment.';
    } else if (params.get('canceled') === 'true') {
      this.paymentError = 'Payment was canceled. You can try again when you are ready.';
    }
  }
}
