import jwt from "jsonwebtoken";
import config from "../config";

export const readJWT = (token: string) => {
  try {
    const payload = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!);
    return payload;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

export const createJWT = (payload: Record<string, any>) => {
  console.log(process.env);
  try {
    const token = jwt.sign(payload, process.env.NEXT_PUBLIC_JWT_SECRET!);
    return token;
  } catch (error) {
    console.error("Error creating JWT:", error);
    return null;
  }
};

/**
 *
 * @param payload
 * typically an error object to be logged to the console
 *
 * This function will return a redirect object to be used in getServerSideProps error handling
 *
 */

export const redirectError = (payload?: any) => {
  let returnUrl = "/error";
  if (payload) {
    const token = createJWT({
      error: payload,
    });
    returnUrl += `?token=${token}`;
  }
  return {
    redirect: {
      destination: returnUrl,
      statusCode: 302,
    },
  };
};

type AddressObject = {
  street1: string;
  street2: string;
  city: string;
  state: string;
  postalCode: string;
};

export const formatAddress = ({
  street1,
  street2,
  city,
  state,
  postalCode,
}: AddressObject) => {
  const addressParts = [street1, street2, city, state, postalCode].filter(
    (part) => part
  );
  return addressParts.join(", ");
};

export const getPriceBreakdown = (quantity: number) => {
  const subTotal = quantity * config.price;
  const taxes = subTotal * config.taxRate;
  const total = subTotal + taxes + config.shipping;
  return {
    subTotal,
    taxes,
    total,
  };
};
