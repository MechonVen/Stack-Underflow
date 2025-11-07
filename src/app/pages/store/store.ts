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
      description: 'Classic Zonta Club Naples branded shirt. High-quality cotton blend for comfort and durability.',
      price: 25.00,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    },
    {
      id: 'zonta-mug',
      name: 'Zonta Mug',
      description: 'Perfect for your morning coffee. Dishwasher safe ceramic mug with Zonta Club Naples logo.',
      price: 12.00,
      image: 'https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=400&h=400&fit=crop',
    },
    {
      id: 'zonta-pen',
      name: 'Zonta Pen',
      description: 'Premium writing instrument. Smooth ballpoint pen with Zonta Club branding.',
      price: 8.00,
      image: 'https://images.unsplash.com/photo-1595521624512-a8247dd4d3f1?w=400&h=400&fit=crop',
    },
  ];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadStripeScript();
    }
  }

  private loadStripeScript() {
    if (!(window as any).Stripe) {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.async = true;
      document.head.appendChild(script);
    }
  }

  async checkout(product: Product) {
    const stripe = (window as any).Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

    if (!stripe) {
      console.error('Stripe failed to load');
      return;
    }

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: product.id,
        productName: product.name,
        productPrice: product.price,
        productImage: product.image,
      }),
    }).catch(() => {
      this.handleDirectCheckout(product);
      return null;
    });

    if (response && response.ok) {
      const session = await response.json();
      stripe.redirectToCheckout({ sessionId: session.sessionId });
    }
  }

  private handleDirectCheckout(product: Product) {
    const message = `${product.name} - $${product.price.toFixed(2)}. Please proceed with payment using your preferred method.`;
    alert(message);
  }
}
