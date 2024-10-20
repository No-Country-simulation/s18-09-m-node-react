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

