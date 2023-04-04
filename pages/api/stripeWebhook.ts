import type { NextApiRequest, NextApiResponse } from "next";

async function stripeWebhook(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    console.log(req.body);
    res.json({ received: true });
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}

export default stripeWebhook;
