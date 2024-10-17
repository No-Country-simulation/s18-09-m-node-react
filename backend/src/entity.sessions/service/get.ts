import { Session } from '../model';


export async function get() {
  try {
    const sessions = await Session.find({}).exec();
    return sessions;
  } catch (err) {
    throw err;
  }
}