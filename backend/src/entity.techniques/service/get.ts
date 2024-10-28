import { Technique, PersonalTechnique } from '../model';
import { User } from '../../entity.users/model';

export async function get(user_id: string) {
  try {
    const user = await User.findById(user_id);
    if (!user) throw new Error('User not found');

    // Personal techniques
    const personalTechniques = await PersonalTechnique.find({ _id: { $in: user.techniques } }).exec();

    // General techniques
    const techniques = await Technique.find({}).exec();
    return [...techniques, ...personalTechniques];
  } catch (err) {
    throw err;
  }
}

export async function getById(technique_id: string) {
  try {
    const technique = await Technique.findById(technique_id).exec();
    return technique;
  } catch (err) {
    throw err;
  }
}