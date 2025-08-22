import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    console.log(process.env.MONGOURL);
    await mongoose.connect(process.env.MONGOURL as string);
    console.log('MONGODB CONNECTED');
  } catch (error: any) {
    console.error(error);
    process.exit(1);
  }
};

export default dbConnect;
