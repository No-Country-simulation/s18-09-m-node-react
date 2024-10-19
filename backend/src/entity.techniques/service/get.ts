import { Technique } from '../model';


export async function get() {
  try {
    const techniques = await Technique.find({}).exec();
    return techniques;
  } catch (err) {
    throw err;
  }
}