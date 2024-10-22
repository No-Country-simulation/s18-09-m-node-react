import { SessionAttributes, SessionUpdateAttributes } from './model';
import { validateSessionData, validateUpdateSessionData } from './validation';
import { SessionHelper } from './helper';

export default class DTO {
  private constructor() {}

  public static async register(data: any): Promise<{ error: { message: string }; value: null } | { error: null; value: SessionAttributes }> {
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

    const startDate = SessionHelper.dateConverter(start_time);
    const endDate = SessionHelper.dateConverter(end_time);
    const startTime = SessionHelper.extractTimeFromISO(start_time);
    const expected_total_time = SessionHelper.getTotalExpectedTime(start_time, end_time);
    const expected_focus_time = await SessionHelper.getExpectedFocusTime(technique_id, expected_total_time);
    const expected_break_time = await SessionHelper.getExpectedBreakTime(technique_id, expected_total_time);
    const schedule = await SessionHelper.generateSchedule(technique_id, startTime, expected_total_time);
    console.log(schedule)

    return {
      error: null,
      value: {
        user_id,
        technique_id,
        start_time: startDate,
        end_time: endDate,
        expected_total_time,
        expected_focus_time,
        expected_break_time,
        schedule: schedule,
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

    const {
      user_id,
      technique_id,
      start_time,
      end_time,
      expected_total_time,
      expected_focus_time,
      expected_break_time,
      schedule,
      real_focus_time,
      real_break_time,
      real_break_count,
      finished,
      score,
    } = validationResult.userData!;

    if (!start_time || !end_time) {
      return {
        error: { message: 'Start time and end time are required.' },
        value: null,
      };
    }

    const startTime = SessionHelper.dateConverter(start_time);
    const endTime = SessionHelper.dateConverter(end_time);

    return {
      error: null,
      value: {
        _id: session_id,
        user_id: user_id!,
        technique_id: technique_id!,
        start_time: startTime,
        end_time: endTime,
        expected_total_time: expected_total_time!,
        expected_focus_time: expected_focus_time!,
        expected_break_time: expected_break_time!,
        schedule: schedule!,
        real_focus_time: real_focus_time!,
        real_break_time: real_break_time!,
        real_break_count: real_break_count!,
        finished: finished!,
        score: score!,
      },
    };
  }
}
