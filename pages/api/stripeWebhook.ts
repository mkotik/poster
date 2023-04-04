import type { NextApiRequest, NextApiResponse } from "next";
const stripe: Stripe = require("stripe")(
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
);
const endpointSecret = "whsec_2AX47Prj4cpYJGlVhizWhsJnvt9VkvMj";

async function stripeWebhook(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    console.log("HERE");
    let event = request.body;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
        console.log(event);
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err);
        return response.status(400);
      }
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log(
          `PaymentIntent for ${paymentIntent.amount} was successful!`
        );
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send("HEREE");
  } else {
    response.status(405).json({ message: "Method not allowed." });
  }
}

export default stripeWebhook;
