import { z } from 'zod';
import { parseValidationResult, parsedValidationResult } from '../utils/parseData';
import { UserRole } from './model';

const userRegistrationSchema = z.object({
  email: z.string().email({ message: 'Invalid email format.' }),
  username: z.string().min(1, { message: 'Username is required.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
  role: z.nativeEnum(UserRole).default(UserRole.USER),
});

type userRegistrationData = z.infer<typeof userRegistrationSchema>;

export const validateUserData = (userRegisterData: any): parsedValidationResult<userRegistrationData> => {
  const result = userRegistrationSchema.safeParse(userRegisterData);
  const { hasError, errorMessages, userData } = parseValidationResult(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
};