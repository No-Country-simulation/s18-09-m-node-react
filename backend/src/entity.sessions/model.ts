import mongoose, { Schema, Document, Model } from 'mongoose';

export interface SessionAttributes extends Document {
  user_id: String;
  technique_id: String;
  start_time: Date;
  end_time: Date;
  expected_total_time: number;
  real_focus_time: number;
  real_break_time: number;
  real_break_count: number;
  finished: boolean;
  score: number;
}

const SessionSchema = new Schema<SessionAttributes>(
  {
    user_id: {
      type: String,
      required: true,
      ref: 'User',
    },
    technique_id: {
      type: String,
      required: true,
      ref: 'Technique',
    },
    start_time: {
      type: Date,
      required: true,
    },
    end_time: {
      type: Date,
      required: true,
    },
    expected_total_time: {
      type: Number,
      required: true,
      min: 0,
    },
    real_focus_time: {
      type: Number,
      required: true,
      min: 0,
    },
    real_break_time: {
      type: Number,
      required: true,
      min: 0,
    },
    real_break_count: {
      type: Number,
      default: 0,
      min: 0,
    },
    finished: {
      type: Boolean,
      default: false,
    },
    score: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true },
);

export const Session: Model<SessionAttributes> = mongoose.model<SessionAttributes>('Session', SessionSchema);
