import type { NextApiRequest, NextApiResponse } from "next";
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

async function stripeWebhook(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    console.log(req);
    console.log(Object.keys(req));
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
        name: "Jane",
        intro: "Your React Developer Roadmap is on its way!",
        table: {
          data: [
            {
              item: "React Developer Roadmap Poster",
              description: '24" x 36"',
              price: "$19.99",
            },
          ],
        },
        outro: "Happy coding!",
      },
    };

    const mail = MailGenerator.generate(response);

    const message = {
      from: "mkotik97@gmail.com",
      to: "mkotik97@gmail.com",
      subject: "React Roadmap Order",
      html: mail,
    };

    transporter
      .sendMail(message)
      .then(() => {
        return res.status(201).json({
          msg: "you should receive an email",
          req,
          keys: Object.keys(req),
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
