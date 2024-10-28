import { PersonalTechnique, TechniqueDocument, TechniqueAttributes } from '../model';
import { User } from '../../entity.users/model';


export async function register(technique: TechniqueAttributes & { user_id: string }): Promise<TechniqueDocument> {
  try {
    const user = await User.findById(technique.user_id);
    if (!user) throw new Error('User not found');

    const newTechnique = new PersonalTechnique(technique);
    const registeredTechnique = await newTechnique.save();
    if (!registeredTechnique) throw new Error("Unable to register technique.");

    //user.techniques.push(registeredTechnique._id);
    //await user.save();

    return registeredTechnique;
  } catch (err) {
    throw err;
  }
}

