import mongoose from "mongoose"

export const connectToMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Conneced to DB!')
    }catch(error){
        console.log(error)
    }
}