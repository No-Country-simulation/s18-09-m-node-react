import { ZodError } from 'zod';

export interface validationResult<T> {
  success: boolean;
  data?: T;
  error?: ZodError;
}

export interface parsedValidationResult<T> {
  hasError: boolean;
  errorMessages: string[];
  userData: T | undefined;
}

export const parseValidationResult = <T>(result: validationResult<T>): parsedValidationResult<T> => {
  if (result.success) {
    return {
      hasError: false,
      errorMessages: [],
      userData: result.data,
    } as const;
  } else {
    const errorMessages = result.error?.issues.map((issue) => issue.message) ?? [];
    return {
      hasError: true,
      errorMessages,
      userData: undefined,
    } as const;
  }
};
