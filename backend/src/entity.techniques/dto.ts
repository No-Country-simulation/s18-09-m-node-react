import { TechniqueAttributes, TechniqueUpdateAttributes } from './model';
import { validateTechniqueData } from './validation';

export default class DTO {
  private constructor() { }

  public static register(data: any): { error: { message: string }; value: null } | { error: null; value: TechniqueAttributes } {
    const validationResult = validateTechniqueData(data);
    if (validationResult.hasError) {
      return {
        error: {
          message: validationResult.errorMessages.join(', '),
        },
        value: null,
      };
    }

    const { name, description, focus_time, break_time, long_break_time, cycles_before_long_break, active_pause } = validationResult.userData!;
    return {
      error: null,
      value: {
        name,
        description,
        focus_time,
        break_time,
        long_break_time,
        cycles_before_long_break,
        active_pause
      },
    };
  }


  public static update(data: any, technique_id: string): { error: { message: string }; value: null } | { error: null; value: TechniqueUpdateAttributes } {
    const validationResult = validateTechniqueData(data);
    if (validationResult.hasError) {
      return {
        error: {
          message: validationResult.errorMessages.join(', '),
        },
        value: null,
      };
    }

    const { name, description, focus_time, break_time, long_break_time, cycles_before_long_break, active_pause } = validationResult.userData!;
    return {
      error: null,
      value: {
        _id: technique_id,
        name,
        description,
        focus_time,
        break_time,
        long_break_time,
        cycles_before_long_break,
        active_pause
      },
    };
  }

}
