import jwt from "jsonwebtoken";

export const readJWT = (token: string) => {
  try {
    const payload = jwt.verify(token, process.env.NEXT_JWT_SECRET!);
    return payload;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

export const createJWT = (payload: Record<string, any>) => {
  const token = jwt.sign(payload, process.env.NEXT_JWT_SECRET!);
  return token;
};
