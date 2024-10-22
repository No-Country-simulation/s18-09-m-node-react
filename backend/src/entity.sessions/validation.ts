import { z } from 'zod';
import { parseValidationResult, parsedValidationResult } from '../utils/parseData';

export const sessionRegistrationSchema = z.object({
  user_id: z.string({
    message: 'Invalid user ID format.',
  }),
  technique_id: z.string({
    message: 'Invalid technique ID format.',
  }),
  start_time: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
  }, z.date()),
  end_time: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
  }, z.date()),
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
const breakTimeSchema = z.object({
  time: z.string(), 
  isLongBreak: z.boolean(), 
});


const cycleSchema = z.object({
  start_working: z.string(), 
  break_time: breakTimeSchema, 
});


export const sessionUpdateSchema = z.object({
  user_id: z.string().optional(),
  technique_id: z.string().optional(),
  start_time: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
  }, z.date().optional()),
  end_time: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
  }, z.date().optional()),
  expected_total_time: z.number().min(0).default(0).optional(),
  expected_focus_time: z.number().min(0).default(0).optional(),
  expected_break_time: z.number().min(0).default(0).optional(),
  schedule: z.array(cycleSchema).optional(),
  real_focus_time: z.number().min(0).default(0).optional(),
  real_break_time: z.number().min(0).default(0).optional(),
  real_break_count: z.number().min(0).default(0).optional(),
  finished: z.boolean().default(false).optional(),
  score: z.number().min(0).default(0).optional(),
});

type sessionUpdateData = z.infer<typeof sessionUpdateSchema>;

export const validateUpdateSessionData = (techniqueUpdateData: any): parsedValidationResult<sessionUpdateData> => {
  const result = sessionUpdateSchema.partial().safeParse(techniqueUpdateData);
  const { hasError, errorMessages, userData } = parseValidationResult(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
};
