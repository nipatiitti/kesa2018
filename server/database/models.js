import mongoose from 'mongoose';

// Add Schema
const dataSchema = mongoose.Schema({
    temp: Number,
    time : {
      type : Number
    },
    place : {
      type : String,
      default : 'helsinki',
      enum : ['helsinki', 'tokyo', 'ny', 'amsterdam', 'dubai']
    },
});

// Data model
export const DataModel = mongoose.model('DataModel', dataSchema);
