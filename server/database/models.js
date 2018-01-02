import mongoose from 'mongoose';

// Add Schema
const dataSchema = mongoose.Schema({
    temp: String,
    time: Number,
    place: String,
});

// Data model
export const DataModel = mongoose.model('DataModel', dataSchema);
