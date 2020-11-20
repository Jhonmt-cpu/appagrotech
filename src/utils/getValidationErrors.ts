import { ValidationError } from 'yup';

// interface Errors {
//   [key: string]: string;
// }

export default function getValidationErrors(err: ValidationError): string[] {
  // const validationErrors: Errors = {};

  const errors = err.inner.map(error => {
    return error.message;
  });

  return errors;
}
