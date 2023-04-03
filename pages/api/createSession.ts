// pages/api/store-data.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

async function setCookie(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const currentDate = new Date();
    const expiresDate = new Date(currentDate.getTime() + 30 * 60000);
    const cookie = serialize("reactRoadMapCart", JSON.stringify(req.body), {
      path: "/",
      expires: expiresDate,
    });
    res.setHeader("Set-Cookie", cookie);
    res.status(200).json({ message: "cookie set successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}

export default setCookie;
