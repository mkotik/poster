import type { NextApiRequest, NextApiResponse } from "next";
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

async function stripeWebhook(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const clientData = req.body.data.object;
    console.log(Object.keys(req.body.data));
    console.log(Object.keys(req.body.data.object));
    console.log(req.body.data.object);
    console.log(req.body.data.object.amount); //good
    console.log(req.body.data.object.receipt_email); //good
    console.log(req.body.data.object.shipping.name); //good
    console.log(clientData.status);
    console.log(clientData.metaData);
    console.log(clientData.status === "succeeded");
    // quantity
    // status
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
      },
    });

    const MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "React Roadmap Team",
        link: process.env.NEXT_PUBLIC_URL,
      },
    });

    const response = {
      body: {
        name: clientData.shipping.name,
        intro: "Your React Developer Roadmap is on its way!",
        table: {
          data: [
            {
              item: "React Developer Roadmap Poster",
              description: '24" x 36"',
              price: `$${(clientData.amount / 100).toFixed(2)}`,
            },
          ],
        },
        outro: "Happy coding!",
      },
    };

    const mail = MailGenerator.generate(response);

    const message = {
      from: "mkotik97@gmail.com",
      to: clientData.receipt_email,
      subject: "React Roadmap Order",
      html: mail,
    };

    const failResponse = {
      from: "mkotik97@gmail.com",
      to: clientData.receipt_email,
      subject: "React Roadmap - Payment Failed",
      text: "Your payment failed for the React Developer Roadmap. Please try again or contact mkotik97@gmail.com for help. ",
    };

    const messageToBeSent =
      clientData.status === "succeeded" ? failResponse : message;

    transporter
      .sendMail(messageToBeSent)
      .then(() => {
        return res.status(201).json({
          msg: "you should receive an email",
        });
      })
      .catch((error: Error) => {
        return res.status(500).json({ error });
      });
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}

export default stripeWebhook;
