import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
  name: { type: 'String', required: true },
  frequency: { type: 'Number' },
  id: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  //dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Post', postSchema);
