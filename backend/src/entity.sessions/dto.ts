import { SessionAttributes, SessionUpdateAttributes } from './model';
import { validateSessionData } from './validation';

export default class DTO {
  private constructor() {}

  public static register(data: any): { error: { message: string }; value: null } | { error: null; value: SessionAttributes } {
    const validationResult = validateSessionData(data);
    if (validationResult.hasError) {
      return {
        error: {
          message: validationResult.errorMessages.join(', '),
        },
        value: null,
      };
    }

    const { user_id, technique_id, start_time, end_time, expected_total_time, real_focus_time, real_break_time, real_break_count, finished, score } =
      validationResult.userData!;
    return {
      error: null,
      value: {
        user_id,
        technique_id,
        start_time,
        end_time,
        expected_total_time,
        real_focus_time,
        real_break_time,
        real_break_count,
        finished,
        score,
      },
    };
  }

  public static update(data: any, session_id: string): { error: { message: string }; value: null } | { error: null; value: SessionUpdateAttributes } {
    const validationResult = validateSessionData(data);
    if (validationResult.hasError) {
      return {
        error: {
          message: validationResult.errorMessages.join(', '),
        },
        value: null,
      };
    }

    const { user_id, technique_id, start_time, end_time, expected_total_time, real_focus_time, real_break_time, real_break_count, finished, score } =
      validationResult.userData!;
    return {
      error: null,
      value: {
        _id: session_id,
        user_id,
        technique_id,
        start_time,
        end_time,
        expected_total_time,
        real_focus_time,
        real_break_time,
        real_break_count,
        finished,
        score,
      },
    };
  }
}
