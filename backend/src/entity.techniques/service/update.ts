import { PersonalTechnique, TechniqueUpdateAttributes } from '../model';

export async function update(techniqueData: TechniqueUpdateAttributes) {
  try {
    const { _id, name, description, focus_time, break_time, long_break_time, cycles_before_long_break, active_pause } = techniqueData;
    const updatedTechnique = await PersonalTechnique.findOneAndUpdate({ _id }, { name, description, focus_time, break_time, long_break_time, cycles_before_long_break, active_pause }, { new: true });
    return updatedTechnique;
  } catch (err) {
    throw err;
  }
}
