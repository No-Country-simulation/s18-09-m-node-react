import { TechniqueAttributes, TechniqueUpdateAttributes } from './model';
import { validateTechniqueData, validateUpdateTechniqueData } from './validation';

export default class DTO {
  private constructor() { }

  public static register(data: any, user: any): { error: { message: string }; value: null } | { error: null; value: TechniqueAttributes & { user_id: string } } {
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
        user_id: user._id,
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
    const validationResult = validateUpdateTechniqueData(data);
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
        name: name!,
        description: description!,
        focus_time: focus_time!,
        break_time: break_time!,
        long_break_time: long_break_time!,
        cycles_before_long_break: cycles_before_long_break!,
        active_pause: active_pause!
      },
    };
  }

}
