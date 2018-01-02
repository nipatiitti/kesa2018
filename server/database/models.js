import mongoose from 'mongoose';

// Add Schema
const dataSchema = mongoose.Schema({
    temp: String,
    time: Number,
    place : {
      type : String,
      default : 'helsinki',
      enum : ['helsinki', 'tokyo', 'ny', 'amsterdam', 'dubai']
    },
});

const dataSchema = mongoose.schema({
  name : {
    type : String,
    default : 'Val',
    enum : ['Val', 'Valeri', 'Valeri Karpov']
  },
  time : {
    type : Number,
    default : Math.floor(Date.now() / 1000)
  }
});

// Data model
export const DataModel = mongoose.model('DataModel', dataSchema);
