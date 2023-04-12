import * as Yup from "yup";

const CheckoutFormSchema = Yup.object().shape({
  firstName: Yup.string().required("First name required"),
  lastName: Yup.string().required("Last name required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  address1: Yup.string().required("Address required"),
  address2: Yup.string(),
  city: Yup.string().required("City required"),
  zipCode: Yup.string().required("Zip code required"),
  phoneNumber: Yup.string(),
  specialNotes: Yup.string(),
  country: Yup.string().required("Country required"),
  state: Yup.string().required("State required"),
});

export default CheckoutFormSchema;
