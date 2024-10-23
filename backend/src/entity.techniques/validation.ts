import { z } from 'zod';
import { parseValidationResult, parsedValidationResult } from '../utils/parseData';

const techniqueRegistrationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  description: z.string().min(1, { message: 'Description is required.' }),
  focus_time: z.number().min(1, { message: 'Focus time is required.' }),
  break_time: z.number().min(1, { message: 'Break time is required.' }),
  long_break_time: z.number().default(0),
  cycles_before_long_break: z.number().default(0),
  active_pause: z.boolean().default(true),
});

type techniqueRegistrationData = z.infer<typeof techniqueRegistrationSchema>;

export const validateTechniqueData = (techniqueRegisterData: any): parsedValidationResult<techniqueRegistrationData> => {
  const result = techniqueRegistrationSchema.safeParse(techniqueRegisterData);
  const { hasError, errorMessages, userData } = parseValidationResult(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
};

export const techniqueUpdateSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }).optional(),
  description: z.string().min(1, { message: 'Description is required.' }).optional(),
  focus_time: z.number().min(1, { message: 'Focus time is required.' }).optional(),
  break_time: z.number().min(1, { message: 'Break time is required.' }).optional(),
  long_break_time: z.number().default(0).optional(),
  cycles_before_long_break: z.number().default(0).optional(),
  active_pause: z.boolean().default(true).optional(),
});

type techniqueUpdateData = z.infer<typeof techniqueUpdateSchema>;

export const validateUpdateTechniqueData = (techniqueRegisterData: any): parsedValidationResult<techniqueUpdateData> => {
  const result = techniqueRegistrationSchema.partial().safeParse(techniqueRegisterData);
  const { hasError, errorMessages, userData } = parseValidationResult(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
};