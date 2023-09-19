import mongoose from "mongoose";
import colors from "colors";

const connectToMongo = async () => {
    try {
        const conn = await mongoose.connect(process.env.Database)
        if (conn) {
            console.log(`connection succesfull to mongo database`.bgGreen.red);
        }
    } catch (error) {
        console.log(`Error in MongoDB database`.bgRed.white);
    }
};

export default connectToMongo;
