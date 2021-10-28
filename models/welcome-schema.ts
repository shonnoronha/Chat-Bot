import mongoose, { Schema } from 'mongoose';

const requiredString = {
    type: String,
    required: true
}

const welcomeSchema = new Schema({
    _id: requiredString,
    channelId: requiredString,
    text: requiredString
});

const name = 'welcome-message';
export default mongoose.models[name] || mongoose.model(name, welcomeSchema);