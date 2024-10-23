import { Session } from '../model';


export async function get() {
  try {
    const sessions = await Session.find({}).exec();
    return sessions;
  } catch (err) {
    throw err;
  }
}

export async function getSessionsByUserId(userId: string) {
  try {
    const sessions = await Session.find({ user_id: userId }).exec();
    return sessions;
  } catch (err) {
    throw err; 
  }
}