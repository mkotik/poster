// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const stripe: Stripe = require("stripe")(
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
);
import type { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";

const paymentIntent = async () => {
  return await stripe.paymentIntents.create({
    amount: 1099,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
  });
};

const getStripeIntent = async (req: NextApiRequest, res: NextApiResponse) => {
  const intent = await paymentIntent();
  res.status(200).json({ client_secret: intent.client_secret });
};

export default getStripeIntent;
