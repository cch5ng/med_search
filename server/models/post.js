import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
  name: { type: 'String', required: true },
  synonym: { type: 'String', required: true },
  frequency: { type: 'Number' },
  rxcui: { type: 'String', required: true },
});

export default mongoose.model('Post', postSchema);
