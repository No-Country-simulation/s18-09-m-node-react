import mongoose, { Schema, Document, Model } from 'mongoose';

export interface BreakTime {
  time: string;
  isLongBreak: boolean;
}

export interface cycle {
  start_working: string;
  break_time: BreakTime;
}

export interface SessionAttributes {
  user_id: String;
  technique_id: String;
  start_time: Date;
  end_time: Date;
  expected_total_time: number;
  expected_focus_time: number;
  expected_break_time: number;
  schedule: cycle[];
  real_focus_time: number;
  real_break_time: number;
  real_break_count: number;
  finished: boolean;
  score: number;
}

export interface SessionUpdateAttributes extends SessionAttributes {
  _id: string;
}

export interface SessionDocument extends Document, SessionAttributes {
  _id: string;
}

const SessionSchema: Schema<SessionDocument> = new Schema(
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
      min: 0,
    },
    expected_focus_time: {
      type: Number,
      min: 0,
    },
    expected_break_time: {
      type: Number,
      min: 0,
    },
    schedule: {
      type: [
        {
          start_working: { type: String, required: true },
          break_time: {
            type: {
              time: { type: String, required: true },
              isLongBreak: { type: Boolean, required: true },
            },
            required: true,
            _id: false,
          },
        },
      ],
      _id: false,
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

export const Session: Model<SessionDocument> = mongoose.model<SessionDocument>('Session', SessionSchema);
