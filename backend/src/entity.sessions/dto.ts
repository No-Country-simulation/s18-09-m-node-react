import { SessionAttributes, SessionUpdateAttributes } from './model';
import { validateSessionData, validateUpdateSessionData } from './validation';
import { sessionHelper } from './helper';

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

    const { user_id, technique_id, start_time, end_time, real_focus_time, real_break_time, real_break_count, finished, score } =
      validationResult.userData!;

    const startTime = sessionHelper.dateConverter(start_time);
    const endTime = sessionHelper.dateConverter(end_time);
    const expected_total_time = sessionHelper.getTotalExpectedTime(start_time, end_time);

    return {
      error: null,
      value: {
        user_id,
        technique_id,
        start_time,
        end_time,
        expected_total_time,
        expected_focus_time: 0,
        expected_break_time: 0,
        real_focus_time,
        real_break_time,
        real_break_count,
        finished,
        score,
      },
    };
  }

  public static update(data: any, session_id: string): { error: { message: string }; value: null } | { error: null; value: SessionUpdateAttributes } {
    const validationResult = validateUpdateSessionData(data);
    if (validationResult.hasError) {
      return {
        error: {
          message: validationResult.errorMessages.join(', '),
        },
        value: null,
      };
    }

    const { user_id, technique_id, start_time, end_time, real_focus_time, real_break_time, real_break_count, finished, score } =
      validationResult.userData!;

    if (!start_time || !end_time) {
      return {
        error: { message: 'Start time and end time are required.' },
        value: null,
      };
    }

    const startTime = sessionHelper.dateConverter(start_time);
    const endTime = sessionHelper.dateConverter(end_time);
    const expected_total_time = sessionHelper.getTotalExpectedTime(start_time, end_time);

    return {
      error: null,
      value: {
        _id: session_id,
        user_id: user_id!,
        technique_id: technique_id!,
        start_time: startTime,
        end_time: endTime,
        expected_total_time,
        expected_focus_time: 0,
        expected_break_time: 0,
        real_focus_time: real_focus_time!,
        real_break_time: real_break_time!,
        real_break_count: real_break_count!,
        finished: finished!,
        score: score!,
      },
    };
  }
}
