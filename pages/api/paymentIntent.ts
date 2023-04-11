// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const config = require("../../config.ts");
const { getPriceBreakdown } = require("../../utils/utils.ts");
const stripe: Stripe = require("stripe")(
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
);
import type { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";

const paymentIntent = async (totalPrice: number, quantity: number) => {
  return await stripe.paymentIntents.create({
    amount: totalPrice,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
    description: `React Developer Roadmap Poster - Qty(${quantity})`,
    metadata: {
      quantity,
    },
  });
};

const getStripeIntent = async (req: NextApiRequest, res: NextApiResponse) => {
  //test
  const { quantity } = req.body;
  const totalPrice = Number(
    (getPriceBreakdown(quantity).total * 100).toFixed(0)
  );
  const intent = await paymentIntent(totalPrice, quantity);
  res.status(200).json({ client_secret: intent.client_secret });
};

export default getStripeIntent;
