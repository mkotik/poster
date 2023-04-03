export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  address1: string;
  address2: string;
  country: string;
  city: string;
  zipCode: string;
  phoneNumber: string;
  specialNotes: string;
  state: string;
};

export interface SessionData extends FormData {
  quantity: number;
}
