import { Technique, TechniqueDocument, TechniqueAttributes } from '../model';


export async function register(technique: TechniqueAttributes): Promise<TechniqueDocument> {
  try {
    const newTechnique = new Technique(technique);
    const registeredTechnique = await newTechnique.save();
    if (!registeredTechnique) throw new Error("Unable to register technique.");

    return registeredTechnique;
  } catch (err) {
    throw err;
  }
}

