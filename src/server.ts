import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import https from 'node:https';
import * as dotenv from 'dotenv';

dotenv.config({ path: join(process.cwd(), '.env') });

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(express.json());

app.get('/api/stripe-public-key', (_req, res) => {
  const publicKey = process.env['STRIPE_PUBLIC_KEY'];

  if (!publicKey) {
    res.status(500).json({ error: 'Stripe public key is not configured.' });
    return;
  }

  res.json({ publicKey });
});


app.post('/api/create-checkout-session', (req, res) => {
  const stripeSecretKey = process.env['STRIPE_SECRET_KEY'];

  if (!stripeSecretKey) {
    res.status(500).json({ error: 'Stripe secret key is not configured.' });
    return;
  }

  const { membership, firstName, lastName, email, productName, productPrice, cartItems } =
    req.body as any;

  let successPath = '/store';

  if (membership) {
    successPath = '/membership';
  }

  const origin = `${req.protocol}://${req.get('host')}`;

  const params = new URLSearchParams();
  params.append('mode', 'payment');
  params.append('success_url', `${origin}${successPath}?session_id={CHECKOUT_SESSION_ID}&success=true`);
  params.append('cancel_url', `${origin}${successPath}?canceled=true`);

  if (membership) {
    const itemName = 'Zonta Club of Naples Annual Membership';
    const amountInCents = 15000; // $150.00

    params.append('line_items[0][price_data][currency]', 'usd');
    params.append('line_items[0][price_data][product_data][name]', itemName);
    params.append('line_items[0][price_data][unit_amount]', amountInCents.toString());
    params.append('line_items[0][quantity]', '1');
  } else if (Array.isArray(cartItems) && cartItems.length > 0) {
    cartItems.forEach((item: any, index: number) => {
      const name = typeof item.name === 'string' ? item.name : 'Store Item';
      const price = typeof item.price === 'number' ? item.price : 0;
      const quantity = typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1;

      const amountInCents = Math.round(price * 100);

      params.append(`line_items[${index}][price_data][currency]`, 'usd');
      params.append(`line_items[${index}][price_data][product_data][name]`, name);
      params.append(`line_items[${index}][price_data][unit_amount]`, amountInCents.toString());
      params.append(`line_items[${index}][quantity]`, quantity.toString());
    });
  } else if (productName && typeof productPrice === 'number') {
    const amountInCents = Math.round(productPrice * 100);

    params.append('line_items[0][price_data][currency]', 'usd');
    params.append('line_items[0][price_data][product_data][name]', productName);
    params.append('line_items[0][price_data][unit_amount]', amountInCents.toString());
    params.append('line_items[0][quantity]', '1');
  } else {
    res.status(400).json({ error: 'Invalid checkout request.' });
    return;
  }

  if (email) {
    params.append('customer_email', email);
  }

  if (firstName || lastName) {
    params.append('metadata[applicant_name]', `${firstName || ''} ${lastName || ''}`.trim());
  }

  const options: https.RequestOptions = {
    hostname: 'api.stripe.com',
    path: '/v1/checkout/sessions',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${stripeSecretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const stripeReq = https.request(options, (stripeRes) => {
    let data = '';

    stripeRes.on('data', (chunk) => {
      data += chunk;
    });

    stripeRes.on('end', () => {
      if (stripeRes.statusCode && stripeRes.statusCode >= 200 && stripeRes.statusCode < 300) {
        try {
          const parsed = JSON.parse(data);
          res.json({ sessionId: parsed.id });
        } catch (error) {
          console.error('Error parsing Stripe response', error);
          res.status(500).json({ error: 'Unable to parse Stripe response.' });
        }
      } else {
        console.error('Stripe API error', stripeRes.statusCode, data);
        res.status(500).json({ error: 'Failed to create Stripe Checkout session.' });
      }
    });
  });

  stripeReq.on('error', (error) => {
    console.error('Stripe request error', error);
    res.status(500).json({ error: 'Stripe request failed.' });
  });

  stripeReq.write(params.toString());
  stripeReq.end();
});

app.get('/api/config', (req, res) => {
  const stripePublicKey = process.env['STRIPE_PUBLIC_KEY'] || '';
  res.json({ stripePublicKey });
});


/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
