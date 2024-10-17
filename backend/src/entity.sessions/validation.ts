import { z } from 'zod';
import { parseValidationResult, parsedValidationResult } from '../utils/parseData';

export const sessionRegistrationSchema = z.object({
  user_id: z.string({
    message: 'Invalid user ID format.',
  }),
  technique_id: z.string({
    message: 'Invalid technique ID format.',
  }),
  start_time: z.date({
    required_error: 'Start time is required.',
  }),
  end_time: z.date({
    required_error: 'End time is required.',
  }),
  expected_total_time: z
    .number({
      required_error: 'Expected total time is required.',
    })
    .min(0, {
      message: 'Expected total time must be greater than or equal to 0.',
    }),
  real_focus_time: z
    .number({
      required_error: 'Real focus time is required.',
    })
    .min(0, {
      message: 'Real focus time must be greater than or equal to 0.',
    })
    .default(0),
  real_break_time: z
    .number({
      required_error: 'Real break time is required.',
    })
    .min(0, {
      message: 'Real break time must be greater than or equal to 0.',
    })
    .default(0),
  real_break_count: z
    .number()
    .min(0, {
      message: 'Real break count must be greater than or equal to 0.',
    })
    .default(0),
  finished: z.boolean().default(false),
  score: z
    .number()
    .min(0, {
      message: 'Score must be greater than or equal to 0.',
    })
    .default(0),
});

type sessionRegistrationData = z.infer<typeof sessionRegistrationSchema>;

export const validateSessionData = (techniqueRegisterData: any): parsedValidationResult<sessionRegistrationData> => {
  const result = sessionRegistrationSchema.safeParse(techniqueRegisterData);
  const { hasError, errorMessages, userData } = parseValidationResult(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
};
