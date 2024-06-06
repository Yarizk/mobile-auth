import mongoose from 'mongoose';

const dbConfig = () => {
  mongoose.connect(process.env.MONGO_URI as string)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
};

export default dbConfig;