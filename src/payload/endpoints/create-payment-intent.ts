import Stripe from 'stripe';
import { PayloadHandler } from 'payload/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-08-01',
});

const dummyProduct = {
  id: 'dummy-product-001',
  title: 'Dummy Product',
  price: 1999,
  stripeProductID: 'prod_dummy123',
  stripePriceID: 'price_dummy456',
  description: 'This is a dummy product for testing purposes',
  image: '/path/to/dummy-image.jpg'
};

export const createPaymentIntent: PayloadHandler = async (req, res) => {
  const { user, payload } = req;
  const { saveCard } = req.body;

  if (!user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const fullUser = await payload.findByID({
      collection: 'users',
      id: user?.id,
    });

    if (!fullUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    let stripeCustomerID = fullUser?.stripeCustomerID;

    if (!stripeCustomerID) {
      const customer = await stripe.customers.create({
        email: fullUser?.email,
        name: fullUser?.name,
      });

      stripeCustomerID = customer.id;

      await payload.update({
        collection: 'users',
        id: user?.id,
        data: {
          stripeCustomerID,
        },
      });
    }

    const total = dummyProduct.price;

    if (total === 0) {
      res.status(400).json({ error: 'There is nothing to pay for, add some items to your cart and try again.' });
      return;
    }

    const paymentIntentParams: Stripe.PaymentIntentCreateParams = {
      customer: stripeCustomerID,
      amount: total,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    };

    if (saveCard) {
      paymentIntentParams.setup_future_usage = 'off_session';
    }

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentParams);

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      amount: total,
      currency: 'usd'
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Error creating PaymentIntent: ${message}`);
    res.status(500).json({ error: message });
  }
};

export const getSavedCards: PayloadHandler = async (req, res) => {
  const { user, payload } = req;

  if (!user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const fullUser = await payload.findByID({
      collection: 'users',
      id: user?.id,
    });

    if (!fullUser || !fullUser.stripeCustomerID) {
      res.status(404).json({ error: 'User or Stripe customer not found' });
      return;
    }

    const paymentMethods = await stripe.paymentMethods.list({
      customer: fullUser.stripeCustomerID,
      type: 'card',
    });

    const savedCards = paymentMethods.data.map(method => ({
      id: method.id,
      brand: method.card.brand,
      last4: method.card.last4,
      expMonth: method.card.exp_month,
      expYear: method.card.exp_year,
    }));

    res.status(200).json({ savedCards });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    payload.logger.error(`Error fetching saved cards: ${message}`);
    res.status(500).json({ error: message });
  }
};

export const payWithSavedCard: PayloadHandler = async (req, res) => {
  const { user, payload } = req;
  const { paymentMethodId } = req.body;

  if (!user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const fullUser = await payload.findByID({
      collection: 'users',
      id: user?.id,
    });

    if (!fullUser || !fullUser.stripeCustomerID) {
      res.status(404).json({ error: 'User or Stripe customer not found' });
      return;
    }

    const total = dummyProduct.price;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'usd',
      customer: fullUser.stripeCustomerID,
      payment_method: paymentMethodId,
      off_session: true,
      confirm: true,
    });

    res.status(200).json({ success: true, paymentIntentId: paymentIntent.id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    payload.logger.error(`Error processing payment with saved card: ${message}`);
    res.status(500).json({ error: message });
  }
};

export const deleteSavedCard: PayloadHandler = async (req, res) => {
  const { user, payload } = req;
  const { paymentMethodId } = req.body;

  if (!user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const fullUser = await payload.findByID({
      collection: 'users',
      id: user?.id,
    });

    if (!fullUser || !fullUser.stripeCustomerID) {
      res.status(404).json({ error: 'User or Stripe customer not found' });
      return;
    }

    await stripe.paymentMethods.detach(paymentMethodId);

    res.status(200).json({ success: true, message: 'Card deleted successfully' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    payload.logger.error(`Error deleting saved card: ${message}`);
    res.status(500).json({ error: message });
  }
};

export const createCustomer: PayloadHandler = async (req, res) => {
  const { email, name } = req.body;

  try {
    const customer = await stripe.customers.create({
      email,
      name,
    });

    res.status(200).json({ customerId: customer.id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};

export const updateCustomer: PayloadHandler = async (req, res) => {
  const { customerId, email, name } = req.body;

  try {
    const customer = await stripe.customers.update(customerId, {
      email,
      name,
    });

    res.status(200).json({ customer });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};

export const deleteCustomer: PayloadHandler = async (req, res) => {
  const { customerId } = req.body;

  try {
    const deleted = await stripe.customers.del(customerId);

    res.status(200).json({ deleted });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};

export const createProduct: PayloadHandler = async (req, res) => {
  const { name, description, images } = req.body;

  try {
    const product = await stripe.products.create({
      name,
      description,
      images,
    });

    res.status(200).json({ product });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};

export const createPrice: PayloadHandler = async (req, res) => {
  const { productId, unitAmount, currency } = req.body;

  try {
    const price = await stripe.prices.create({
      product: productId,
      unit_amount: unitAmount,
      currency,
    });

    res.status(200).json({ price });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
};

export const webhook: PayloadHandler = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).send(`Webhook Error: ${message}`);
    return;
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!');
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!');
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

export default {
  createPaymentIntent,
  getSavedCards,
  payWithSavedCard,
  deleteSavedCard,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  createProduct,
  createPrice,
  webhook,
};