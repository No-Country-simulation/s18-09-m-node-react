import mongoose, { Schema, Document, Model } from 'mongoose';

export interface TechniqueAttributes {
  name: string;
  description: string;
  focus_time: number;
  break_time: number;
  long_break_time: number;
  cycles_before_long_break: number;
  active_pause: boolean;
}

export interface TechniqueUpdateAttributes extends TechniqueAttributes {
  _id: string;
}

export interface TechniqueDocument extends Document, TechniqueAttributes {
  _id: string;
}

const TechniqueSchema: Schema<TechniqueDocument> = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  focus_time: {
    type: Number,
    required: true
  },
  break_time: {
    type: Number,
    required: true
  },
  long_break_time: {
    type: Number,
    default: 0
  },
  cycles_before_long_break: {
    type: Number,
    default: 0
  },
  active_pause: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export const Technique: Model<TechniqueDocument> = mongoose.model<TechniqueDocument>('Technique', TechniqueSchema);
export const PersonalTechnique: Model<TechniqueDocument> = mongoose.model<TechniqueDocument>('PersonalTechnique', TechniqueSchema);
