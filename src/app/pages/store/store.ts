import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-store',
  imports: [CommonModule],
  templateUrl: './store.html',
  styleUrl: './store.scss',
})
export class Store implements OnInit {
  private platformId = inject(PLATFORM_ID);

  products: Product[] = [
    {
      id: 'zonta-shirt',
      name: 'Zonta Shirt',
      description:
        'Classic Zonta Club Naples branded shirt. High-quality cotton blend for comfort and durability.',
      price: 25.0,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    },
    {
      id: 'zonta-mug',
      name: 'Zonta Mug',
      description:
        'Perfect for your morning coffee. Dishwasher safe ceramic mug with Zonta Club Naples logo.',
      price: 12.0,
      image: 'https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=400&h=400&fit=crop',
    },
    {
      id: 'zonta-pen',
      name: 'Zonta Pen',
      description: 'Premium writing instrument. Smooth ballpoint pen with Zonta Club branding.',
      price: 8.0,
      image: 'https://images.unsplash.com/photo-1595521624512-a8247dd4d3f1?w=400&h=400&fit=crop',
    },
  ];

  cart: CartItem[] = [];
  isProcessingPayment = false;
  paymentError = '';
  paymentMessage = '';

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadStripeScript();
      this.checkPaymentStatusFromUrl();
    }
  }

  get cartItemCount(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  get cartTotal(): number {
    return this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  addToCart(product: Product) {
    const existing = this.cart.find((item) => item.product.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({ product, quantity: 1 });
    }

    this.paymentError = '';
    this.paymentMessage = '';
  }

  increaseQuantity(productId: string) {
    const item = this.cart.find((cartItem) => cartItem.product.id === productId);
    if (item) {
      item.quantity += 1;
    }
  }

  decreaseQuantity(productId: string) {
    const item = this.cart.find((cartItem) => cartItem.product.id === productId);
    if (!item) {
      return;
    }

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      this.removeFromCart(productId);
    }
  }

  removeFromCart(productId: string) {
    this.cart = this.cart.filter((item) => item.product.id !== productId);
  }

  clearCart() {
    this.cart = [];
    this.paymentError = '';
    this.paymentMessage = '';
  }

  private loadStripeScript() {
    if (isPlatformBrowser(this.platformId) && !(window as any).Stripe) {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.async = true;
      document.head.appendChild(script);
    }
  }

  private checkPaymentStatusFromUrl() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const params = new URLSearchParams(window.location.search);

    if (params.get('success') === 'true') {
      this.paymentMessage = 'Thank you for your purchase!';
      this.cart = [];
    } else if (params.get('canceled') === 'true') {
      this.paymentError = 'Payment was canceled. You can try again when you are ready.';
    }
  }

  async checkoutCart() {
    this.paymentError = '';
    this.paymentMessage = '';

    if (this.cart.length === 0) {
      this.paymentError = 'Your cart is empty. Please add items before checking out.';
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

    try {
      const cartItems = this.cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      }));

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems }),
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
      console.error('Store payment error', error);
      this.paymentError =
        'There was a problem starting the payment. Please try again or contact us directly.';
    } finally {
      this.isProcessingPayment = false;
    }
  }
}
