import {
  emailRegex,
  phoneNumberRegex,
} from "@/prettylab/core/utils/form/regex";

export const validationRequired = {
  required: "Pole jest wymagane",
};

export const validationEmail = {
  pattern: {
    value: emailRegex,
    message: "Niepoprawny adres E-mail",
  },
};

export const validationPhoneNumber = {
  pattern: {
    value: phoneNumberRegex,
    message: "Niepoprawny numer telefonu",
  },
};
