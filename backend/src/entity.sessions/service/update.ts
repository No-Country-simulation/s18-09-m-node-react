import { Session, SessionUpdateAttributes } from '../model';

export async function update(sessiondata: SessionUpdateAttributes) {
  try {
    const {
      _id,
      user_id,
      technique_id,
      start_time,
      end_time,
      expected_total_time,
      real_focus_time,
      real_break_time,
      real_break_count,
      finished,
      score,
    } = sessiondata;
    const updatedSession = await Session.findOneAndUpdate(
      { _id },
      { user_id, technique_id, start_time, end_time, expected_total_time, real_focus_time, real_break_time, real_break_count, finished, score },
      { new: true },
    );
    return updatedSession;
  } catch (err) {
    throw err;
  }
}
