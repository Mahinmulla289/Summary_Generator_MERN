import mongoose from 'mongoose';

const summarySchema = new mongoose.Schema({
  email: { type: String },
  search: { type: String, required: true },
  dateTime: { type: Date, default: Date.now },
});

const SummaryModel = mongoose.model('Summary', summarySchema);

export default SummaryModel;
