import mongoose from 'mongoose';
import { Technique, PersonalTechnique } from '../model';
import { User } from '../../entity.users/model';
const arrayTechniques = ["67110c7a18eb9bf757e68bcc", "67110c7a18eb9bf757e68bcc"];

export async function get(user_id: string) {
  try {
    const user = await User.findById(user_id);

    // Personal techniques
    //const personalTechniques = await PersonalTechnique.find({ _id: { $in: user.techniques} }).exec();
    const objectIds = arrayTechniques.map((technique) => new mongoose.Types.ObjectId(technique));
    const personalTechniques = await PersonalTechnique.find({ _id: { $in: objectIds } }).exec();

    // General techniques
    const techniques = await Technique.find({}).exec();
    return [...personalTechniques, ...techniques];
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