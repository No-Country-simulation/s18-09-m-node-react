import { Session, SessionDocument, SessionAttributes } from '../model';

export async function register(session: SessionAttributes): Promise<SessionDocument> {
  try {
    const newSession = new Session(session);
    const registeredSession = await newSession.save();
    if (!registeredSession) throw new Error('Unable to register session.');

    return registeredSession;
  } catch (err) {
    throw err;
  }
}
