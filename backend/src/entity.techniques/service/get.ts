import { Technique } from '../model';


export async function get() {
  try {
    const techniques = await Technique.find({}).exec();
    return techniques;
  } catch (err) {
    throw err;
  }
}

export async function getById(technique_id:string) {
  try {
    const technique = await Technique.findById(technique_id).exec();
    return technique;
  } catch (err) {
    throw err;
  }
}